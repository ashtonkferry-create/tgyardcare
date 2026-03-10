#!/usr/bin/env node
/**
 * Find all URLs in GSC that get impressions but aren't in the current site
 * Usage: node scripts/gsc-redirect-audit.mjs
 */

import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const KEY_PATH = resolve(__dirname, '..', 'gsc-service-account.json');
const SITE_URL = 'sc-domain:tgyardcare.com';

const keyFile = JSON.parse(readFileSync(KEY_PATH, 'utf-8'));
const auth = new google.auth.GoogleAuth({
  credentials: keyFile,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

const searchconsole = google.searchconsole({ version: 'v1', auth });

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

async function main() {
  console.log('🔍 Redirect Audit — Finding all URLs with impressions\n');

  const res = await searchconsole.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: daysAgo(90),
      endDate: daysAgo(1),
      dimensions: ['page'],
      rowLimit: 100,
      dataState: 'all',
    },
  });

  const rows = res.data.rows || [];

  // Known valid paths on the new Next.js site
  const validPaths = new Set([
    '/', '/about', '/contact', '/services', '/commercial', '/residential',
    '/gallery', '/reviews', '/faq', '/blog', '/team', '/service-areas',
    '/careers', '/privacy', '/get-quote',
    // Services
    '/services/mowing', '/services/weeding', '/services/mulching',
    '/services/leaf-removal', '/services/spring-cleanup', '/services/fall-cleanup',
    '/services/gutter-cleaning', '/services/gutter-guards', '/services/garden-beds',
    '/services/fertilization', '/services/herbicide', '/services/snow-removal',
    '/services/pruning', '/services/aeration', '/services/hardscaping',
    // Commercial
    '/commercial/lawn-care', '/commercial/seasonal', '/commercial/gutters',
    '/commercial/snow-removal', '/commercial/property-enhancement',
    '/commercial/fertilization-weed-control', '/commercial/aeration',
    // Locations
    '/locations/madison', '/locations/middleton', '/locations/waunakee',
    '/locations/monona', '/locations/sun-prairie', '/locations/fitchburg',
    '/locations/verona', '/locations/mcfarland', '/locations/cottage-grove',
    '/locations/deforest', '/locations/oregon', '/locations/stoughton',
    // City-service
    '/lawn-care-madison-wi', '/lawn-care-middleton-wi',
    '/gutter-cleaning-madison-wi', '/snow-removal-madison-wi',
  ]);

  console.log('URLs getting impressions that may need redirects:\n');
  console.log('  ' + 'URL'.padEnd(65) + 'Clicks'.padStart(7) + 'Impressions'.padStart(13) + 'Status');
  console.log('  ' + '─'.repeat(95));

  let needsRedirect = 0;
  for (const row of rows) {
    const fullUrl = row.keys[0];
    // Normalize to path
    let path = fullUrl
      .replace('https://tgyardcare.com', '')
      .replace('https://www.tgyardcare.com', '')
      .replace('http://tgyardcare.com', '')
      .replace('http://www.tgyardcare.com', '');
    if (!path) path = '/';

    // Check if this is a valid path or starts with a valid prefix
    const isValid = validPaths.has(path) ||
      path.startsWith('/blog/') ||
      path.startsWith('/admin');

    const isWww = fullUrl.includes('www.tgyardcare.com');
    const isHttp = fullUrl.startsWith('http://');

    let status = '✅ OK';
    if (isWww) status = '⚠️  WWW variant';
    else if (isHttp) status = '⚠️  HTTP variant';
    else if (!isValid) status = '❌ NEEDS REDIRECT';

    if (status !== '✅ OK') {
      needsRedirect++;
      console.log(`  ${fullUrl.padEnd(65)} ${String(row.clicks).padStart(7)} ${String(row.impressions).padStart(13)} ${status}`);
    }
  }

  if (needsRedirect === 0) {
    console.log('  (none found — all URLs are valid)');
  }

  console.log(`\n📊 Total URLs with issues: ${needsRedirect} of ${rows.length}\n`);
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
