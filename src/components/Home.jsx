import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Eye, FileText, Mail, MapPin, RefreshCw, Search, Trophy } from 'lucide-react'
import { about, achievements, education, profile, quotes, stack } from '../data/content.js'
import Banner from './Banner.jsx'
import { GithubIcon, LinkedinIcon } from './icons.jsx'
import { BlurFade, ease, Section, Spacer, Tabs, usePalette } from './primitives.jsx'

/* ───────── Hero ───────── */
/** Photos that actually exist (missing files drop out), with the monogram always last. */
function Avatar() {
  const [broken, setBroken] = useState([])
  const [index, setIndex] = useState(0)
  // Probe every photo up front so missing ones never take a click.
  useEffect(() => {
    profile.avatars.forEach((src) => {
      const img = new Image()
      img.onerror = () => setBroken((b) => (b.includes(src) ? b : [...b, src]))
      img.src = src
    })
  }, [])
  const options = [...profile.avatars.filter((src) => !broken.includes(src)), 'monogram']
  const current = options[index % options.length]
  const next = () => setIndex((i) => (i + 1) % options.length)
  return (
    <div
      className="avatar"
      onClick={options.length > 1 ? next : undefined}
      title={options.length > 1 ? 'Click to change profile image' : undefined}
      style={{ cursor: options.length > 1 ? 'pointer' : 'default' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          className="avatar-inner"
          initial={{ opacity: 0, scale: 1.08, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
        >
          {current === 'monogram' ? (
            <span className="avatar-mono">{profile.initials}</span>
          ) : (
            <img
              src={current}
              alt={profile.name}
              onError={() => setBroken((b) => (b.includes(current) ? b : [...b, current]))}
            />
          )}
        </motion.div>
      </AnimatePresence>
      {/* CRT scanlines + a slow scan bar */}
      <span className="scanlines" aria-hidden="true">
        <span />
      </span>
      {options.length > 1 && (
        <button
          className="avatar-switch"
          onClick={(e) => {
            e.stopPropagation()
            next()
          }}
          aria-label="Switch profile image"
        >
          <RefreshCw size={10} strokeWidth={2} />
        </button>
      )}
    </div>
  )
}

/** Title under the name that slides to the next role every 3.2 s. */
function RotatingRole() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 3200)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="role-slot" aria-live="off">
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          className="profile-role"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {profile.roles[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

/**
 * Live visitor count from a free counter API. It counts once per browser session
 * and stays hidden if the service is unreachable — no made-up numbers.
 */
function useViews(key) {
  const [views, setViews] = useState(null)
  useEffect(() => {
    if (!key) return
    let seen = false
    try {
      seen = sessionStorage.getItem('visited') === '1'
      sessionStorage.setItem('visited', '1')
    } catch {
      /* storage blocked: just read */
      seen = true
    }
    const ctrl = new AbortController()
    fetch(`https://countapi.mileshilliard.com/api/v1/${seen ? 'get' : 'hit'}/${key}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => typeof d.value === 'number' && setViews(d.value))
      .catch(() => {})
    return () => ctrl.abort()
  }, [key])
  return views
}

export function Hero() {
  const { setOpen } = usePalette()
  const views = useViews(profile.viewsKey)
  return (
    <div className="hero">
      <motion.div initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease }}>
        <Banner />
      </motion.div>
      <div className="profile">
        <BlurFade delay={0.15}>
          <Avatar />
        </BlurFade>
        <div className="profile-text">
          <BlurFade as="h1" delay={0.2} className="profile-name text-glitch">
            {profile.name}
          </BlurFade>
          <BlurFade delay={0.25}>
            <RotatingRole />
          </BlurFade>
          <BlurFade as="p" delay={0.3} className="profile-meta">
            <span className="meta-item">
              <MapPin size={12} /> {profile.location}
            </span>
            <span className="sep">·</span>
            <span className="meta-item">
              <i className="live-dot ping" /> Open to roles
            </span>
            {views !== null && (
              <>
                <span className="sep">·</span>
                <span className="meta-item">
                  <Eye size={12} /> {views.toLocaleString()} views
                </span>
              </>
            )}
          </BlurFade>
        </div>
        <BlurFade delay={0.35} className="profile-actions">
          <button className="kbd-btn" onClick={() => setOpen(true)} aria-label="Open command palette">
            <Search size={13} /> <kbd>⌘K</kbd>
          </button>
        </BlurFade>
      </div>
    </div>
  )
}

/* ───────── About ───────── */
export function About() {
  return (
    <Section id="about" title="About">
      <div className="pad">
        <ul className="about-list">
          {about.points.map((p, i) => (
            <BlurFade as="li" key={i} delay={i * 0.06}>
              {p}
            </BlurFade>
          ))}
        </ul>
        <BlurFade className="snapshot">
          <p className="mono-label">Developer snapshot</p>
          <ul>
            {about.snapshot.map((s) => (
              <li key={s}>
                <i className="live-dot" />
                {s}
              </li>
            ))}
          </ul>
        </BlurFade>
      </div>
    </Section>
  )
}

/* ───────── Contact strip ───────── */
export const contactLinks = [
  { label: 'GitHub', href: profile.github, icon: <GithubIcon size={15} /> },
  { label: 'LinkedIn', href: profile.linkedin, icon: <LinkedinIcon size={15} /> },
  { label: 'Mail', href: `mailto:${profile.email}`, icon: <Mail size={15} /> },
  { label: 'Resume', href: profile.resume, icon: <FileText size={15} /> },
]

export function ContactStrip() {
  return (
    <div className="contact-strip">
      {contactLinks.map((c, i) => (
        <BlurFade key={c.label} delay={i * 0.05}>
          <a href={c.href} target={c.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer">
            <span className="contact-icon">{c.icon}</span>
            {c.label}
            <ArrowUpRight size={13} className="up" />
          </a>
        </BlurFade>
      ))}
    </div>
  )
}

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <ContactStrip />
    </Section>
  )
}

/* ───────── Education & achievements ───────── */
export function Education() {
  return (
    <Section id="education" title="Education">
      <ul className="rows">
        {education.map((e, i) => (
          <BlurFade as="li" key={e.title} delay={i * 0.05} className="row">
            <span className="row-date">{e.period}</span>
            <div>
              <h3 className="row-title">{e.title}</h3>
              <p className="row-text">
                {e.place} · <span className="mono-soft">{e.detail}</span>
              </p>
            </div>
          </BlurFade>
        ))}
        {achievements.map((a) => (
          <BlurFade as="li" key={a.title} className="row">
            <span className="row-date">
              <Trophy size={12} /> Award
            </span>
            <div>
              <h3 className="row-title">{a.title}</h3>
              <p className="row-text">{a.detail}</p>
            </div>
          </BlurFade>
        ))}
      </ul>
    </Section>
  )
}

/* ───────── Tech stack ───────── */
export function TechStack() {
  const groups = Object.keys(stack)
  const [tab, setTab] = useState('All')
  const items = tab === 'All' ? [...new Set(Object.values(stack).flat())] : stack[tab]
  return (
    <Section id="skills" title="Tech Stack" aside={<span className="mono-soft">( select tab to filter )</span>}>
      <div className="pad">
        <Tabs id="stack" items={['All', ...groups]} value={tab} onChange={setTab} />
        <motion.ul layout className="chips">
          {items.map((s, i) => (
            <motion.li
              layout
              key={s}
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.3, delay: i * 0.015 }}
            >
              {s}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  )
}

/* ───────── Outro: CTA + quote ───────── */
export function Outro() {
  return (
    <>
      <Section title="Scrolled Too Far">
        <div className="pad center">
          <BlurFade as="p" className="outro-text">
            If you've read this far, you might be interested in working together. I'm open to {profile.openTo}.
          </BlurFade>
          <BlurFade delay={0.1}>
            <Link to="/contact" className="btn-dark">
              Let's Talk <ArrowRight size={14} />
            </Link>
          </BlurFade>
        </div>
      </Section>
      <Spacer />
      <RotatingQuote />
    </>
  )
}

/** Quote that changes every 6 s. */
function RotatingQuote() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % quotes.length), 6000)
    return () => clearInterval(id)
  }, [])
  return (
    <figure className="quote">
      <span aria-hidden="true">“</span>
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
          transition={{ duration: 0.5, ease }}
        >
          <blockquote>{quotes[i].text}</blockquote>
          <figcaption>— {quotes[i].by}</figcaption>
        </motion.div>
      </AnimatePresence>
    </figure>
  )
}
