import type { NextConfig } from "next";

/**
 * Doorway redirects:
 *   - The previous auto-generator produced 4 SEO variants per canonical
 *     calculator (`-online`, `-free`, `-with-formula`, `-2026`). Google flags
 *     these as duplicates. We 301 them to the canonical so any indexed link
 *     equity is preserved.
 *   - A handful of manual programmatic pages also matched a doorway pattern
 *     but mapped to a different canonical (e.g. `speed-calculator-online`
 *     → `/velocity-calculator`); those are listed explicitly first so they
 *     win over the generic regex below.
 *   - We deliberately do NOT redirect the `/free-` prefix because the legit
 *     `/free-calculators` hub page lives on that pattern.
 */
const manualDoorwayRedirects = [
  { source: "/scientific-calculator-online-free", destination: "/scientific-calculator" },
  { source: "/graph-calculator-online-free", destination: "/graph-calculator" },
  { source: "/function-plotter-online", destination: "/graph-calculator" },
  { source: "/free-online-graphing-calculator-no-signup", destination: "/graph-calculator" },
  { source: "/algebra-graph-calculator-online", destination: "/graph-calculator" },
  { source: "/speed-calculator-online", destination: "/velocity-calculator" },
];

const genericDoorwayRedirects = [
  { source: "/:slug([^/]+)-online", destination: "/:slug" },
  { source: "/:slug([^/]+)-free", destination: "/:slug" },
  { source: "/:slug([^/]+)-with-formula", destination: "/:slug" },
  { source: "/:slug([^/]+)-:year(\\d{4})", destination: "/:slug" },
  { source: "/online-:slug([^/]+)", destination: "/:slug" },
];

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      ...manualDoorwayRedirects.map((entry) => ({ ...entry, permanent: true })),
      ...genericDoorwayRedirects.map((entry) => ({ ...entry, permanent: true })),
    ];
  },
};

export default nextConfig;
