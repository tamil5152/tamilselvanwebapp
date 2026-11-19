# Tamil Selvan — Portfolio

Personal portfolio of Tamil Selvan, Software Development Engineer.
Built with **React 19**, **Vite**, **React Router**, **Framer Motion** and **lucide-react**.

## Run it

```bash
npm install
npm run dev      # local development
npm run build    # production build in /dist
```

## Deploy

Made for **Vercel**: import the repo, keep the defaults (build `npm run build`, output `dist`).
`vercel.json` rewrites every route to `index.html`, so `/projects`, `/experience` and `/contact` work on refresh.
The build also writes `dist/404.html` for static hosts that use it as an SPA fallback.

## Updating the content

All text lives in **`src/data/content.js`** — profile, about, projects, experience, education, tech stack and quote.

- **Photo:** put a square image at `public/profile.jpg`; it replaces the "TS" monogram automatically.
- **Résumé:** `public/TamilSelvan_Resume.pdf` is what the Resume links open. Replace it to update.
- **GitHub repos and contribution graph** load live in the visitor's browser; both fall back to a GitHub link if unavailable.

## Structure

- Pages: `/` (home), `/projects` (with search + live repo list), `/experience`, `/contact` (with message form)
- Centred column with dashed rails and hatched section bands, sticky Index on wide screens
- ⌘K / Ctrl+K command palette for pages, projects and actions
- Light / dark theme (follows the system, remembers the choice), responsive, respects "reduce motion"
