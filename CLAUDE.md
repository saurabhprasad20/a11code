# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A11Code — an accessibility-first static website for STEM education for visually impaired students. Built with Next.js and deployed to Azure Static Web Apps.

## Commands

- **Dev server:** `npm run dev` (port 3000)
- **Build:** `npm run build` (static export to `/out`)
- **Start production server:** `npm start`

## Architecture

- **Framework:** Next.js 14 with App Router, static export (`output: 'export'` in `next.config.js`)
- **Language:** JavaScript (JSX)
- **Styling:** CSS Modules for components, `app/globals.css` for base styles and utilities
- **No external UI libraries** — semantic HTML + CSS only

### Key Directories
- `app/` — Next.js pages (Home, Courses, Blogs, Resources, Games, Contact)
- `components/` — Shared components (Header, Footer, CourseDetail)
- `data/` — Content data files (courses.js, blogs.js, resources.js, games.js)
- `public/` — Static assets (favicon)

### Dynamic Routes
- `app/courses/[courseId]/` — Course detail pages, uses `generateStaticParams` with client `CourseDetail` component
- `app/blogs/[blogId]/` — Blog detail pages, uses `generateStaticParams`

### Accessibility
This site is built for visually impaired users. All pages must:
- Include skip navigation link (in root layout)
- Use semantic HTML landmarks (nav, main, aside, article, section)
- Maintain proper heading hierarchy (h1 → h2 → h3, no skips)
- Label all interactive elements with ARIA attributes
- Support full keyboard navigation
- Never remove focus outlines

## Deployment

- CI/CD via GitHub Actions (`.github/workflows/azure-static-web-apps-kind-smoke-085d6d41e.yml`)
- Pushes to `master` auto-deploy to Azure Static Web Apps
- PRs to `master` trigger preview deployments
- Static output directory: `out/`
- Azure config in `staticwebapp.config.json`
