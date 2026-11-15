# Tamil Selvan — Portfolio

Personal portfolio of Tamil Selvan, Software Development Engineer / Full Stack Developer.
Built with **React 19**, **Vite** and **Framer Motion**.

## Run it

```bash
npm install
npm run dev      # local development
npm run build    # production build in /dist
```

## Updating the content

All text lives in **`src/data/content.js`** — headline, summary, numbers, experience, HackColab,
toolkit and education. Wrap a phrase in `**double asterisks**` to emphasise it.

- **GitHub repositories** load live from the account in `profile.githubUser`; the list hides itself if GitHub is unreachable.
- **Colours and fonts** are CSS variables at the top of `src/styles.css` (light and dark themes).
- **SEO / share cards** (title, description, structured data) are in `index.html`.

## What's in it

- Editorial serif layout with masked line reveals, self-drawing rules and count-up figures
- Live local time in the hero, rotating "open to roles" seal, scroll progress line
- HackColab case study with an animated two-cursor editor illustration
- Light / dark theme (follows the system, remembers the choice), responsive, respects "reduce motion"
