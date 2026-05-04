/**
 * Feature flags for auth, pricing, and homepage sections.
 * Set to true when ready to show these features in the UI and navigation.
 */
export const features = {
  authEnabled: false,
  pricingEnabled: false,
  /** Homepage “calculators at a glance” tab strip (`ToolsTab`); enable when screenshots/copy are ready. */
  homepageToolsTabEnabled: false,
} as const;
