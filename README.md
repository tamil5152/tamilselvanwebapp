# Tamilselvan — Portfolio

Animated personal portfolio built with **React 19**, **Vite** and **Framer Motion**.

## Run it

```bash
npm install
npm run dev      # local development
npm run build    # production build in /dist
```

## Make it yours

All text lives in **`src/data/content.js`** — name, role, bio, skills, journey, email and social links.
Lines marked ✏️ are placeholders to replace.

- **Projects** load live from the GitHub account in `profile.githubUser`. Add a description, topics and a
  "Website" link to a repo on GitHub and the card picks them up. Hand-picked projects go in `featuredProjects`.
- **Colours** are CSS variables at the top of `src/styles.css` (dark and light themes).
- **SEO / share cards** (title, description, structured data) are in `index.html`.

## Features

- Letter-by-letter hero reveal, rotating headline, scroll parallax
- Animated gradient background, pointer-following glow, 3D tilt cards, magnetic buttons
- Scroll progress bar, active-section nav pill, skills marquee, scroll-triggered reveals
- Dark / light theme (remembered), fully responsive, respects "reduce motion"
