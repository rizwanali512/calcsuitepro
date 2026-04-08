export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'CalcSuite Pro',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
};

