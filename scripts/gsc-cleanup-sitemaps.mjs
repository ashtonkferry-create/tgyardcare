#!/usr/bin/env node
/**
 * Remove duplicate www sitemap from GSC and re-submit canonical sitemap
 * Usage: node scripts/gsc-cleanup-sitemaps.mjs
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
  scopes: ['https://www.googleapis.com/auth/webmasters'],
});

const webmasters = google.webmasters({ version: 'v3', auth });

async function main() {
  console.log('🧹 GSC Sitemap Cleanup\n');

  // 1. List current sitemaps
  const res = await webmasters.sitemaps.list({ siteUrl: SITE_URL });
  const sitemaps = res.data.sitemap || [];
  console.log(`Found ${sitemaps.length} sitemaps:`);
  for (const sm of sitemaps) {
    console.log(`   ${sm.path}`);
  }

  // 2. Delete www duplicate
  const wwwSitemap = sitemaps.find(s => s.path.includes('www.tgyardcare.com'));
  if (wwwSitemap) {
    console.log(`\n🗑️  Removing duplicate: ${wwwSitemap.path}`);
    try {
      await webmasters.sitemaps.delete({
        siteUrl: SITE_URL,
        feedpath: wwwSitemap.path,
      });
      console.log('   ✅ Removed');
    } catch (e) {
      console.log(`   ❌ ${e.message}`);
    }
  }

  // 3. Re-submit canonical sitemap
  const canonicalSitemap = 'https://tgyardcare.com/sitemap.xml';
  console.log(`\n📤 Re-submitting canonical: ${canonicalSitemap}`);
  try {
    await webmasters.sitemaps.submit({
      siteUrl: SITE_URL,
      feedpath: canonicalSitemap,
    });
    console.log('   ✅ Submitted');
  } catch (e) {
    console.log(`   ❌ ${e.message}`);
  }

  // 4. Verify
  console.log('\n📋 Current sitemaps after cleanup:');
  const verify = await webmasters.sitemaps.list({ siteUrl: SITE_URL });
  for (const sm of (verify.data.sitemap || [])) {
    const contents = sm.contents?.map(c => `${c.type}: ${c.submitted} submitted`).join(', ') || 'pending';
    console.log(`   ${sm.path} — ${contents}`);
  }

  console.log('\n✅ Done\n');
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
