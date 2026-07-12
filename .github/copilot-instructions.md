# A11Code — Copilot Instructions

A11Code is an accessibility-first static website for STEM education for visually impaired students. Built with Next.js (App Router, static export) and deployed to Azure Static Web Apps.

> Note: `README.md` is stale Create React App boilerplate and does not describe this project. This is a **Next.js** app — ignore the README's `npm test` / `npm run eject` instructions.

## Commands

- **Dev server:** `npm run dev` (http://localhost:3000)
- **Build (static export to `out/`):** `npm run build`
- **Start production server:** `npm start`

There is **no test runner and no linter configured** in `package.json`. Do not invent `npm test`/`npm run lint`; validate changes by running `npm run build` (catches build/export errors) and manually exercising the dev server.

## Architecture

- **Framework:** Next.js 14, App Router, static export via `output: 'export'` in `next.config.js` (`images.unoptimized: true`). Everything must be statically generatable — no server-side runtime, API routes, or ISR.
- **Language:** JavaScript / JSX only (no TypeScript).
- **Styling:** CSS Modules per component (e.g. `Header.module.css`); global base styles, CSS custom properties (design tokens), and utility classes (`.container`, `.card`, `.grid-3`, `.btn`, `.page-hero`, `.page-content`) live in `app/globals.css`.
- **No external UI libraries** — semantic HTML + CSS only.

### Layout & data flow
- `app/layout.js` is the root layout: injects the skip-nav link, `<Header />`, `<main id="main-content">`, and `<Footer />`. Page files render only the page body inside these landmarks.
- Content lives as plain JS arrays in `data/` (`courses.js`, `blogs.js`, `resources.js`, `games.js`). Pages and components import directly from `data/` — there is no CMS, database, or fetch layer.

### Directories
- `app/` — pages: Home, `courses/`, `blogs/`, `resources/`, `games/`, `contact/`
- `components/` — shared components (`Header`, `Footer`, `CourseDetail`) each with a co-located `.module.css`
- `data/` — content source of truth
- `out/` — build output (deployed artifact; do not edit by hand)

### Dynamic routes (static export pattern)
- `app/courses/[courseId]/`, `app/blogs/[blogId]/`, `app/games/[gameId]/`, and `app/resources/[resourceId]/` are Server Components that export `generateStaticParams()` (mapping over the matching `data/` array by `id`) and `generateMetadata()`, then render the content — delegating to a `'use client'` component where interactivity is needed (e.g. `CourseDetail.js`, `components/games/*`).
- When adding a course/blog/game/resource: add an entry (with a unique `id`) to the relevant `data/` file. `generateStaticParams`, nav dropdowns, and landing lists derive from that array automatically — no route file changes needed, except games, which map `id` → component in `app/games/[gameId]/page.js`.
- **Games** are real, playable client components in `components/games/` (keyboard-operable, `aria-live` status; Audio Memory synthesizes tones with the Web Audio API — no binary assets).
- **Resources** render as on-site readable pages from the structured `sections` array in `data/resources.js` (deliberately no downloads/PDFs — an accessibility choice).

### Theming (dark mode)
- Dark mode is driven by `[data-theme='dark']` on `<html>`. `components/ThemeToggle.js` flips it and persists to `localStorage`; a pre-paint script in `app/layout.js` `<head>` applies the stored (or `prefers-color-scheme`) theme before hydration to avoid a flash (`<html suppressHydrationWarning>`).
- All colors come from CSS custom properties in `app/globals.css` that flip per theme — **use the tokens (`var(--color-*)`), never hardcoded hex** in new styles, so both themes stay correct and AA-contrast.

## Conventions

- **Accessibility is the core requirement, not an add-on.** Every page/component must:
  - Preserve the skip-nav link and semantic landmarks (`nav`, `main`, `aside`, `article`, `section`).
  - Keep a correct heading hierarchy (h1 → h2 → h3, no skipped levels).
  - Label interactive elements with ARIA (`aria-label`, `aria-expanded`, `aria-controls`, `aria-current`, `aria-haspopup`, `role="list"`, `aria-hidden` on decorative icons) — see `components/Header.js` for the reference pattern (dropdown with keyboard `Escape` handling and click-outside).
  - **Never remove focus outlines.** `:focus-visible` styles in `globals.css` are load-bearing.
  - Support full keyboard navigation.
- Interactive components are marked `'use client'`; static pages stay Server Components.
- Use the `next/link` `Link` component for internal navigation and `usePathname()` for active-state (`aria-current="page"`).
- Icons/symbols are written as Unicode escapes in JSX (e.g. `'\u25BC'`) and marked `aria-hidden="true"`.

## Deployment

- CI/CD: `.github/workflows/azure-static-web-apps-kind-smoke-085d6d41e.yml`.
- Push to `master` auto-deploys to Azure Static Web Apps; PRs to `master` get preview deployments (closed PRs tear them down).
- `app_location: "/"`, `output_location: "out"`.
- `staticwebapp.config.json` configures Azure auth providers (AAD/GitHub/Google/Facebook/Twitter) via named app settings — do not hardcode client secrets there.
