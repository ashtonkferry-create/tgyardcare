/**
 * Utility functions for managing seasonal services
 */

export type ServiceSeason = 'spring' | 'summer' | 'fall' | 'winter';

export const getCurrentServiceSeason = (): ServiceSeason => {
  const month = new Date().getMonth(); // 0-11
  if (month >= 2 && month <= 4) return 'spring';   // Mar-May
  if (month >= 5 && month <= 8) return 'summer';    // Jun-Sep
  if (month >= 9 && month <= 10) return 'fall';     // Oct-Nov
  return 'winter';                                   // Dec-Feb
};

export const isSnowRemovalSeason = (): boolean => {
  return getCurrentServiceSeason() === 'winter';
};

export const getSnowRemovalSeasonDates = (): { start: string; end: string } => {
  const currentYear = new Date().getFullYear();
  return {
    start: `November 1, ${currentYear}`,
    end: `March 31, ${currentYear + 1}`
  };
};

/**
 * Seasonal service priority order (by title).
 * Conversion logic:
 *  - Lead with highest-demand seasonal service (what they need NOW)
 *  - Follow with high-value recurring services (biggest contracts)
 *  - Then complementary upsells
 *  - Niche/seasonal-off services last
 */
const seasonalPriority: Record<ServiceSeason, string[]> = {
  spring: [
    'Spring Cleanup',      // Urgent seasonal — everyone needs this first
    'Lawn Mowing',         // Recurring revenue anchor — weekly contract
    'Fertilization',       // Upsell on mowing — 4-6 app season package
    'Mulching',            // High visual impact, one-time spring job
    'Garden Beds',         // Complementary to mulching
    'Aeration',            // Spring aeration window
    'Herbicide Services',  // Pre-emergent timing
    'Weeding',             // Ongoing maintenance add-on
    'Bush Trimming',       // Spring shaping
    'Gutter Cleaning',     // Post-winter debris
    'Gutter Guards',       // Upsell on gutter cleaning
    'Leaf Removal',        // Off-season
    'Fall Cleanup',        // Off-season
    'Snow Removal',        // Off-season
  ],
  summer: [
    'Lawn Mowing',         // Peak demand — weekly recurring
    'Fertilization',       // Mid-season applications
    'Herbicide Services',  // Active weed season
    'Weeding',             // Ongoing maintenance
    'Garden Beds',         // Seasonal planting
    'Bush Trimming',       // Summer shaping
    'Mulching',            // Refresh mulch
    'Aeration',            // Late summer prep
    'Gutter Cleaning',     // Storm debris
    'Gutter Guards',       // Upsell
    'Spring Cleanup',      // Off-season
    'Fall Cleanup',        // Coming soon teaser
    'Leaf Removal',        // Off-season
    'Snow Removal',        // Off-season
  ],
  fall: [
    'Fall Cleanup',        // Urgent seasonal
    'Leaf Removal',        // Peak demand
    'Gutter Cleaning',     // Pre-winter critical
    'Gutter Guards',       // Upsell — protect before winter
    'Lawn Mowing',         // Final mows
    'Aeration',            // Fall aeration window
    'Fertilization',       // Winterizer application
    'Mulching',            // Fall bed prep
    'Garden Beds',         // Fall planting
    'Bush Trimming',       // Fall shaping
    'Herbicide Services',  // Late-season weeds
    'Weeding',             // Winding down
    'Snow Removal',        // Early bird contracts
    'Spring Cleanup',      // Off-season
  ],
  winter: [
    'Snow Removal',        // Primary demand
    'Gutter Guards',       // Ice dam prevention
    'Gutter Cleaning',     // Post-fall debris
    'Lawn Mowing',         // Spring booking lead
    'Spring Cleanup',      // Early bird booking
    'Fertilization',       // Pre-book spring program
    'Mulching',            // Pre-book
    'Aeration',            // Pre-book
    'Garden Beds',         // Planning season
    'Bush Trimming',       // Dormant pruning
    'Herbicide Services',  // Off-season
    'Weeding',             // Off-season
    'Leaf Removal',        // Off-season
    'Fall Cleanup',        // Off-season
  ],
};

/**
 * Sort services array by seasonal conversion priority.
 * Services not in the priority list fall to the end.
 */
export function sortServicesBySeason<T extends { title: string }>(services: T[]): T[] {
  const season = getCurrentServiceSeason();
  const order = seasonalPriority[season];
  return [...services].sort((a, b) => {
    const ai = order.indexOf(a.title);
    const bi = order.indexOf(b.title);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
}
