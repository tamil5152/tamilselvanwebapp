import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, FileText, Mail, MapPin, Search, Trophy } from 'lucide-react'
import { about, achievements, education, profile, quote, stack } from '../data/content.js'
import Banner from './Banner.jsx'
import { GithubIcon, LinkedinIcon } from './icons.jsx'
import { BlurFade, ease, Section, Spacer, Tabs, usePalette } from './primitives.jsx'

/* ───────── Hero ───────── */
function Avatar() {
  const [failed, setFailed] = useState(false)
  return (
    <div className="avatar">
      {failed ? (
        <span className="avatar-mono">{profile.initials}</span>
      ) : (
        <img src={profile.avatar} alt={profile.name} onError={() => setFailed(true)} />
      )}
    </div>
  )
}

export function Hero() {
  const { setOpen } = usePalette()
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
          <BlurFade as="h1" delay={0.2} className="profile-name">
            {profile.name}
          </BlurFade>
          <BlurFade as="p" delay={0.25} className="profile-role">
            {profile.role}
          </BlurFade>
          <BlurFade as="p" delay={0.3} className="profile-meta">
            <MapPin size={12} /> {profile.location}
            <span className="sep">·</span>
            <span className="open">
              <i className="live-dot" /> Open to roles
            </span>
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
      <figure className="quote">
        <span aria-hidden="true">“</span>
        <BlurFade as="blockquote">{quote.text}</BlurFade>
        <figcaption>— {quote.by}</figcaption>
      </figure>
    </>
  )
}
