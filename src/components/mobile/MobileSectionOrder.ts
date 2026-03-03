/**
 * Mobile section order constants.
 * Usage: className={cn(existingClasses, MOBILE_ORDER.PRICING)}
 * Page wrapper must have `flex flex-col` for order to work.
 * Desktop resets via `md:order-none`.
 */
export const MOBILE_ORDER = {
  HERO:           'order-1  md:order-none',
  TRUST_STRIP:    'order-2  md:order-none',
  PRICING:        'order-3  md:order-none',
  WHATS_INCLUDED: 'order-4  md:order-none',
  WHY_CHOOSE:     'order-5  md:order-none',
  HOW_IT_WORKS:   'order-6  md:order-none',
  GALLERY:        'order-7  md:order-none',
  MID_CTA:        'order-8  md:order-none',
  WHO_ITS_FOR:    'order-9  md:order-none',
  PROBLEM:        'order-10 md:order-none',
  SOLUTION:       'order-11 md:order-none',
  SEASONAL:       'order-12 md:order-none',
  FAQ:            'order-13 md:order-none',
  RELATED:        'order-14 md:order-none',
  BOTTOM_CTA:     'order-15 md:order-none',
} as const;
