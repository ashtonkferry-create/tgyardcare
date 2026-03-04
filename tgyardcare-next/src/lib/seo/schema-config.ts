// Central schema registry for TotalGuard Yard Care
// Used by ServiceSchema, LocationSchema, and schema-generator cron

export const BASE_URL = 'https://tgyardcare.com';
export const ORG_ID = `${BASE_URL}/#organization`;

export const ALL_CITIES = [
  'Madison', 'Middleton', 'Waunakee', 'Monona', 'Sun Prairie',
  'Fitchburg', 'Verona', 'McFarland', 'Cottage Grove', 'DeForest',
  'Oregon', 'Stoughton',
];

// ----- Service Configs -----

export type ServiceSchemaConfig = {
  name: string;
  breadcrumbName: string;
  description: string;
  longDescription: string;
  keywords: string[];
  seasonality?: 'year-round' | 'spring' | 'summer' | 'fall' | 'winter';
  priceRange?: { low: number; high: number; unit: string };
  howToSteps?: Array<{ name: string; text: string }>;
};

export const SERVICE_CONFIGS: Record<string, ServiceSchemaConfig> = {
  mowing: {
    name: 'Lawn Mowing',
    breadcrumbName: 'Lawn Mowing',
    description: 'Professional weekly lawn mowing in Madison & Dane County with same crew, clean edges, and professional stripes.',
    longDescription: 'TG Yard Care delivers precision lawn mowing to 500+ Madison-area properties. Every visit includes mowing at the correct height, edging along all hard surfaces, trimming around obstacles, and blowing clippings off paved areas. Same trusted crew every time. No contracts.',
    keywords: ['lawn mowing Madison WI', 'grass cutting', 'weekly mowing service', 'lawn care'],
    seasonality: 'summer',
    priceRange: { low: 30, high: 60, unit: 'per cut' },
    howToSteps: [
      { name: 'Request a Free Quote', text: 'Contact us by phone at 608-535-6057 or through our online form. We ask about your property size and mowing preferences.' },
      { name: 'Property Assessment', text: 'We evaluate your lawn size, terrain, and any obstacles to provide accurate pricing.' },
      { name: 'Scheduled Mowing', text: 'Your assigned crew arrives on your scheduled day and mows at the optimal 3-3.5 inch height for Wisconsin grass types.' },
      { name: 'Edge & Trim', text: 'All walkways, driveways, and garden bed edges are precision-cut. Obstacles like trees and fences are carefully trimmed around.' },
      { name: 'Cleanup & Inspection', text: 'Clippings are blown off all hard surfaces. We do a final walk-through to ensure quality before leaving.' },
    ],
  },
  'snow-removal': {
    name: 'Snow Removal',
    breadcrumbName: 'Snow Removal',
    description: 'Reliable residential snow removal in Madison and surrounding Dane County cities. Driveways, walkways, and steps cleared before you wake up.',
    longDescription: 'TG Yard Care provides automatic snow removal triggered by accumulation thresholds. We handle driveways, walkways, front steps, and back patio access. Ice melt applied to all surfaces. Dispatch begins at 2 inches of snowfall.',
    keywords: ['snow removal Madison WI', 'snow plowing Dane County', 'driveway snow clearing'],
    seasonality: 'winter',
    priceRange: { low: 45, high: 85, unit: 'per visit' },
    howToSteps: [
      { name: 'Sign Up for Winter Service', text: 'Call 608-535-6057 or submit our online form before the first snowfall. We set your accumulation trigger threshold (typically 2 inches).' },
      { name: 'Automatic Dispatch', text: 'When snowfall reaches your trigger threshold, our crew is automatically dispatched — no need to call. Service begins as early as 4 AM.' },
      { name: 'Driveway & Walkway Clearing', text: 'We plow or shovel your driveway, clear all walkways to your front and back doors, and brush off front steps.' },
      { name: 'Ice Melt Application', text: 'Pet-safe ice melt is applied to all cleared surfaces to prevent refreeze and ensure safe footing.' },
      { name: 'Completion Notification', text: 'You receive a text or photo confirmation when service is complete, usually before you leave for work.' },
    ],
  },
  'leaf-removal': {
    name: 'Leaf Removal',
    breadcrumbName: 'Leaf Removal',
    description: 'Complete fall leaf cleanup and removal in Madison, WI. Leaves blown, collected, and hauled away from your entire property.',
    longDescription: 'TG Yard Care removes all leaves from lawn areas, garden beds, and hard surfaces. We use commercial backpack blowers and vacuums to ensure thorough cleanup. Leaves are bagged and removed from property or mulched in place per your preference.',
    keywords: ['leaf removal Madison WI', 'fall cleanup Dane County', 'leaf cleanup service'],
    seasonality: 'fall',
    priceRange: { low: 150, high: 400, unit: 'per cleanup' },
    howToSteps: [
      { name: 'Schedule Your Cleanup', text: 'Call 608-535-6057 or book online. We typically schedule leaf removal from mid-October through late November in the Madison area.' },
      { name: 'Lawn & Bed Clearing', text: 'Our crew uses commercial backpack blowers to move all leaves from lawn areas, garden beds, and around foundations into collection piles.' },
      { name: 'Hard Surface Cleanup', text: 'Driveways, sidewalks, patios, and gutters at ground level are cleared of all leaf debris.' },
      { name: 'Collection & Haul-Away', text: 'Leaves are vacuumed or bagged and removed from your property entirely. We can also mulch-in-place if you prefer organic decomposition.' },
      { name: 'Final Inspection', text: 'We walk the entire property to ensure no leaves remain in corners, along fences, or behind structures.' },
    ],
  },
  'gutter-cleaning': {
    name: 'Gutter Cleaning',
    breadcrumbName: 'Gutter Cleaning',
    description: 'Professional gutter cleaning and flushing in Madison WI. Debris removed, downspouts flushed, drainage verified.',
    longDescription: 'TG Yard Care cleans gutters by hand and with vacuum systems. All debris is removed from gutters and downspouts. We flush every downspout to verify clear drainage and inspect for loose hangers or damage. Before and after photos provided.',
    keywords: ['gutter cleaning Madison WI', 'gutter service Dane County', 'clean gutters'],
    seasonality: 'fall',
    priceRange: { low: 100, high: 250, unit: 'per cleaning' },
    howToSteps: [
      { name: 'Request a Quote', text: 'Call 608-535-6057 or fill out our online form. We ask about your home height (1 or 2 story), linear footage of gutters, and any known issues.' },
      { name: 'Debris Removal', text: 'We climb up and remove all leaves, twigs, shingle grit, and packed debris from every gutter run by hand and with vacuum tools.' },
      { name: 'Downspout Flushing', text: 'Every downspout is flushed with water to verify clear drainage. Clogs are cleared with a plumber snake if needed.' },
      { name: 'Hanger & Damage Inspection', text: 'We check for loose hangers, sagging sections, rust spots, and any areas where water is pooling instead of flowing to downspouts.' },
      { name: 'Before & After Photos', text: 'You receive before and after photos of your gutters so you can see exactly what was removed and the clean result.' },
    ],
  },
  fertilization: {
    name: 'Lawn Fertilization',
    breadcrumbName: 'Fertilization',
    description: 'Seasonal lawn fertilization and overseeding programs in Madison WI. Custom nutrient programs for thick, green turf.',
    longDescription: 'TG Yard Care applies professional-grade granular fertilizer on a season-appropriate schedule. Spring programs focus on quick green-up and root stimulation. Fall programs build deep root reserves for winter. Overseeding included in fall applications.',
    keywords: ['lawn fertilization Madison WI', 'overseeding Dane County', 'lawn treatment'],
    seasonality: 'year-round',
    priceRange: { low: 50, high: 120, unit: 'per application' },
    howToSteps: [
      { name: 'Lawn Assessment', text: 'Call 608-535-6057 to schedule. We inspect your lawn for thin spots, color issues, and soil conditions to determine the right nutrient blend.' },
      { name: 'Custom Program Design', text: 'We build a seasonal fertilization schedule tailored to your grass type — typically 4-5 applications from early spring through late fall for Wisconsin lawns.' },
      { name: 'Professional Application', text: 'Granular fertilizer is spread evenly with a calibrated commercial spreader. We adjust the rate for shaded vs. sunny areas of your property.' },
      { name: 'Overseeding (Fall)', text: 'Fall applications include overseeding with a Wisconsin-hardy grass blend to fill in bare and thin areas before winter dormancy.' },
      { name: 'Progress Check', text: 'We monitor your lawn between visits and adjust the program if needed. You receive updates on what was applied and what to expect next.' },
    ],
  },
  aeration: {
    name: 'Lawn Aeration',
    breadcrumbName: 'Lawn Aeration',
    description: 'Core lawn aeration in Madison & Dane County. Reduces compaction, improves drainage, and thickens turf — best done in fall.',
    longDescription: 'TG Yard Care uses commercial core aerators to extract 3-inch plugs across your entire lawn. Cores are left on the surface to break down naturally. Aeration dramatically improves water, air, and nutrient penetration to roots. Pairs perfectly with fall overseeding.',
    keywords: ['lawn aeration Madison WI', 'core aeration Dane County', 'soil compaction relief'],
    seasonality: 'fall',
    priceRange: { low: 80, high: 200, unit: 'per treatment' },
    howToSteps: [
      { name: 'Book Your Aeration', text: 'Call 608-535-6057 or book online. The ideal window in Wisconsin is mid-August through mid-October when soil is warm and slightly moist.' },
      { name: 'Pre-Aeration Watering', text: 'We recommend watering your lawn the day before so the soil is soft enough for deep core extraction. We will remind you when your date approaches.' },
      { name: 'Core Aeration Pass', text: 'Our commercial core aerator makes two passes across your entire lawn, pulling 2-3 inch soil plugs every few inches to break through compaction.' },
      { name: 'Plug Breakdown', text: 'Soil plugs are left on the surface to decompose naturally over 1-2 weeks, returning nutrients to the topsoil layer.' },
      { name: 'Optional Overseeding', text: 'For best results, we can immediately overseed with a Wisconsin-hardy grass blend. Seeds fall directly into the aeration holes for excellent soil contact and germination.' },
    ],
  },
  'fall-cleanup': {
    name: 'Fall Cleanup',
    breadcrumbName: 'Fall Cleanup',
    description: 'Complete fall yard cleanup in Madison WI — leaves, debris, and final mow to prepare your lawn for Wisconsin winter.',
    longDescription: 'TG Yard Care performs a comprehensive fall preparation: final mowing at recommended winter height, complete leaf removal from all areas, garden bed cleanup, cutting back perennials, and hauling all debris. Your property is buttoned up before the first freeze.',
    keywords: ['fall cleanup Madison WI', 'fall yard cleanup Dane County', 'fall lawn service'],
    seasonality: 'fall',
    priceRange: { low: 200, high: 500, unit: 'per cleanup' },
    howToSteps: [
      { name: 'Schedule Before the Freeze', text: 'Call 608-535-6057 or book online. We schedule fall cleanups from late October through mid-November before the ground freezes in the Madison area.' },
      { name: 'Final Mow at Winter Height', text: 'We mow the entire lawn at the recommended 2.5-inch winter height to prevent snow mold and matting during the long Wisconsin winter.' },
      { name: 'Complete Leaf Removal', text: 'All leaves are blown, collected, and removed from lawn areas, garden beds, walkways, and around foundations using commercial-grade equipment.' },
      { name: 'Garden Bed Winterization', text: 'Perennials are cut back to the crown, spent annuals are pulled, and beds are cleared of debris. Sensitive plants are noted for spring return.' },
      { name: 'Debris Haul-Away & Final Check', text: 'All collected material is removed from your property. We do a final walk-through to confirm your yard is fully prepared for winter.' },
    ],
  },
  'spring-cleanup': {
    name: 'Spring Cleanup',
    breadcrumbName: 'Spring Cleanup',
    description: 'Professional spring yard cleanup in Madison WI. Remove winter debris, dethatch, edge beds, and set your lawn up for the season.',
    longDescription: 'TG Yard Care removes all winter debris, dead plant material, and matted leaves. We dethatch heavy thatch buildup, re-edge garden beds, and clear hardscapes. First mowing of the season included. Your yard goes from winter-worn to season-ready in one visit.',
    keywords: ['spring cleanup Madison WI', 'spring yard cleanup Dane County', 'spring lawn service'],
    seasonality: 'spring',
    priceRange: { low: 175, high: 450, unit: 'per cleanup' },
    howToSteps: [
      { name: 'Book Your Spring Slot', text: 'Call 608-535-6057 or book online as early as March. Spring cleanup slots fill fast — we schedule based on snow melt and ground conditions in your area.' },
      { name: 'Winter Debris Removal', text: 'We clear all sticks, branches, litter, and dead plant material that accumulated over the Wisconsin winter from lawn, beds, and hardscapes.' },
      { name: 'Dethatching', text: 'Heavy thatch buildup is raked and removed with power equipment. This allows water, air, and nutrients to reach the soil and promotes healthy spring growth.' },
      { name: 'Bed Edging & Cleanup', text: 'All garden bed borders are re-cut with a clean crisp edge. Dead foliage is removed and beds are raked smooth.' },
      { name: 'First Mow of the Season', text: 'We do the first mow at 3 inches to remove dead tips and encourage green-up. All clippings are blown off hard surfaces.' },
      { name: 'Season Readiness Check', text: 'We walk the property and flag any areas that may need attention — bare spots for seeding, drainage issues, or damaged turf from snow mold.' },
    ],
  },
  mulching: {
    name: 'Mulching',
    breadcrumbName: 'Mulching',
    description: 'Premium garden bed mulch installation in Madison WI. Double-shredded hardwood mulch at 3 inches depth for maximum weed suppression.',
    longDescription: 'TG Yard Care installs premium double-shredded hardwood mulch to a depth of 3 inches in all garden beds. Old mulch is removed or redistributed as needed. Edges are crisp-cut for a clean finish. Mulch suppresses weeds, retains moisture, and gives beds a polished look.',
    keywords: ['mulching Madison WI', 'garden bed mulch Dane County', 'mulch installation'],
    seasonality: 'spring',
    priceRange: { low: 150, high: 400, unit: 'per installation' },
    howToSteps: [
      { name: 'Get a Mulch Estimate', text: 'Call 608-535-6057 or request a quote online. We calculate cubic yards needed based on your total bed square footage and desired depth.' },
      { name: 'Bed Preparation', text: 'Existing old mulch is redistributed or removed. Weeds are pulled and bed edges are re-cut with a clean, crisp border against the turf.' },
      { name: 'Mulch Delivery', text: 'Premium double-shredded hardwood mulch is delivered in bulk directly to your property. We offer natural brown, dark brown, and black color options.' },
      { name: 'Even Installation', text: 'Mulch is spread by hand to a uniform 3-inch depth around all plants, trees, and shrubs. We keep mulch pulled back 2-3 inches from plant stems to prevent rot.' },
      { name: 'Cleanup', text: 'All excess mulch is removed from walkways, driveways, and lawn areas. Your property is left spotless with polished, professional-looking beds.' },
    ],
  },
  'garden-beds': {
    name: 'Garden Bed Care',
    breadcrumbName: 'Garden Bed Care',
    description: 'Garden bed maintenance and cleanup in Madison WI. Weeding, edging, and seasonal care for pristine plant beds.',
    longDescription: 'TG Yard Care maintains garden beds with hand-weeding, edging along turf borders, deadheading spent blooms, and debris removal. We keep beds tidy throughout the growing season so your landscape always looks intentional and maintained.',
    keywords: ['garden bed care Madison WI', 'garden maintenance Dane County', 'bed weeding'],
    seasonality: 'summer',
    priceRange: { low: 75, high: 200, unit: 'per visit' },
    howToSteps: [
      { name: 'Schedule Bed Maintenance', text: 'Call 608-535-6057 or book online. We offer one-time cleanups or recurring visits throughout the growing season (typically May through October).' },
      { name: 'Weed Removal', text: 'All weeds are pulled by hand from garden beds, including roots. We target broadleaf weeds, grasses, and volunteer seedlings growing among your plants.' },
      { name: 'Edge Refinement', text: 'Bed borders are re-cut along turf lines to maintain a clean, defined separation between lawn and garden areas.' },
      { name: 'Deadheading & Pruning', text: 'Spent blooms are removed from perennials and annuals to encourage continued flowering. Light shaping is done on overgrown plants.' },
      { name: 'Debris Removal & Raking', text: 'Fallen leaves, twigs, and organic debris are cleared from beds. Mulch is redistributed for a tidy, uniform appearance.' },
    ],
  },
  pruning: {
    name: 'Tree & Shrub Pruning',
    breadcrumbName: 'Pruning',
    description: 'Tree and shrub pruning services in Madison WI. Shape, thin, and rejuvenate ornamental plants for health and curb appeal.',
    longDescription: 'TG Yard Care prunes shrubs and small ornamental trees for shape, health, and clearance. We remove dead, crossing, and rubbing branches, thin dense growth for airflow, and shape plants to their natural form. Timing is matched to species for optimal results.',
    keywords: ['shrub pruning Madison WI', 'tree trimming Dane County', 'plant pruning service'],
    seasonality: 'spring',
    priceRange: { low: 100, high: 300, unit: 'per session' },
    howToSteps: [
      { name: 'Request a Pruning Consultation', text: 'Call 608-535-6057 or submit our online form. Describe which shrubs or trees need attention and we will advise on the best timing for your plant species.' },
      { name: 'Plant Assessment', text: 'We walk your property and identify which plants need pruning, the type of cuts required (shaping, thinning, rejuvenation), and any dead or diseased wood to remove.' },
      { name: 'Pruning Cuts', text: 'Each plant is pruned with clean, sharp tools using proper technique — heading cuts for density, thinning cuts for airflow, and removal cuts for dead or crossing branches.' },
      { name: 'Shape & Clearance', text: 'Plants are shaped to their natural growth habit. We ensure clearance from walkways, windows, siding, and neighboring plants for light and air circulation.' },
      { name: 'Debris Cleanup', text: 'All clippings and cut branches are collected and hauled off-site. The area around each plant is left clean and tidy.' },
    ],
  },
  weeding: {
    name: 'Weed Control',
    breadcrumbName: 'Weed Control',
    description: 'Hand weeding and weed control services in Madison WI. Beds and lawn areas kept weed-free all season.',
    longDescription: 'TG Yard Care removes weeds by hand from garden beds and lawn edges. We pull to the root and dispose of all material off-site. Recurring visits prevent re-establishment. Pairs with our mulching service for maximum suppression.',
    keywords: ['weed control Madison WI', 'weeding service Dane County', 'garden weeding'],
    seasonality: 'summer',
    priceRange: { low: 50, high: 150, unit: 'per visit' },
    howToSteps: [
      { name: 'Schedule Weeding Service', text: 'Call 608-535-6057 or book online. We offer single visits or recurring bi-weekly service throughout the growing season to keep weeds from coming back.' },
      { name: 'Weed Identification', text: 'Our crew identifies which plants are weeds versus intentional plantings in your beds. We ask about any plants you want preserved before we begin.' },
      { name: 'Hand Pulling to the Root', text: 'Every weed is pulled by hand with the full root system intact. This prevents regrowth that cutting or spraying alone often leaves behind.' },
      { name: 'Edge & Border Cleanup', text: 'Weeds growing in cracks along walkways, driveways, and bed borders are removed. Turf encroaching into beds is cut back.' },
      { name: 'Disposal & Mulch Check', text: 'All pulled weeds are bagged and removed from your property. We check mulch depth and recommend top-up if it has thinned below the 3-inch suppression threshold.' },
    ],
  },
  herbicide: {
    name: 'Herbicide Service',
    breadcrumbName: 'Herbicide Service',
    description: 'Professional herbicide application in Madison WI. Pre-emergent and post-emergent weed control for lawn and beds.',
    longDescription: 'TG Yard Care applies professional-grade herbicides with licensed applicators. Pre-emergent applications in spring prevent crabgrass and annual weed germination. Post-emergent treatments target broadleaf weeds in turf. Spot treatments available for beds.',
    keywords: ['herbicide service Madison WI', 'weed spray Dane County', 'lawn herbicide'],
    seasonality: 'spring',
    priceRange: { low: 60, high: 150, unit: 'per application' },
    howToSteps: [
      { name: 'Request a Weed Assessment', text: 'Call 608-535-6057 or book online. Describe the weed types you are seeing and we will recommend the right treatment approach for your lawn.' },
      { name: 'Treatment Plan', text: 'Our licensed applicator determines whether you need pre-emergent (prevents germination), post-emergent (kills active weeds), or both. Timing is based on soil temperature and weed lifecycle.' },
      { name: 'Professional Application', text: 'Herbicide is applied with calibrated spray equipment by a licensed technician. We target specific weed species while protecting your desirable turf grasses.' },
      { name: 'Safety Flagging', text: 'Treated areas are marked with small flags per Wisconsin regulations. We provide clear instructions on when it is safe for pets and children to return to the lawn.' },
      { name: 'Follow-Up Check', text: 'We return in 10-14 days to assess results. Stubborn weeds get a targeted spot retreatment at no additional charge.' },
    ],
  },
  'gutter-guards': {
    name: 'Gutter Guard Installation',
    breadcrumbName: 'Gutter Guards',
    description: 'Gutter guard installation in Madison WI. Reduce gutter cleanings and prevent debris buildup with professional guard systems.',
    longDescription: 'TG Yard Care installs micro-mesh and aluminum gutter guards that block leaves, pine needles, and debris while allowing water to flow freely. Correctly installed guards dramatically reduce the frequency of gutter cleanings and protect your fascia from water damage.',
    keywords: ['gutter guards Madison WI', 'gutter guard installation Dane County', 'leaf guard'],
    seasonality: 'fall',
    priceRange: { low: 800, high: 2500, unit: 'per installation' },
    howToSteps: [
      { name: 'Free On-Site Estimate', text: 'Call 608-535-6057 to schedule a free estimate. We measure your total gutter linear footage, assess roof pitch, and note any problem areas like valleys or pine tree proximity.' },
      { name: 'Guard System Selection', text: 'We recommend the right guard type for your situation — micro-mesh for homes near pine trees, aluminum screens for standard leaf exposure. We explain the pros and trade-offs of each option.' },
      { name: 'Gutter Pre-Cleaning', text: 'Before installation, we fully clean your gutters and flush all downspouts. Guards are only installed on clean, properly flowing gutter systems.' },
      { name: 'Professional Installation', text: 'Guards are measured, cut, and secured to each gutter run. We use manufacturer-specified fasteners and ensure tight seams at every joint to prevent debris bypass.' },
      { name: 'Drainage Verification', text: 'After installation, we run water through the entire system to verify proper flow rate. We check that water sheets over the guard surface and into the gutter without overshooting.' },
      { name: 'Warranty & Care Instructions', text: 'You receive warranty documentation and simple maintenance instructions. Most guard systems we install reduce cleaning frequency from twice yearly to once every 3-5 years.' },
    ],
  },
};

// ----- Location Configs -----

export type LocationSchemaConfig = {
  city: string;
  displayName: string;
  county: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  radius: number; // service radius in miles
};

export const LOCATION_CONFIGS: Record<string, LocationSchemaConfig> = {
  madison: {
    city: 'Madison',
    displayName: 'Madison, WI',
    county: 'Dane',
    state: 'WI',
    zip: '53703',
    lat: 43.0731,
    lng: -89.4012,
    radius: 5,
  },
  middleton: {
    city: 'Middleton',
    displayName: 'Middleton, WI',
    county: 'Dane',
    state: 'WI',
    zip: '53562',
    lat: 43.0975,
    lng: -89.5126,
    radius: 3,
  },
  waunakee: {
    city: 'Waunakee',
    displayName: 'Waunakee, WI',
    county: 'Dane',
    state: 'WI',
    zip: '53597',
    lat: 43.1928,
    lng: -89.4545,
    radius: 3,
  },
  monona: {
    city: 'Monona',
    displayName: 'Monona, WI',
    county: 'Dane',
    state: 'WI',
    zip: '53716',
    lat: 43.0630,
    lng: -89.3345,
    radius: 2,
  },
  'sun-prairie': {
    city: 'Sun Prairie',
    displayName: 'Sun Prairie, WI',
    county: 'Dane',
    state: 'WI',
    zip: '53590',
    lat: 43.1836,
    lng: -89.2135,
    radius: 3,
  },
  fitchburg: {
    city: 'Fitchburg',
    displayName: 'Fitchburg, WI',
    county: 'Dane',
    state: 'WI',
    zip: '53711',
    lat: 42.9970,
    lng: -89.4395,
    radius: 3,
  },
  verona: {
    city: 'Verona',
    displayName: 'Verona, WI',
    county: 'Dane',
    state: 'WI',
    zip: '53593',
    lat: 42.9903,
    lng: -89.5337,
    radius: 3,
  },
  mcfarland: {
    city: 'McFarland',
    displayName: 'McFarland, WI',
    county: 'Dane',
    state: 'WI',
    zip: '53558',
    lat: 43.0161,
    lng: -89.2945,
    radius: 2,
  },
  'cottage-grove': {
    city: 'Cottage Grove',
    displayName: 'Cottage Grove, WI',
    county: 'Dane',
    state: 'WI',
    zip: '53527',
    lat: 43.0784,
    lng: -89.2009,
    radius: 2,
  },
  deforest: {
    city: 'DeForest',
    displayName: 'DeForest, WI',
    county: 'Dane',
    state: 'WI',
    zip: '53532',
    lat: 43.2428,
    lng: -89.3448,
    radius: 2,
  },
  oregon: {
    city: 'Oregon',
    displayName: 'Oregon, WI',
    county: 'Dane',
    state: 'WI',
    zip: '53575',
    lat: 42.9244,
    lng: -89.3787,
    radius: 2,
  },
  stoughton: {
    city: 'Stoughton',
    displayName: 'Stoughton, WI',
    county: 'Dane',
    state: 'WI',
    zip: '53589',
    lat: 42.9177,
    lng: -89.2181,
    radius: 3,
  },
};

// Breadcrumb human-readable names for URL segments
export const BREADCRUMB_NAMES: Record<string, string> = {
  services: 'Services',
  locations: 'Service Areas',
  commercial: 'Commercial Services',
  blog: 'Blog',
  about: 'About',
  contact: 'Contact',
  reviews: 'Reviews',
  careers: 'Careers',
  // service slugs
  mowing: 'Lawn Mowing',
  'snow-removal': 'Snow Removal',
  'leaf-removal': 'Leaf Removal',
  'gutter-cleaning': 'Gutter Cleaning',
  fertilization: 'Fertilization',
  aeration: 'Lawn Aeration',
  'fall-cleanup': 'Fall Cleanup',
  'spring-cleanup': 'Spring Cleanup',
  mulching: 'Mulching',
  'garden-beds': 'Garden Bed Care',
  pruning: 'Tree & Shrub Pruning',
  weeding: 'Weed Control',
  herbicide: 'Herbicide Service',
  'gutter-guards': 'Gutter Guards',
  // location slugs
  madison: 'Madison, WI',
  middleton: 'Middleton, WI',
  waunakee: 'Waunakee, WI',
  monona: 'Monona, WI',
  'sun-prairie': 'Sun Prairie, WI',
  fitchburg: 'Fitchburg, WI',
  verona: 'Verona, WI',
  mcfarland: 'McFarland, WI',
  'cottage-grove': 'Cottage Grove, WI',
  deforest: 'DeForest, WI',
  oregon: 'Oregon, WI',
  stoughton: 'Stoughton, WI',
};
