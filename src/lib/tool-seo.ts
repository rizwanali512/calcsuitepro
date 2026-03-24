import { calculators as tools } from '@/lib/calculators';
import { getPriorityToolSeoSpec } from '@/lib/priority-tools-seo';

/** High-level SEO cluster (ToolBaz-style grouping). */
export type SeoCluster =
  | 'json'
  | 'regex'
  | 'encoding'
  | 'jwt'
  | 'security'
  | 'text'
  | 'web'
  | 'url'
  | 'datetime'
  | 'color'
  | 'file'
  | 'utilities'
  | 'general';

export type FaqItem = { q: string; a: string };

export type ToolSeoSpec = {
  intro: string;
  steps: string[];
  features: string[];
  useCases: string[];
  example: { input: string; output: string };
  faqs: FaqItem[];
  cluster: SeoCluster;
};

function wordyIntro(
  title: string,
  description: string,
  clusterHint: string
): string {
  return (
    `${title} is a free online developer tool on CalcSuite Pro. ${description} ` +
    `It helps you work faster in the browser without installing software—ideal when you need reliable output for debugging, documentation, or everyday engineering tasks. ` +
    `${clusterHint} ` +
    `Use it as part of a simple workflow: paste or upload your input, run the tool, then copy the result into your editor, ticket, or CI notes. ` +
    `Because it runs client-side where applicable, you get quick feedback and can iterate until the output matches what your stack expects. ` +
    `This page summarizes features, common use cases, and answers to frequent questions so you can decide quickly whether ${title} fits your task.`
  );
}

export function getSeoCluster(category: string, slug: string): SeoCluster {
  if (/jwt/i.test(slug)) return 'jwt';
  if (category === 'json') return 'json';
  if (category === 'encoding') return 'encoding';
  if (category === 'text') {
    if (slug.includes('regex')) return 'regex';
    return 'text';
  }
  if (category === 'security') return 'security';
  if (category === 'web-dev') return 'web';
  if (category === 'url') return 'url';
  if (category === 'datetime') return 'datetime';
  if (category === 'color') return 'color';
  if (category === 'file-converters') return 'file';
  if (category === 'utilities') return 'utilities';
  return 'general';
}

function clusterHint(cluster: SeoCluster): string {
  switch (cluster) {
    case 'json':
      return 'JSON workflows often combine formatting, validation, and conversion—this tool fits into that loop.';
    case 'regex':
      return 'Regular expressions are powerful for validation and extraction; testing patterns early prevents production surprises.';
    case 'encoding':
      return 'Encoding and decoding utilities are essential for APIs, URLs, HTML entities, and transport-safe payloads.';
    case 'jwt':
      return 'JWT inspection helps you debug authentication flows by reading header and payload claims.';
    case 'security':
      return 'Security-oriented utilities help generate identifiers, hashes, and test data safely in development contexts.';
    case 'text':
      return 'Text utilities speed up cleanup, comparison, counting, and transformation tasks.';
    case 'web':
      return 'Web development tools help you minify, beautify, and generate assets and configuration snippets.';
    case 'url':
      return 'URL utilities help parse, encode, and build links for web apps and marketing workflows.';
    case 'datetime':
      return 'Date and time tools reduce mistakes when converting between timestamps, zones, and human-readable formats.';
    case 'color':
      return 'Color tools help you convert values and preview results for CSS and design systems.';
    case 'file':
      return 'Converters help you move data between JSON, YAML, CSV, Markdown, and related formats.';
    case 'utilities':
      return 'Developer utilities provide quick lookups and checks that replace tab-hopping through documentation.';
    default:
      return 'This utility is designed to be straightforward: minimal setup, clear output, and practical defaults.';
  }
}

function defaultSteps(title: string, cluster: SeoCluster): string[] {
  const base = [
    `Open ${title} on this page.`,
    'Paste your input or upload content in the editor area.',
    'Adjust any options the tool exposes (if applicable).',
    'Run the action and review the output in the result panel.',
    'Copy the output and use it in your project, tests, or documentation.',
  ];
  if (cluster === 'json') {
    return [
      `Paste JSON into ${title}.`,
      'Use format, validate, minify, or convert actions depending on what you need.',
      'Fix any reported syntax issues and rerun until the output is valid.',
      'Copy the cleaned JSON for configs, APIs, or examples.',
    ];
  }
  if (cluster === 'regex') {
    return [
      'Enter your regular expression and flags.',
      'Paste sample text that should match (or fail).',
      'Review highlighted matches and captured groups.',
      'Tweak the pattern and iterate until behavior matches your rules.',
    ];
  }
  if (cluster === 'encoding') {
    return [
      'Paste the text or encoded string you need to process.',
      'Choose encode or decode (or run the default action).',
      'Verify the output matches your expected charset and padding rules.',
      'Copy the result into code, URLs, or configs.',
    ];
  }
  if (cluster === 'jwt') {
    return [
      'Paste a JWT (three segments separated by dots).',
      'Inspect the decoded header and payload.',
      'Compare claims like exp, aud, and iss against your auth expectations.',
      'Remember: decoding is not signature verification—validate tokens server-side.',
    ];
  }
  return base;
}

function slugOverride(slug: string, title: string, description: string): ToolSeoSpec | null {
  switch (slug) {
    case 'base64-decoder':
      return {
        cluster: 'encoding',
        intro: wordyIntro(title, description, clusterHint('encoding')),
        steps: defaultSteps(title, 'encoding'),
        features: [
          'Decode Base64 to plain text',
          'Great for inspecting blobs in logs and payloads',
          'Copy decoded output for analysis and debugging',
        ],
        useCases: [
          'Decode a Base64 string to verify its content',
          'Inspect token segments and encoded payload parts',
          'Debug data URL / encoded content issues',
        ],
        example: { input: 'SGVsbG8gV29ybGQ=', output: 'Hello World' },
        faqs: [
          {
            q: 'Why does decoding fail?',
            a: 'Invalid characters, missing padding, or Base64url vs Base64 differences are common causes.',
          },
          {
            q: 'Can this decode binary image data?',
            a: 'For images, try Base64 to Image to preview data URLs.',
          },
          {
            q: 'Is Base64 reversible?',
            a: 'Yes—encoding is designed to be reversible; it is not a security control.',
          },
          {
            q: 'Should I trim whitespace?',
            a: 'Yes—remove newlines and spaces copied from logs or emails.',
          },
        ],
      };
    default:
      return null;
  }
}

function defaultSpec(
  slug: string,
  title: string,
  description: string,
  cluster: SeoCluster
): ToolSeoSpec {
  const hint = clusterHint(cluster);
  return {
    cluster,
    intro: wordyIntro(title, description, hint),
    steps: defaultSteps(title, cluster),
    features: [
      `Fast ${title} results in your browser`,
      'Clear output you can copy into code or docs',
      'Designed as a practical free developer tool',
      'Works well alongside other CalcSuite Pro formatters and validators',
    ],
    useCases: [
      `Use ${title} for day-to-day developer tasks without local setup`,
      'Reduce manual work when preparing data for tests or documentation',
      'Iterate quickly when debugging integrations and payloads',
    ],
    example: {
      input: 'Sample input (paste your real data in the tool)',
      output: 'Processed output appears here after you run the tool',
    },
    faqs: [
      {
        q: `Is ${title} free to use?`,
        a: 'Yes. CalcSuite Pro offers this as a free online developer tool.',
      },
      {
        q: `Does ${title} run in the browser?`,
        a: 'Most tools are built for fast client-side workflows; check the tool UI for specifics.',
      },
      {
        q: `What if the output looks wrong?`,
        a: 'Validate input format, try a smaller sample, and use related validators in the same category.',
      },
      {
        q: `Where can I find related utilities?`,
        a: 'Browse your category page, Popular Tools, and the full tools directory on CalcSuite Pro.',
      },
      {
        q: `Can I use this for production data?`,
        a: 'Follow your organization’s data policy; avoid pasting secrets into any online tool.',
      },
    ],
  };
}

export function buildToolSeoSpec(
  slug: string,
  title: string,
  description: string,
  category: string
): ToolSeoSpec {
  const priority = getPriorityToolSeoSpec(slug, title, description, category);
  if (priority) return priority;

  const cluster = getSeoCluster(category, slug);
  const override = slugOverride(slug, title, description);
  if (override) return override;
  return defaultSpec(slug, title, description, cluster);
}

export function getCategoryPeers(
  slug: string,
  category: string,
  limit = 8
) {
  return tools
    .filter((t) => t.category === category && t.slug !== slug)
    .slice(0, limit);
}
