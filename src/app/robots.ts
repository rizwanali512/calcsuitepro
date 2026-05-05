import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/site-url';

/** Paths that should not be crawled (auth, payments, server APIs). */
const DISALLOW = ['/api/', '/dashboard/', '/billing/'] as const;

/**
 * Explicit rules for common LLM and AI crawlers so they are not accidentally blocked.
 * The wildcard rule already allows them; these entries document intent for operators and mirrors.
 */
const AI_AND_DEFAULT_RULES: MetadataRoute.Robots['rules'] = [
  { userAgent: '*', allow: '/', disallow: [...DISALLOW] },
  { userAgent: 'GPTBot', allow: '/', disallow: [...DISALLOW] },
  { userAgent: 'ChatGPT-User', allow: '/', disallow: [...DISALLOW] },
  { userAgent: 'ClaudeBot', allow: '/', disallow: [...DISALLOW] },
  { userAgent: 'Claude-Web', allow: '/', disallow: [...DISALLOW] },
  { userAgent: 'anthropic-ai', allow: '/', disallow: [...DISALLOW] },
  { userAgent: 'PerplexityBot', allow: '/', disallow: [...DISALLOW] },
  { userAgent: 'Google-Extended', allow: '/', disallow: [...DISALLOW] },
];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();
  return {
    rules: AI_AND_DEFAULT_RULES,
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
