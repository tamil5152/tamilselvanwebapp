import { useState } from 'react'
import { motion } from 'framer-motion'
import { about, featuredProjects, journey, profile, skills } from '../data/content.js'
import { Arrow, Magnetic, Reveal, SectionHead, TiltCard } from './ui.jsx'

const ease = [0.22, 1, 0.36, 1]

/* ───────────── Marquee ───────────── */
export function Marquee() {
  const items = skills.flatMap((s) => s.items)
  const row = (hidden) => (
    <ul aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item}>
          {item} <i>✦</i>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee" aria-label="Technologies I work with">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}

/* ───────────── About ───────────── */
export function About() {
  return (
    <section className="section" id="about">
      <SectionHead index="01" label="About" title="A developer with a designer's eye." />
      <div className="about-grid">
        <div className="about-text">
          {about.paragraphs.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 0.1}>
              {p}
            </Reveal>
          ))}
        </div>
        <div className="about-cards">
          {about.highlights.map((h, i) => (
            <Reveal key={h.title} delay={0.1 + i * 0.1}>
              <TiltCard className="card highlight">
                <span className="card-num">0{i + 1}</span>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────── Skills ───────────── */
export function Skills() {
  return (
    <section className="section" id="skills">
      <SectionHead index="02" label="Skills" title="The tools I reach for." />
      <div className="skills-grid">
        {skills.map((s, gi) => (
          <Reveal key={s.group} delay={gi * 0.1}>
            <div className="card skill-card">
              <h3>{s.group}</h3>
              <motion.ul
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
              >
                {s.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, y: 10 },
                      show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease } },
                    }}
                    whileHover={{ y: -3 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ───────────── Projects ───────────── */
const langColor = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#663399',
  Python: '#3572a5',
  Java: '#b07219',
  Dart: '#00b4ab',
  'C++': '#f34b7d',
  Go: '#00add8',
}

function ProjectCard({ p, i }) {
  return (
    <Reveal delay={(i % 3) * 0.08}>
      <TiltCard className="card project">
        <div className="project-top">
          <span className="card-num">{String(i + 1).padStart(2, '0')}</span>
          <a href={p.url || p.repo} target="_blank" rel="noreferrer" aria-label={`Open ${p.name}`}>
            <Arrow />
          </a>
        </div>
        <h3>{p.name}</h3>
        <p>{p.description || 'No description yet — open the repository to explore the code.'}</p>
        <div className="project-meta">
          {p.tags?.map((t) => (
            <span className="tag" key={t}>
              {langColor[t] && <i style={{ background: langColor[t] }} />}
              {t}
            </span>
          ))}
          {p.stars > 0 && <span className="tag">★ {p.stars}</span>}
          {p.repo && p.url && p.repo !== p.url && (
            <a className="tag tag-link" href={p.repo} target="_blank" rel="noreferrer">
              Source
            </a>
          )}
        </div>
      </TiltCard>
    </Reveal>
  )
}

export function Projects({ repos, status }) {
  const [showAll, setShowAll] = useState(false)
  const all = [...featuredProjects, ...repos]
  const visible = showAll ? all : all.slice(0, 6)
  const github = `https://github.com/${profile.githubUser}`

  return (
    <section className="section" id="projects">
      <SectionHead index="03" label="Projects" title="Things I've built." />

      {status === 'loading' && all.length === 0 && (
        <div className="projects-grid" aria-busy="true">
          {[0, 1, 2].map((n) => (
            <div className="card project skeleton" key={n} />
          ))}
        </div>
      )}

      {visible.length > 0 && (
        <div className="projects-grid">
          {visible.map((p, i) => (
            <ProjectCard p={p} i={i} key={p.name} />
          ))}
        </div>
      )}

      {status !== 'loading' && all.length === 0 && (
        <Reveal className="card empty">
          <p>
            {status === 'error'
              ? "Couldn't load projects from GitHub right now."
              : 'Projects are on their way.'}{' '}
            You can browse everything on my GitHub profile.
          </p>
        </Reveal>
      )}

      <Reveal className="projects-more">
        {all.length > 6 && (
          <button className="btn" onClick={() => setShowAll((s) => !s)}>
            {showAll ? 'Show fewer' : `Show all ${all.length}`}
          </button>
        )}
        <Magnetic>
          <a className="btn" href={github} target="_blank" rel="noreferrer">
            More on GitHub <Arrow />
          </a>
        </Magnetic>
      </Reveal>
    </section>
  )
}

/* ───────────── Journey ───────────── */
export function Journey() {
  if (!journey.length) return null
  return (
    <section className="section" id="journey">
      <SectionHead index="04" label="Journey" title="Where I've been." />
      <ol className="timeline">
        {journey.map((j, i) => (
          <Reveal as="li" key={j.title + j.period} delay={i * 0.08}>
            <span className="period">{j.period}</span>
            <div>
              <h3>
                {j.title} <span>· {j.place}</span>
              </h3>
              <p>{j.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

/* ───────────── Contact ───────────── */
export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }
  return (
    <section className="section contact" id="contact">
      <Reveal className="eyebrow">
        <span>05</span> Contact
      </Reveal>
      <motion.h2
        className="contact-title"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
      >
        {["Let's build", 'something', 'great.'].map((line, i) => (
          <span className="clip" key={line}>
            <motion.span
              variants={{ hidden: { y: '105%' }, show: { y: 0 } }}
              transition={{ duration: 0.9, delay: i * 0.1, ease }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.h2>
      <Reveal className="contact-actions" delay={0.2}>
        <Magnetic>
          <a className="btn btn-primary btn-lg" href={`mailto:${profile.email}`}>
            {profile.email} <Arrow />
          </a>
        </Magnetic>
        <button className="btn btn-lg" onClick={copy} aria-live="polite">
          {copied ? 'Copied ✓' : 'Copy email'}
        </button>
      </Reveal>
      <Reveal as="ul" className="socials" delay={0.3}>
        {profile.socials.map((s) => (
          <li key={s.label}>
            <a href={s.url} target="_blank" rel="noreferrer">
              {s.label} <Arrow />
            </a>
          </li>
        ))}
      </Reveal>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with React & Framer Motion.
      </p>
      <a href="#top">Back to top ↑</a>
    </footer>
  )
}
