/**
 * Jobber GraphQL API Client
 *
 * Handles OAuth token management (auto-refresh) and GraphQL queries/mutations.
 * Tokens stored in Supabase `jobber_tokens` table (singleton row).
 */

import { createClient } from '@supabase/supabase-js';

const JOBBER_GRAPHQL = 'https://api.getjobber.com/api/graphql';
const JOBBER_TOKEN_URL = 'https://api.getjobber.com/api/oauth/token';
const JOBBER_API_VERSION = '2023-11-15';

const CLIENT_ID = process.env.JOBBER_CLIENT_ID!;
const CLIENT_SECRET = process.env.JOBBER_CLIENT_SECRET!;

interface TokenRow {
  access_token: string;
  refresh_token: string;
  expires_at: string;
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// ---------------------------------------------------------------------------
// Token Management
// ---------------------------------------------------------------------------

async function getTokens(): Promise<TokenRow | null> {
  const sb = getSupabase();
  const { data } = await sb
    .from('jobber_tokens')
    .select('access_token, refresh_token, expires_at')
    .limit(1)
    .single();
  return data as TokenRow | null;
}

async function saveTokens(access: string, refresh: string, expiresIn: number) {
  const sb = getSupabase();
  const expires_at = new Date(Date.now() + expiresIn * 1000).toISOString();

  // Upsert singleton row
  const { data: existing } = await sb.from('jobber_tokens').select('id').limit(1).single();

  if (existing) {
    await sb.from('jobber_tokens').update({
      access_token: access,
      refresh_token: refresh,
      expires_at,
      updated_at: new Date().toISOString(),
    }).eq('id', existing.id);
  } else {
    await sb.from('jobber_tokens').insert({
      access_token: access,
      refresh_token: refresh,
      expires_at,
    });
  }
}

async function refreshAccessToken(refreshToken: string): Promise<string> {
  const res = await fetch(JOBBER_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Jobber token refresh failed: ${res.status} ${err}`);
  }

  const data = await res.json();
  await saveTokens(data.access_token, data.refresh_token, data.expires_in ?? 3600);
  return data.access_token;
}

async function getValidAccessToken(): Promise<string> {
  const tokens = await getTokens();
  if (!tokens) throw new Error('Jobber not connected. Complete OAuth flow first.');

  // Refresh if expiring within 5 minutes
  const expiresAt = new Date(tokens.expires_at).getTime();
  if (Date.now() > expiresAt - 5 * 60 * 1000) {
    return refreshAccessToken(tokens.refresh_token);
  }

  return tokens.access_token;
}

// ---------------------------------------------------------------------------
// GraphQL Client
// ---------------------------------------------------------------------------

interface GraphQLResponse<T = unknown> {
  data?: T;
  errors?: Array<{ message: string; path?: string[] }>;
}

export async function jobberQuery<T = unknown>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const token = await getValidAccessToken();

  const res = await fetch(JOBBER_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-JOBBER-GRAPHQL-VERSION': JOBBER_API_VERSION,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Jobber API error: ${res.status} ${err}`);
  }

  const json: GraphQLResponse<T> = await res.json();

  if (json.errors?.length) {
    throw new Error(`Jobber GraphQL errors: ${json.errors.map(e => e.message).join(', ')}`);
  }

  return json.data as T;
}

// ---------------------------------------------------------------------------
// OAuth Flow Helpers (used by callback route)
// ---------------------------------------------------------------------------

export async function exchangeCodeForTokens(code: string) {
  const res = await fetch(JOBBER_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Jobber token exchange failed: ${res.status} ${err}`);
  }

  const data = await res.json();
  await saveTokens(data.access_token, data.refresh_token, data.expires_in ?? 3600);
  return data;
}

export function getAuthorizationUrl(state: string): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tgyardcare.com').trim();
  const redirectUri = `${base}/api/integrations/callback/jobber`;
  return `https://api.getjobber.com/api/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
}

// ---------------------------------------------------------------------------
// Common Queries
// ---------------------------------------------------------------------------

export async function getAccount() {
  return jobberQuery<{ account: { name: string; id: string } }>(`
    query { account { id name } }
  `);
}
