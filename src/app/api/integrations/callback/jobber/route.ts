import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForTokens, getAccount } from '@/lib/jobber/client';

/**
 * GET /api/integrations/callback/jobber
 * Jobber redirects here after the user authorizes.
 * Exchanges the code for tokens, verifies with a test query, then redirects to admin.
 */
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Missing authorization code' }, { status: 400 });
  }

  try {
    await exchangeCodeForTokens(code);

    // Verify the connection works by fetching account info
    const account = await getAccount();
    const name = account?.account?.name ?? 'Unknown';

    // Redirect to admin dashboard with success message
    const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tgyardcare.com').trim();
    return NextResponse.redirect(`${base}/admin/local?jobber=connected&account=${encodeURIComponent(name)}`);
  } catch (err) {
    console.error('Jobber OAuth callback error:', err);
    const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tgyardcare.com').trim();
    return NextResponse.redirect(`${base}/admin/local?jobber=error`);
  }
}
