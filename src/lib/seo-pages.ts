import type { Calculator as Tool } from '@/lib/calculators';
import { calculators as tools } from '@/lib/calculators';

export const SEO_PAGE_SLUGS = [
  'json-tools-online',
  'regex-tools-online',
  'base64-tools',
  'developer-tools',
  'free-developer-tools',
  'best-developer-tools',
  'online-dev-tools',
] as const;

export type SeoPageSlug = (typeof SEO_PAGE_SLUGS)[number];

export type SeoPageConfig = {
  slug: SeoPageSlug;
  title: string;
  description: string;
  metaDescription: string;
  /** Category slug (matches tool.category) or null for custom filter / all */
  category: string | null;
  /** Custom filter; used when category is null. Return true to include tool. */
  filterTools?: (tool: Tool) => boolean;
};

const configs: SeoPageConfig[] = [
  {
    slug: 'json-tools-online',
    title: 'JSON Tools Online',
    description:
      'Browse the best JSON tools including JSON formatter, validator, and converters available on CalcSuite Pro.',
    metaDescription:
      'Use free JSON tools online including JSON formatter and JSON converters built for developers.',
    category: 'json',
  },
  {
    slug: 'regex-tools-online',
    title: 'Regex Tools Online',
    description:
      'Test and build regex patterns with our free regex tester and regex utilities. No sign-up required.',
    metaDescription:
      'Free regex tools online including regex tester and pattern generator for developers.',
    category: 'text',
  },
  {
    slug: 'base64-tools',
    title: 'Base64 Tools',
    description:
      'Encode and decode Base64 online. Use our Base64 encoder and decoder plus image-to-Base64 tools on CalcSuite Pro.',
    metaDescription:
      'Free Base64 encoder and decoder online. Encode, decode, and convert images to Base64 in your browser.',
    category: null,
    filterTools: (t) =>
      t.slug.includes('base64') ||
      t.name.toLowerCase().includes('base64'),
  },
  {
    slug: 'developer-tools',
    title: 'Developer Tools',
    description:
      'A full set of developer tools for formatting, encoding, validation, conversion, and more. All free and running in your browser.',
    metaDescription:
      'Free developer tools online: JSON formatter, encoders, validators, converters, and dev utilities.',
    category: null,
    filterTools: () => true,
  },
  {
    slug: 'free-developer-tools',
    title: 'Free Developer Tools',
    description:
      'Use the best free developer tools on CalcSuite Pro—JSON, Base64, regex, JWT, UUID, and dozens more. No account required.',
    metaDescription:
      'Free developer tools including JSON formatter, Base64 encoder, regex tester, and more. No sign-up.',
    category: null,
    filterTools: () => true,
  },
  {
    slug: 'best-developer-tools',
    title: 'Best Developer Tools',
    description:
      'Curated collection of the best developer tools: formatters, validators, encoders, and converters. Free and fast on CalcSuite Pro.',
    metaDescription:
      'Best free developer tools online: JSON formatter, Base64, regex, JWT decoder, and more for developers.',
    category: null,
    filterTools: () => true,
  },
  {
    slug: 'online-dev-tools',
    title: 'Online Dev Tools',
    description:
      'Run developer tools directly in your browser. Format JSON, encode Base64, test regex, convert files, and more—no install needed.',
    metaDescription:
      'Online dev tools: JSON formatter, Base64 encoder, regex tester, file converters. Free and in-browser.',
    category: null,
    filterTools: () => true,
  },
];

export function getSeoPageConfig(slug: string): SeoPageConfig | null {
  return configs.find((c) => c.slug === slug) ?? null;
}

export function getSeoPageTools(config: SeoPageConfig): Tool[] {
  if (config.category) {
    return tools.filter((t) => t.category === config.category);
  }
  if (config.filterTools) {
    return tools.filter(config.filterTools);
  }
  return [];
}

export function getAllSeoPageConfigs(): SeoPageConfig[] {
  return configs;
}
