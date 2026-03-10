#!/usr/bin/env node
/**
 * Analyze CTR by page + query to find optimization opportunities
 * Usage: node scripts/gsc-ctr-analysis.mjs
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
  console.log('📊 CTR Analysis — Finding pages that need better titles/descriptions\n');

  // Get page+query combinations
  const res = await searchconsole.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: daysAgo(90),
      endDate: daysAgo(1),
      dimensions: ['page', 'query'],
      rowLimit: 200,
      dataState: 'all',
    },
  });

  const rows = res.data.rows || [];

  // Group by page
  const pageData = new Map();
  for (const row of rows) {
    const page = row.keys[0].replace('https://tgyardcare.com', '').replace('https://www.tgyardcare.com', '').replace('http://tgyardcare.com', '') || '/';
    if (!pageData.has(page)) {
      pageData.set(page, { queries: [], totalClicks: 0, totalImpressions: 0 });
    }
    const pd = pageData.get(page);
    pd.queries.push({ query: row.keys[1], clicks: row.clicks, impressions: row.impressions, ctr: row.ctr, position: row.position });
    pd.totalClicks += row.clicks;
    pd.totalImpressions += row.impressions;
  }

  // Sort by impressions (highest opportunity)
  const sorted = [...pageData.entries()].sort((a, b) => b[1].totalImpressions - a[1].totalImpressions);

  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  HIGH-IMPRESSION LOW-CTR PAGES (best optimization targets)');
  console.log('═══════════════════════════════════════════════════════════════\n');

  for (const [page, data] of sorted.slice(0, 15)) {
    const overallCtr = data.totalImpressions > 0 ? ((data.totalClicks / data.totalImpressions) * 100).toFixed(1) : '0.0';
    const icon = parseFloat(overallCtr) < 2.0 ? '🔴' : parseFloat(overallCtr) < 5.0 ? '🟡' : '🟢';
    console.log(`${icon} ${page}`);
    console.log(`   Clicks: ${data.totalClicks} | Impressions: ${data.totalImpressions} | CTR: ${overallCtr}%`);
    console.log(`   Top queries:`);
    const topQ = data.queries.sort((a, b) => b.impressions - a.impressions).slice(0, 5);
    for (const q of topQ) {
      console.log(`     "${q.query}" — ${q.impressions} imp, ${q.clicks} clicks, pos ${q.position.toFixed(1)}`);
    }
    console.log('');
  }

  // Specifically call out pages with position < 10 and CTR < 3% (they're on page 1 but not getting clicked)
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  PAGE 1 RANKINGS WITH LOW CTR (title/desc optimization)');
  console.log('═══════════════════════════════════════════════════════════════\n');

  for (const row of rows) {
    if (row.position <= 10 && row.ctr < 0.03 && row.impressions >= 10) {
      const page = row.keys[0].replace('https://tgyardcare.com', '').replace('https://www.tgyardcare.com', '').replace('http://tgyardcare.com', '') || '/';
      console.log(`  🎯 "${row.keys[1]}" → ${page}`);
      console.log(`     Position: ${row.position.toFixed(1)} | Impressions: ${row.impressions} | CTR: ${(row.ctr * 100).toFixed(1)}% | Clicks: ${row.clicks}`);
    }
  }

  console.log('\n✅ Done\n');
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
