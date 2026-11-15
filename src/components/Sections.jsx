import { useState } from 'react'
import { education, experience, hackcolab, numbers, profile, toolkit } from '../data/content.js'
import HackColab from './HackColab.jsx'
import { Arrow, CountUp, Lines, Reveal, rich, Rule, SectionHead } from './ui.jsx'

/* ───────────── Marquee ───────────── */
export function Marquee() {
  const items = [...new Set(experience.flatMap((e) => e.stack).concat(hackcolab.stack))]
  const row = (hidden) => (
    <ul aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
  return (
    <div className="marquee" aria-label="Technologies used in production">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}

/* ───────────── Numbers ───────────── */
export function Numbers() {
  return (
    <section className="section" aria-labelledby="numbers-label">
      <Reveal className="label" id="numbers-label">
        <span>01</span>Results so far
      </Reveal>
      <dl className="numbers">
        {numbers.map((n, i) => (
          <Reveal key={n.label} delay={i * 0.08}>
            <dd>
              <CountUp to={n.value} prefix={n.prefix} suffix={n.suffix} />
            </dd>
            <dt>
              {n.label}
              <small>{n.source}</small>
            </dt>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}

/* ───────────── Experience ───────────── */
export function Experience() {
  return (
    <section className="section" id="experience">
      <SectionHead index="02" label="Experience" title={['Where the work', <em key="e">has shipped.</em>]} />
      {experience.map((job) => (
        <article className="job" key={job.company}>
          <Rule />
          <div className="job-grid">
            <Reveal className="job-side">
              <p className="mono">{job.period}</p>
              <h3>{job.company}</h3>
              <p className="job-role">
                {job.role} · {job.place}
              </p>
              <p className="stack">{job.stack.join(' · ')}</p>
            </Reveal>
            <ol className="job-points">
              {job.points.map((p, i) => (
                <Reveal as="li" key={i} delay={i * 0.06}>
                  <span>0{i + 1}</span>
                  <p>{rich(p)}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </article>
      ))}
    </section>
  )
}

/* ───────────── Work ───────────── */
function RepoList({ repos }) {
  const [all, setAll] = useState(false)
  const list = all ? repos : repos.slice(0, 6)
  return (
    <div className="repos">
      <Reveal className="repos-head">
        <p className="label">
          <span>↳</span>Also on GitHub — live from @{profile.githubUser}
        </p>
      </Reveal>
      <ul>
        {list.map((r, i) => (
          <Reveal as="li" key={r.name} delay={(i % 6) * 0.04}>
            <a href={r.url} target="_blank" rel="noreferrer">
              <span className="repo-name">{r.name}</span>
              <span className="repo-desc">{r.description || '—'}</span>
              <span className="repo-meta">{[r.language, r.year].filter(Boolean).join(' · ')}</span>
              <Arrow />
            </a>
          </Reveal>
        ))}
      </ul>
      {repos.length > 6 && (
        <button className="link" onClick={() => setAll((v) => !v)}>
          {all ? 'Show fewer' : `Show all ${repos.length} repositories`}
        </button>
      )}
    </div>
  )
}

export function Work({ repos }) {
  const hackRepo = repos.find((r) => hackcolab.repoMatch.test(r.name))
  const others = repos.filter((r) => r !== hackRepo)
  return (
    <section className="section" id="work">
      <SectionHead index="03" label="Selected work" title={['Built to be used,', <em key="e">not just demoed.</em>]} />
      <HackColab repoUrl={hackRepo?.url} />
      {others.length > 0 && <RepoList repos={others} />}
    </section>
  )
}

/* ───────────── Toolkit + Education ───────────── */
export function Toolkit() {
  return (
    <section className="section" id="toolkit">
      <SectionHead index="04" label="Toolkit" title={['What I', <em key="e">work with.</em>]} />
      <div className="table">
        {toolkit.map((row) => (
          <div key={row.label}>
            <Rule />
            <Reveal className="table-row">
              <p className="mono">{row.label}</p>
              <p className="serif-list">
                {row.items.map((item, i) => (
                  <span key={item}>
                    {item}
                    {i < row.items.length - 1 && <i>/</i>}
                  </span>
                ))}
              </p>
            </Reveal>
          </div>
        ))}
        <Rule />
      </div>

      <Reveal className="label edu-label">
        <span>05</span>Education
      </Reveal>
      <div className="table">
        {education.map((e) => (
          <div key={e.school}>
            <Rule />
            <Reveal className="table-row edu-row">
              <p className="mono">{e.period}</p>
              <div>
                <h3>{e.school}</h3>
                <p>
                  {e.detail} <span>— {e.place}</span>
                </p>
              </div>
            </Reveal>
          </div>
        ))}
        <Rule />
      </div>
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
    <section className="contact" id="contact">
      <div className="contact-inner">
        <Reveal className="label">
          <span>06</span>Contact
        </Reveal>
        <Lines className="display contact-title" lines={['Have a role', 'or a project?', <em key="e">Let's talk.</em>]} />
        <Reveal className="contact-mail" delay={0.15}>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <button onClick={copy} aria-live="polite">
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
        </Reveal>
        <Reveal as="ul" className="contact-links" delay={0.25}>
          <li>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <Arrow />
            </a>
          </li>
          <li>
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub <Arrow />
            </a>
          </li>
          <li>{profile.location}</li>
        </Reveal>
      </div>
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with React</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  )
}
