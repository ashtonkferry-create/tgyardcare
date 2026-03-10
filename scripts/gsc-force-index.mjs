#!/usr/bin/env node
/**
 * Force-request indexing via Google Indexing API
 * Usage: node scripts/gsc-force-index.mjs
 */

import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const KEY_PATH = resolve(__dirname, '..', 'gsc-service-account.json');

const keyFile = JSON.parse(readFileSync(KEY_PATH, 'utf-8'));
const auth = new google.auth.GoogleAuth({
  credentials: keyFile,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});

const indexing = google.indexing({ version: 'v3', auth });

const URLS = [
  // Critical unindexed pages
  'https://tgyardcare.com/residential',
  'https://tgyardcare.com/services/hardscaping',
  'https://tgyardcare.com/service-areas',
  // All 12 location pages
  'https://tgyardcare.com/locations/madison',
  'https://tgyardcare.com/locations/middleton',
  'https://tgyardcare.com/locations/waunakee',
  'https://tgyardcare.com/locations/verona',
  'https://tgyardcare.com/locations/sun-prairie',
  'https://tgyardcare.com/locations/fitchburg',
  'https://tgyardcare.com/locations/deforest',
  'https://tgyardcare.com/locations/monona',
  'https://tgyardcare.com/locations/mcfarland',
  'https://tgyardcare.com/locations/oregon',
  'https://tgyardcare.com/locations/stoughton',
  'https://tgyardcare.com/locations/cottage-grove',
  // Unindexed service pages
  'https://tgyardcare.com/services/mulching',
  'https://tgyardcare.com/services/aeration',
  'https://tgyardcare.com/services/fertilization',
  'https://tgyardcare.com/services/overseeding',
  'https://tgyardcare.com/services/fall-cleanup',
  // Already indexed but re-submit for freshness
  'https://tgyardcare.com/',
  'https://tgyardcare.com/services',
  'https://tgyardcare.com/services/mowing',
  'https://tgyardcare.com/services/gutter-cleaning',
  'https://tgyardcare.com/services/herbicide',
  'https://tgyardcare.com/services/garden-beds',
  'https://tgyardcare.com/services/spring-cleanup',
  'https://tgyardcare.com/services/leaf-removal',
  'https://tgyardcare.com/services/snow-removal',
  'https://tgyardcare.com/commercial',
  'https://tgyardcare.com/commercial/lawn-care',
  'https://tgyardcare.com/commercial/snow-removal',
  'https://tgyardcare.com/about',
  'https://tgyardcare.com/blog',
  'https://tgyardcare.com/reviews',
  'https://tgyardcare.com/gallery',
  'https://tgyardcare.com/contact',
  'https://tgyardcare.com/team',
  'https://tgyardcare.com/faq',
];

async function main() {
  console.log(`🚀 Force-requesting indexing for ${URLS.length} URLs\n`);

  let success = 0;
  let failed = 0;

  for (const url of URLS) {
    const path = url.replace('https://tgyardcare.com', '') || '/';
    try {
      const res = await indexing.urlNotifications.publish({
        requestBody: { url, type: 'URL_UPDATED' },
      });
      const meta = res.data.urlNotificationMetadata;
      console.log(`  ✅ ${path}`);
      success++;
    } catch (e) {
      const msg = e.response?.data?.error?.message || e.message;
      console.log(`  ❌ ${path} — ${msg.substring(0, 120)}`);
      failed++;

      if (msg.includes('not been used') || msg.includes('not enabled') || msg.includes('PERMISSION_DENIED')) {
        console.log(`\n⚠️  Indexing API not enabled. Go to:`);
        console.log(`   https://console.cloud.google.com/apis/library/indexing.googleapis.com?project=totalguard-gsc`);
        console.log(`   Click "Enable", then re-run.\n`);
        break;
      }
      if (msg.includes('quota') || msg.includes('rateLimitExceeded')) {
        console.log(`\n⚠️  Rate limited. Waiting 60s...`);
        await new Promise(r => setTimeout(r, 60000));
      }
    }
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\n📊 Results: ${success} submitted, ${failed} failed\n`);
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
