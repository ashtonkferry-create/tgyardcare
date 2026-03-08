# TotalGuard Pricing Spreadsheet Design

## Format
Google Sheets

## Structure: 2 Tabs

### Tab 1 — Pricing Calculator
- Input: Square footage
- Input: Select service (dropdown)
- Output: Calculated price (sq ft x rate, minimum applied, rounded to nearest $5)
- Clean, minimal, no clutter

### Tab 2 — Master Price Sheet (internal reference)
- All services listed with min price, per sq ft rate, description
- What's included in each service
- Seasonal availability

## Services & Pricing

| Service | Min Price | Per Sq Ft Rate |
|---------|-----------|---------------|
| Weekly Mowing + Trim + Blow | $55 | $0.004 |
| Edging (add-on) | $10 | $0.001 |
| Spring Cleanup | $150 | $0.018 |
| Fall Cleanup | $175 | $0.020 |
| Fertilizer Application | $85 | $0.008 |
| Herbicide Treatment | $95 | $0.009 |
| Core Aeration | $125 | $0.012 |
| Overseeding | $100 | $0.010 |
| Aeration + Overseed Bundle | $200 | $0.019 |
| Mulching (per yard installed) | $85/yd | — |
| Garden Bed Maintenance | $75 | $0.015 |
| Shrub/Hedge Trimming | $95 | Per shrub |
| Leaf Removal | $150 | $0.018 |
| Gutter Cleaning | $125 | $1.25/linear ft |
| Gutter Guards Install | — | $7/linear ft |
| Snow Removal (per visit) | $65 | $0.003 |
| Snow Season Contract | $500 | $0.030 |

## Calculator Logic
- price = sq_ft * per_sqft_rate
- if price < minimum → use minimum
- round to nearest $5
- Mulching, shrub trimming, gutters use different units (yards, per shrub, linear ft)

## Visual Style
- Clean white background
- TotalGuard green (#4a7c59) headers
- Bold section dividers
- Big fonts, clear spacing
- Logo at top
