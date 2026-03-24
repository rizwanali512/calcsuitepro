# CalcSuite Pro

**CalcSuite Pro** is a calculator and formula SaaS platform built with **Next.js App Router** and **Tailwind CSS v4**.

The app includes 100+ calculators across finance, math, physics, and health, plus SEO-focused content pages, blogs, category hubs, and subcategory hubs. All tools run in the browser with a shared dynamic calculator architecture.

## Key Features

- **Dynamic calculator system:** Single reusable calculator template driven by `src/lib/calculators.ts` and `src/lib/calculatorEngine.ts`.
- **Finance subcategories:** Mortgage, auto, investment, retirement, tax, loans, and general finance pages.
- **SEO-first architecture:** Dynamic metadata, canonical URLs, OpenGraph, breadcrumbs JSON-LD, sitemap, robots, and internal linking.
- **Content at scale:** Programmatic SEO pages and static blog posts with calculator linking.
- **Modern UX:** Dark mode, command menu (`Cmd/Ctrl + K`) calculator search, skeleton loaders, subtle page transitions, and responsive UI.
- **Design system:** Brand color tokens, gradient accents, and glassmorphism-inspired card styling.

## Getting Started

We use npm as the package manager.

> To use Yarn or another package manager, remove `package-lock.json` and run the commands below with your chosen manager.

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables**

   Copy `.env.example` to `.env.local` and set your variables (for example `NEXT_PUBLIC_SITE_URL`, analytics keys, and any optional AI provider keys).

3. **Development server**

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

   Other commands:

   ```bash
   npm run build   # Production build
   npm run start   # Start production server
   npm run lint    # Run ESLint
   ```

## Tech Stack

- [Next.js](https://nextjs.org) App Router – routing, metadata, React Server Components
- [Tailwind CSS](https://tailwindcss.com) v4 – utility-first styling
- [framer-motion](https://www.framer.com/motion/) – lightweight page transitions
- [next-themes](https://github.com/pacocoursey/next-themes) – dark/light theme support

## License

MIT © 2026 CalcSuite Pro
