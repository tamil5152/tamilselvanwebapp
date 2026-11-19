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

- **Photos:** put square images at `public/profile.jpg` (and optionally `public/profile2.jpg`). Missing files are skipped;
  clicking the avatar cycles through the photos and the "TS" monogram.
- **Rotating titles and quotes:** `profile.roles` and `quotes` in `content.js`.
- **View counter:** uses the free CountAPI service with the key in `profile.viewsKey` (set it to `''` to hide the counter).
- **Résumé:** `public/TamilSelvan_Resume.pdf` is what the Resume links open. Replace it to update.
- **GitHub repos and contribution graph** load live in the visitor's browser; both fall back to a GitHub link if unavailable.

## Structure

- Pages: `/` (home), `/projects` (with search + live repo list), `/experience`, `/contact` (with message form)
- Centred column with dashed rails and hatched section bands, sticky Index on wide screens
- ⌘K / Ctrl+K command palette for pages, projects and actions
- Light / dark theme (follows the system, remembers the choice), responsive, respects "reduce motion"
- Small touches: rotating role under the name, chromatic name edge, CRT scanlines on the avatar, live view counter,
  rotating quotes, hover underlines, and a pixel cat that chases the mouse

## Credits

The cursor cat is a React port of [oneko.js](https://github.com/adryd325/oneko.js) by adryd325 (MIT), including its sprite sheet `public/oneko.gif`.
