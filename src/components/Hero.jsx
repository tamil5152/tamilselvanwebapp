import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/content.js'
import { Arrow, ease, Lines } from './ui.jsx'

/** Live local time where Tamil is, so visitors in other time zones know when to reach out. */
function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: profile.timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(now)
  return (
    <p className="clock">
      <i className="live" /> {profile.city} <time>{time}</time> IST
    </p>
  )
}

/** Slowly rotating seal with the roles Tamil is open to. */
function Seal() {
  return (
    <motion.a
      href="#contact"
      className="seal"
      aria-label="Open to full stack, Java backend and AI/ML roles — get in touch"
      initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.4, delay: 1, ease }}
    >
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="seal-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="seal-text">
          <textPath href="#seal-path" textLength="484">
            Open to roles · {profile.badge}
          </textPath>
        </text>
      </svg>
      <Arrow />
    </motion.a>
  )
}

export default function Hero() {
  const [a, b, c] = profile.headline
  const fade = (delay) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease },
  })

  return (
    <section className="hero" id="top">
      <motion.div className="hero-top" {...fade(0.2)}>
        <p>
          {profile.title} <span>/</span> {profile.subtitle}
        </p>
        <Clock />
      </motion.div>

      <div className="hero-headline">
        <Lines as="h1" onLoad delay={0.25} className="display" lines={[a, b, <em key="em">{c}</em>]} />
        <Seal />
      </div>

      <div className="hero-bottom">
        <motion.div className="hero-intro" {...fade(0.9)}>
          <p>
            <span className="hello">Hello, I'm {profile.name}.</span> {profile.summary}
          </p>
          <div className="hero-links">
            <a className="link" href="#work">
              See the work
            </a>
            <a className="link" href={`mailto:${profile.email}`}>
              Email me <Arrow />
            </a>
          </div>
        </motion.div>

        <motion.dl className="facts" {...fade(1.05)}>
          {profile.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
