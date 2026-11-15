// ─────────────────────────────────────────────────────────────
//  ALL of the site's text lives in this one file.
//  Edit the values below — no need to touch any component.
//  Lines marked  ✏️  are placeholders: replace them with your real details.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Tamilselvan',
  githubUser: 'tamil5152', // projects + stats are pulled live from this account
  role: 'Full-Stack Developer', // ✏️
  // Words that rotate in the hero: "I build ___"
  rotating: ['fast web apps', 'smooth interfaces', 'React experiences', 'ideas into products'],
  tagline:
    'I design and build modern, animated, high-performance websites and web apps with React — from the first sketch to the final deploy.', // ✏️
  location: 'Tamil Nadu, India', // ✏️
  available: true, // shows the green "Available for work" badge
  email: 'your.email@example.com', // ✏️
  resumeUrl: '', // ✏️ e.g. './resume.pdf' (put the file in /public) — button hides when empty
  socials: [
    { label: 'GitHub', url: 'https://github.com/tamil5152' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/' }, // ✏️
  ],
}

export const about = {
  // ✏️ Rewrite in your own voice.
  paragraphs: [
    "I'm a developer who cares about the details people feel but rarely notice: a page that loads instantly, a button that responds the moment you touch it, an animation that guides instead of distracts.",
    'I work across the stack — crafting interfaces in React and wiring them to clean, reliable APIs — and I enjoy taking a project all the way from idea to something real people use.',
  ],
  highlights: [
    { title: 'Performance first', text: 'Lean bundles, fast first paint, smooth 60fps motion.' },
    { title: 'Design-minded', text: 'Typography, spacing and colour treated as engineering problems.' },
    { title: 'End to end', text: 'UI, API, database and deployment — the whole journey.' },
  ],
}

// ✏️ Keep only what you actually use.
export const skills = [
  { group: 'Frontend', items: ['React', 'JavaScript (ES2023)', 'TypeScript', 'HTML5', 'CSS3', 'Framer Motion', 'Tailwind CSS', 'Vite'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'Supabase', 'PostgreSQL', 'MongoDB'] },
  { group: 'Tools', items: ['Git & GitHub', 'Figma', 'VS Code', 'Vercel', 'Netlify', 'Postman'] },
]

// ✏️ Replace with your real journey (jobs, internships, education, freelance).
//    Set this to [] to hide the section entirely.
export const journey = [
  {
    period: '2025 — Now',
    title: 'Your current role',
    place: 'Company / Freelance',
    text: 'One or two lines about what you build here and the impact it had.',
  },
  {
    period: '2023 — 2025',
    title: 'Previous role or internship',
    place: 'Company name',
    text: 'What you worked on, the stack you used and one result you are proud of.',
  },
  {
    period: '2019 — 2023',
    title: 'Your degree',
    place: 'College / University',
    text: 'Relevant coursework, projects, clubs or achievements.',
  },
]

// Optional: hand-picked projects shown before the live GitHub ones.
// ✏️ Example:
// { name: 'My App', description: 'What it does.', url: 'https://…', repo: 'https://github.com/…', tags: ['React', 'Supabase'] }
export const featuredProjects = []
