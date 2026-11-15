// ─────────────────────────────────────────────────────────────
//  Everything the site says lives here — taken from the résumé.
//  Edit this file to update the site; no component changes needed.
//  Wrap a phrase in **double asterisks** to emphasise it.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Tamil Selvan',
  title: 'Software Development Engineer',
  subtitle: 'Full Stack Developer',
  location: 'Hosur, Tamil Nadu, India',
  city: 'Hosur, IN',
  timeZone: 'Asia/Kolkata',
  email: 'tamil515253@gmail.com',
  githubUser: 'tamil5152',
  links: {
    github: 'https://github.com/tamil5152',
    linkedin: 'https://www.linkedin.com/in/tamil--selvan/',
  },
  headline: ['I build production', 'web platforms,', 'end to end.'], // last line is set in italic accent
  summary:
    'Software Development Engineer working across React, Next.js, Node.js and Spring Boot. Currently shipping a role-based LMS used by 100–200 people at CARATSTONE Solutions; before that, 15+ REST APIs and 60% faster queries at BELVO.',
  facts: [
    { label: 'Now', value: 'SDE at CARATSTONE Solutions' },
    { label: 'Studying', value: 'B.E. Computer Science (AIML), class of 2027' },
    { label: 'Open to', value: 'Full stack, Java backend and AI/ML roles' },
  ],
  badge: 'Full stack · Java backend · AI / ML · ',
}

export const numbers = [
  { value: 60, suffix: '%', label: 'faster query response', source: 'MongoDB tuning + Redis caching at BELVO' },
  { value: 15, suffix: '+', label: 'REST APIs shipped', source: 'Node.js / Express for a SaaS with 100+ clients' },
  { value: 85, suffix: '%', label: 'test coverage', source: 'Jest and Supertest suites' },
  { prefix: '100–', value: 200, label: 'active users', source: 'LMS portal built at CARATSTONE' },
]

export const experience = [
  {
    company: 'CARATSTONE Solutions',
    role: 'Software Development Engineer',
    period: 'Sep 2026 — Present',
    place: 'Remote',
    stack: ['Next.js', 'React', 'Supabase', 'PostgreSQL'],
    points: [
      'Built an end-to-end **LMS portal** in Next.js, React and Supabase — owned from database design to deployment, serving **100–200 active users**.',
      'Designed the Supabase (PostgreSQL) schema for courses, lessons, enrollments and progress with **Row Level Security**, enforcing access at the database layer.',
      'Implemented **role-based access** with Supabase Auth, gating dashboards and content for students, instructors and admins.',
      'Built course-creation and upload workflows on Supabase Storage, plus Next.js student dashboards that track courses and progress in one view.',
    ],
  },
  {
    company: 'BELVO',
    role: 'Full Stack Developer Intern',
    period: 'Jun 2025 — Sep 2026',
    place: 'Remote',
    stack: ['Node.js', 'Express', 'MongoDB', 'Redis', 'React', 'TypeScript'],
    points: [
      'Developed **15+ REST APIs** in Node.js / Express.js for an education-management SaaS serving 100+ clients, backed by Jest / Supertest suites at **85% coverage** — error rates down 30%, regression bugs down 40%.',
      'Optimized MongoDB schemas and aggregation pipelines and added a Redis caching layer on high-traffic endpoints — **query response times down 60%**, API latency down 35–50%.',
      'Rebuilt the Belvo portfolio website in React / TypeScript from Figma designs — page-load speed **up 45%**, client acquisition up 30%.',
      'Architected a frontend data-fetching abstraction layer that kept the UI stable through backend migrations, cutting integration rework by 25%.',
    ],
  },
]

export const hackcolab = {
  name: 'HackColab',
  award: 'Top 5 — Sinthanai National Hackathon',
  tagline: 'A real-time pair-programming workspace with AI built into the editor.',
  repoMatch: /hack.?col+ab/i, // used to find the repository in the live GitHub list
  stats: [
    { value: '50ms', label: 'sync latency' },
    { value: '50+', label: 'concurrent users' },
    { value: '−40%', label: 'payload size' },
    { value: '100+', label: 'active users' },
  ],
  points: [
    'Real-time collaboration over **WebSockets** with protocol-buffered schemas and **CRDT conflict resolution** — sync lag and payload size each cut by 40%.',
    'User code runs in **Docker** containers behind async queues with CI/CD — 35% less blocking, 30% faster deploys, tasks 45% faster.',
    'REST and WebSocket APIs secured with **JWT and Google OAuth**, powering multi-workspace flows.',
    'In-editor AI coding through the **Claude API**.',
  ],
  stack: ['React', 'TypeScript', 'Node.js', 'WebSocket', 'Spring Boot', 'Docker', 'MongoDB', 'JWT / OAuth'],
}

export const toolkit = [
  { label: 'Languages', items: ['Java', 'JavaScript', 'TypeScript', 'Python', 'C', 'C++', 'SQL', 'GraphQL', 'HTML', 'CSS'] },
  { label: 'Frameworks', items: ['React', 'Next.js', 'Spring Boot', 'Node.js', 'Express.js', 'Tailwind', 'Bootstrap', 'Pandas', 'REST APIs'] },
  { label: 'Platforms', items: ['Supabase', 'Firebase', 'Zoho Catalyst', 'AWS', 'Docker', 'Redis', 'MongoDB', 'PostgreSQL', 'Postman'] },
  { label: 'Practices', items: ['CI/CD', 'Design Patterns', 'MVC', 'Conventional Commits'] },
]

export const education = [
  { school: 'Paavai College of Engineering', detail: 'B.E. Computer Science (AIML) · CGPA 8.0 / 10', place: 'Namakkal, Tamil Nadu', period: '2023 — 2027' },
  { school: 'Government Higher Secondary School', detail: '12th Standard · 71%', place: 'Hosur, Tamil Nadu', period: '2021 — 2023' },
]
