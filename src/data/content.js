// ─────────────────────────────────────────────────────────────
//  Everything the site says lives in this file — taken from the résumé.
//  Edit here to update the site; components never need to change.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Tamil Selvan',
  shortName: 'Tamil',
  initials: 'TS',
  role: 'Software Development Engineer',
  location: 'Hosur, India',
  timeZone: 'Asia/Kolkata',
  email: 'tamil515253@gmail.com',
  githubUser: 'tamil5152',
  github: 'https://github.com/tamil5152',
  linkedin: 'https://www.linkedin.com/in/tamil--selvan/',
  resume: '/TamilSelvan_Resume.pdf',
  // Drop a square photo at public/profile.jpg and it replaces the monogram automatically.
  avatar: '/profile.jpg',
  openTo: 'full stack, Java backend and AI/ML roles',
}

export const about = {
  points: [
    "Hey, I'm Tamil — a Software Development Engineer who builds production web platforms end to end with React, Next.js, Node.js and Spring Boot.",
    'Right now I own an LMS portal at CARATSTONE Solutions, from the database schema and row-level security to the dashboards 100–200 people use every day.',
    "Before that I spent a year at BELVO shipping REST APIs, tuning MongoDB and Redis, and rebuilding the company website. I'm studying Computer Science (AI/ML) and graduate in 2027.",
  ],
  snapshot: ['Shipping to real users.', 'Backend that holds up.', 'Tested before merged.', 'Learning AI/ML in depth.'],
}

// Cards in the Projects section. `kind` picks the illustrated preview.
export const projects = [
  {
    id: 'hackcolab',
    name: 'HackColab',
    year: 'Hackathon',
    category: 'Fullstack',
    kind: 'editor',
    badges: ['award', 'featured'],
    award: 'Top 5 · Sinthanai',
    description:
      'A real-time pair-programming workspace: shared editing over WebSockets with CRDT conflict resolution, sandboxed code execution in Docker, and AI coding help inside the editor.',
    details: [
      'WebSockets with protocol-buffered schemas and CRDT conflict resolution — sync lag and payload size each cut by 40%, at 50 ms latency for 50+ concurrent users.',
      'User code runs in Docker containers behind async queues with CI/CD — 35% less blocking, 30% faster deploys, tasks 45% faster.',
      'REST and WebSocket APIs secured with JWT and Google OAuth, powering multi-workspace flows for 100+ active users.',
      'Claude API integrated for in-editor AI coding; finished Top 5 at the Sinthanai National Hackathon for system design.',
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'WebSocket', 'Spring Boot', 'Docker', 'MongoDB', 'JWT / OAuth'],
    repoMatch: /hack.?col+ab/i, // linked automatically if a matching public repo exists
  },
  {
    id: 'lms',
    name: 'LMS Portal',
    year: '2026',
    category: 'Fullstack',
    kind: 'dashboard',
    badges: ['production'],
    org: 'CARATSTONE Solutions',
    description:
      'A role-based learning management system for students, instructors and admins — courses, lessons, enrollments and progress in one place, serving 100–200 active users.',
    details: [
      'Owned end to end in Next.js, React and Supabase, from database design to deployment.',
      'Supabase (PostgreSQL) schema for courses, lessons, enrollments and progress, with Row Level Security enforcing access at the database layer.',
      'Role-based access with Supabase Auth gating dashboards and content per role.',
      'Course creation and upload workflows on Supabase Storage; student dashboards that track courses and progress in one view.',
    ],
    tags: ['Next.js', 'React', 'Supabase', 'PostgreSQL', 'RLS', 'Supabase Auth'],
    private: 'Client work — code is private',
  },
  {
    id: 'belvo-api',
    name: 'Education SaaS APIs',
    year: '2025',
    category: 'Backend',
    kind: 'api',
    badges: [],
    org: 'BELVO',
    description:
      '15+ REST APIs for an education-management SaaS with 100+ clients, plus the caching and query work that made them fast.',
    details: [
      'Node.js / Express.js endpoints backed by Jest and Supertest suites at 85% coverage — error rates down 30%, regression bugs down 40%.',
      'Optimized MongoDB schemas and aggregation pipelines — query response times down 60%.',
      'Redis caching on high-traffic endpoints — API latency down 35–50%.',
    ],
    tags: ['Node.js', 'Express.js', 'MongoDB', 'Redis', 'Jest', 'Supertest'],
    private: 'Company work — code is private',
  },
  {
    id: 'belvo-web',
    name: 'Belvo Website',
    year: '2025',
    category: 'Frontend',
    kind: 'website',
    badges: [],
    org: 'BELVO',
    description:
      'Rebuilt the company portfolio site in React and TypeScript from Figma designs, with a data-fetching layer that kept the UI stable through backend migrations.',
    details: [
      'Page-load speed up 45%, and a 30% rise in client acquisition after launch.',
      'Frontend data-fetching abstraction layer that cut integration rework by 25% during backend migrations.',
    ],
    tags: ['React', 'TypeScript', 'Figma'],
    private: 'Company work',
  },
]

export const experience = [
  {
    id: 'caratstone',
    role: 'Software Development Engineer',
    company: 'CARATSTONE Solutions',
    period: 'Sep 2026 — Present',
    place: 'Remote',
    summary:
      'Building and running the company LMS — one course-delivery platform for learners and staff, owned from database design to deployment.',
    stats: [
      { value: '100–200', label: 'Active users' },
      { value: '3', label: 'User roles' },
      { value: 'RLS', label: 'Access at DB layer' },
      { value: 'E2E', label: 'Schema to deploy' },
    ],
    points: [
      'Built an end-to-end LMS portal in Next.js, React and Supabase, serving 100–200 active users.',
      'Designed the PostgreSQL schema for courses, lessons, enrollments and progress with Row Level Security.',
      'Implemented role-based access with Supabase Auth for students, instructors and admins.',
      'Built course-creation and upload workflows on Supabase Storage and Next.js student dashboards.',
    ],
    tags: ['Next.js', 'React', 'Supabase', 'PostgreSQL'],
  },
  {
    id: 'belvo',
    role: 'Full Stack Developer Intern',
    company: 'BELVO',
    period: 'Jun 2025 — Sep 2026',
    place: 'Remote',
    summary:
      'Backend and frontend work on an education-management SaaS serving 100+ clients — APIs, performance, testing and the company website.',
    stats: [
      { value: '15+', label: 'REST APIs built' },
      { value: '85%', label: 'Test coverage' },
      { value: '−60%', label: 'Query time' },
      { value: '+45%', label: 'Page-load speed' },
    ],
    points: [
      'Developed 15+ REST APIs in Node.js / Express.js with Jest / Supertest suites — error rates down 30%, regression bugs down 40%.',
      'Optimized MongoDB schemas and aggregation pipelines and added Redis caching — query times down 60%, API latency down 35–50%.',
      'Rebuilt the Belvo website in React / TypeScript from Figma — page-load speed up 45%, client acquisition up 30%.',
      'Architected a frontend data-fetching abstraction layer, cutting integration rework by 25%.',
    ],
    tags: ['Node.js', 'Express.js', 'MongoDB', 'Redis', 'React', 'TypeScript'],
  },
]

export const education = [
  {
    period: '2023 — 2027',
    title: 'B.E. Computer Science (AIML)',
    place: 'Paavai College of Engineering, Namakkal',
    detail: 'CGPA 8.0 / 10',
  },
  {
    period: '2021 — 2023',
    title: '12th Standard',
    place: 'Government Higher Secondary School, Hosur',
    detail: '71%',
  },
]

export const achievements = [
  {
    title: 'Top 5 — Sinthanai National Hackathon',
    detail: 'HackColab, recognised for system design.',
  },
]

export const stack = {
  Languages: ['Java', 'JavaScript', 'TypeScript', 'Python', 'C', 'C++', 'SQL', 'GraphQL', 'HTML', 'CSS'],
  Frontend: ['React', 'Next.js', 'Tailwind CSS', 'Bootstrap'],
  Backend: ['Spring Boot', 'Node.js', 'Express.js', 'REST APIs', 'ORM', 'Pandas'],
  Databases: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Firebase'],
  'DevOps & Tools': ['Docker', 'AWS', 'Zoho Catalyst', 'CI/CD', 'Git', 'Postman', 'IntelliJ'],
}

export const quote = { text: 'Talk is cheap. Show me the code.', by: 'Linus Torvalds' }
