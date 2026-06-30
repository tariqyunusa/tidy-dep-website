# tidy-deps site

Marketing site for [tidy-deps](https://www.npmjs.com/package/tidy-deps), built with Next.js (App Router), TypeScript, and Tailwind CSS v4.

## Develop

npm install
npm run dev

## Build

npm run build
npm run start

## Structure

- src/app/page.tsx — landing page sections (hero, what-it-removes, audit, install)
- src/components/TerminalDemo.tsx — animated terminal that replays a real tidy-deps CLI session
- src/components/InstallTabs.tsx — npm/yarn/pnpm/bun command switcher
- src/app/globals.css — design tokens (color, font)
- Fonts are self-hosted via @fontsource (JetBrains Mono, IBM Plex Sans, IBM Plex Mono) — no external font requests.

## Deploy

Works out of the box on Vercel, or anywhere that runs `next build` / `next start`.
