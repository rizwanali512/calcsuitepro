export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'CalcSuite Pro',
  url: (() => {
    const raw = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
    try {
      const u = new URL(raw);

      // Keep local/dev URLs untouched.
      if (u.hostname === 'localhost' || u.hostname === '127.0.0.1') return u.toString().replace(/\/$/, '');

      // Canonicalize: force https and strip "www."
      u.protocol = 'https:';
      if (u.hostname.startsWith('www.')) u.hostname = u.hostname.slice(4);

      return u.toString().replace(/\/$/, '');
    } catch {
      // Fallback: best-effort normalization for non-URL strings.
      return raw.replace(/^http:\/\//, 'https://').replace(/^https:\/\/www\./, 'https://');
    }
  })(),
};

