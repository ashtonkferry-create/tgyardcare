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
};

export const SERVICE_CONFIGS: Record<string, ServiceSchemaConfig> = {
  mowing: {
    name: 'Lawn Mowing',
    breadcrumbName: 'Lawn Mowing',
    description: 'Professional weekly lawn mowing in Madison & Dane County with same crew, clean edges, and professional stripes.',
    longDescription: 'TG Yard Care delivers precision lawn mowing to 500+ Madison-area properties. Every visit includes mowing at the correct height, edging along all hard surfaces, trimming around obstacles, and blowing clippings off paved areas. Same trusted crew every time. No contracts.',
    keywords: ['lawn mowing Madison WI', 'grass cutting', 'weekly mowing service', 'lawn care'],
    seasonality: 'summer',
  },
  'snow-removal': {
    name: 'Snow Removal',
    breadcrumbName: 'Snow Removal',
    description: 'Reliable residential snow removal in Madison and surrounding Dane County cities. Driveways, walkways, and steps cleared before you wake up.',
    longDescription: 'TG Yard Care provides automatic snow removal triggered by accumulation thresholds. We handle driveways, walkways, front steps, and back patio access. Ice melt applied to all surfaces. Dispatch begins at 2 inches of snowfall.',
    keywords: ['snow removal Madison WI', 'snow plowing Dane County', 'driveway snow clearing'],
    seasonality: 'winter',
  },
  'leaf-removal': {
    name: 'Leaf Removal',
    breadcrumbName: 'Leaf Removal',
    description: 'Complete fall leaf cleanup and removal in Madison, WI. Leaves blown, collected, and hauled away from your entire property.',
    longDescription: 'TG Yard Care removes all leaves from lawn areas, garden beds, and hard surfaces. We use commercial backpack blowers and vacuums to ensure thorough cleanup. Leaves are bagged and removed from property or mulched in place per your preference.',
    keywords: ['leaf removal Madison WI', 'fall cleanup Dane County', 'leaf cleanup service'],
    seasonality: 'fall',
  },
  'gutter-cleaning': {
    name: 'Gutter Cleaning',
    breadcrumbName: 'Gutter Cleaning',
    description: 'Professional gutter cleaning and flushing in Madison WI. Debris removed, downspouts flushed, drainage verified.',
    longDescription: 'TG Yard Care cleans gutters by hand and with vacuum systems. All debris is removed from gutters and downspouts. We flush every downspout to verify clear drainage and inspect for loose hangers or damage. Before and after photos provided.',
    keywords: ['gutter cleaning Madison WI', 'gutter service Dane County', 'clean gutters'],
    seasonality: 'fall',
  },
  fertilization: {
    name: 'Lawn Fertilization',
    breadcrumbName: 'Fertilization',
    description: 'Seasonal lawn fertilization and overseeding programs in Madison WI. Custom nutrient programs for thick, green turf.',
    longDescription: 'TG Yard Care applies professional-grade granular fertilizer on a season-appropriate schedule. Spring programs focus on quick green-up and root stimulation. Fall programs build deep root reserves for winter. Overseeding included in fall applications.',
    keywords: ['lawn fertilization Madison WI', 'overseeding Dane County', 'lawn treatment'],
    seasonality: 'year-round',
  },
  aeration: {
    name: 'Lawn Aeration',
    breadcrumbName: 'Lawn Aeration',
    description: 'Core lawn aeration in Madison & Dane County. Reduces compaction, improves drainage, and thickens turf — best done in fall.',
    longDescription: 'TG Yard Care uses commercial core aerators to extract 3-inch plugs across your entire lawn. Cores are left on the surface to break down naturally. Aeration dramatically improves water, air, and nutrient penetration to roots. Pairs perfectly with fall overseeding.',
    keywords: ['lawn aeration Madison WI', 'core aeration Dane County', 'soil compaction relief'],
    seasonality: 'fall',
  },
  'fall-cleanup': {
    name: 'Fall Cleanup',
    breadcrumbName: 'Fall Cleanup',
    description: 'Complete fall yard cleanup in Madison WI — leaves, debris, and final mow to prepare your lawn for Wisconsin winter.',
    longDescription: 'TG Yard Care performs a comprehensive fall preparation: final mowing at recommended winter height, complete leaf removal from all areas, garden bed cleanup, cutting back perennials, and hauling all debris. Your property is buttoned up before the first freeze.',
    keywords: ['fall cleanup Madison WI', 'fall yard cleanup Dane County', 'fall lawn service'],
    seasonality: 'fall',
  },
  'spring-cleanup': {
    name: 'Spring Cleanup',
    breadcrumbName: 'Spring Cleanup',
    description: 'Professional spring yard cleanup in Madison WI. Remove winter debris, dethatch, edge beds, and set your lawn up for the season.',
    longDescription: 'TG Yard Care removes all winter debris, dead plant material, and matted leaves. We dethatch heavy thatch buildup, re-edge garden beds, and clear hardscapes. First mowing of the season included. Your yard goes from winter-worn to season-ready in one visit.',
    keywords: ['spring cleanup Madison WI', 'spring yard cleanup Dane County', 'spring lawn service'],
    seasonality: 'spring',
  },
  mulching: {
    name: 'Mulching',
    breadcrumbName: 'Mulching',
    description: 'Premium garden bed mulch installation in Madison WI. Double-shredded hardwood mulch at 3 inches depth for maximum weed suppression.',
    longDescription: 'TG Yard Care installs premium double-shredded hardwood mulch to a depth of 3 inches in all garden beds. Old mulch is removed or redistributed as needed. Edges are crisp-cut for a clean finish. Mulch suppresses weeds, retains moisture, and gives beds a polished look.',
    keywords: ['mulching Madison WI', 'garden bed mulch Dane County', 'mulch installation'],
    seasonality: 'spring',
  },
  'garden-beds': {
    name: 'Garden Bed Care',
    breadcrumbName: 'Garden Bed Care',
    description: 'Garden bed maintenance and cleanup in Madison WI. Weeding, edging, and seasonal care for pristine plant beds.',
    longDescription: 'TG Yard Care maintains garden beds with hand-weeding, edging along turf borders, deadheading spent blooms, and debris removal. We keep beds tidy throughout the growing season so your landscape always looks intentional and maintained.',
    keywords: ['garden bed care Madison WI', 'garden maintenance Dane County', 'bed weeding'],
    seasonality: 'summer',
  },
  pruning: {
    name: 'Tree & Shrub Pruning',
    breadcrumbName: 'Pruning',
    description: 'Tree and shrub pruning services in Madison WI. Shape, thin, and rejuvenate ornamental plants for health and curb appeal.',
    longDescription: 'TG Yard Care prunes shrubs and small ornamental trees for shape, health, and clearance. We remove dead, crossing, and rubbing branches, thin dense growth for airflow, and shape plants to their natural form. Timing is matched to species for optimal results.',
    keywords: ['shrub pruning Madison WI', 'tree trimming Dane County', 'plant pruning service'],
    seasonality: 'spring',
  },
  weeding: {
    name: 'Weed Control',
    breadcrumbName: 'Weed Control',
    description: 'Hand weeding and weed control services in Madison WI. Beds and lawn areas kept weed-free all season.',
    longDescription: 'TG Yard Care removes weeds by hand from garden beds and lawn edges. We pull to the root and dispose of all material off-site. Recurring visits prevent re-establishment. Pairs with our mulching service for maximum suppression.',
    keywords: ['weed control Madison WI', 'weeding service Dane County', 'garden weeding'],
    seasonality: 'summer',
  },
  herbicide: {
    name: 'Herbicide Service',
    breadcrumbName: 'Herbicide Service',
    description: 'Professional herbicide application in Madison WI. Pre-emergent and post-emergent weed control for lawn and beds.',
    longDescription: 'TG Yard Care applies professional-grade herbicides with licensed applicators. Pre-emergent applications in spring prevent crabgrass and annual weed germination. Post-emergent treatments target broadleaf weeds in turf. Spot treatments available for beds.',
    keywords: ['herbicide service Madison WI', 'weed spray Dane County', 'lawn herbicide'],
    seasonality: 'spring',
  },
  'gutter-guards': {
    name: 'Gutter Guard Installation',
    breadcrumbName: 'Gutter Guards',
    description: 'Gutter guard installation in Madison WI. Reduce gutter cleanings and prevent debris buildup with professional guard systems.',
    longDescription: 'TG Yard Care installs micro-mesh and aluminum gutter guards that block leaves, pine needles, and debris while allowing water to flow freely. Correctly installed guards dramatically reduce the frequency of gutter cleanings and protect your fascia from water damage.',
    keywords: ['gutter guards Madison WI', 'gutter guard installation Dane County', 'leaf guard'],
    seasonality: 'fall',
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
