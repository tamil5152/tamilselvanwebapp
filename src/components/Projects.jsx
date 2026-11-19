import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Lock, Search, Star } from 'lucide-react'
import { profile, projects } from '../data/content.js'
import { GithubIcon } from './icons.jsx'
import { BlurFade, ease, Section, Tabs, Tag } from './primitives.jsx'

/* ───────── Illustrated previews (drawn in CSS, one per project kind) ───────── */
function Preview({ kind }) {
  if (kind === 'editor')
    return (
      <div className="mock mock-dark">
        <div className="mock-bar">
          <i />
          <i />
          <i />
          <span>session.ts — HackColab</span>
        </div>
        <div className="mock-editor">
          <div className="mock-tree">
            {['src', 'room.ts', 'crdt.ts', 'sandbox', 'ai.ts'].map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
          <pre>
            <span className="c">// shared doc, two cursors</span>
            {'\n'}
            <span className="k">const</span> doc = <span className="k">new</span> CRDT.Text()
            {'\n'}socket.on(<span className="s">'op'</span>, op =&gt; {'{'}
            <b className="cur a">Tamil</b>
            {'\n'}  doc.apply(op)
            {'\n'}  render(doc)<b className="cur b">Guest</b>
            {'\n'}
            {'}'})
            {'\n'}run(doc) <span className="c">// → docker</span>
          </pre>
        </div>
      </div>
    )
  if (kind === 'dashboard')
    return (
      <div className="mock">
        <div className="mock-bar light">
          <i />
          <i />
          <i />
          <span>lms / student / dashboard</span>
        </div>
        <div className="mock-dash">
          <aside>
            <b />
            {['Courses', 'Progress', 'Uploads', 'Admin'].map((x, i) => (
              <span key={x} className={i === 0 ? 'on' : ''}>
                {x}
              </span>
            ))}
          </aside>
          <div>
            <p className="mock-h">My courses</p>
            {[78, 46, 92].map((v, i) => (
              <div className="mock-course" key={v}>
                <span>{['Data Structures', 'Spring Boot', 'SQL Basics'][i]}</span>
                <div>
                  <i style={{ width: `${v}%` }} />
                </div>
                <em>{v}%</em>
              </div>
            ))}
            <div className="mock-roles">
              <span>student</span>
              <span>instructor</span>
              <span>admin</span>
            </div>
          </div>
        </div>
      </div>
    )
  if (kind === 'api')
    return (
      <div className="mock mock-dark">
        <div className="mock-bar">
          <i />
          <i />
          <i />
          <span>zsh — api</span>
        </div>
        <pre className="mock-term">
          <span className="s">$</span> curl /api/v1/students?class=10
          {'\n'}
          <span className="c">← 200 OK · cache: </span>
          <span className="k">HIT (redis)</span>
          {'\n'}
          <span className="c">← response time </span>
          <span className="s">−60%</span>
          <span className="c"> after query tuning</span>
          {'\n\n'}
          <span className="s">$</span> npm test
          {'\n'}
          <span className="k">✓</span> all suites passed · coverage <span className="s">85%</span>
        </pre>
      </div>
    )
  return (
    <div className="mock">
      <div className="mock-bar light">
        <i />
        <i />
        <i />
        <span>belvo.website</span>
      </div>
      <div className="mock-site">
        <div className="mock-nav">
          <b>belvo</b>
          <span />
          <span />
          <span />
        </div>
        <p className="mock-hero">
          Education management,
          <br />
          for 100+ clients.
        </p>
        <div className="mock-cta">
          <span />
          <span />
        </div>
        <div className="mock-cards">
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  )
}

const badgeText = { featured: 'Featured', production: 'In production', award: null }

function ProjectCard({ p, repoUrl }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.article
      layout
      id={p.id}
      className="project"
      initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease }}
    >
      <div className="project-preview">
        <div className="badges">
          {p.badges.map((b) =>
            b === 'award' ? (
              <span key={b} className="badge badge-award">
                <Star size={10} /> {p.award}
              </span>
            ) : (
              <span key={b} className={`badge badge-${b}`}>
                {b === 'production' && <i className="live-dot" />}
                {badgeText[b]}
              </span>
            ),
          )}
        </div>
        <Preview kind={p.kind} />
      </div>
      <div className="project-head">
        <h3>{p.name}</h3>
        <span className="mono-soft">{p.year}</span>
      </div>
      {p.org && <p className="project-org">{p.org}</p>}
      <p className="project-desc">{p.description}</p>

      <button className="details-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? 'Hide' : 'Show'} engineering details
        <ChevronDown size={12} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            className="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            {p.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="project-foot">
        <div className="tags">
          {p.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div className="project-links">
          {repoUrl ? (
            <a href={repoUrl} target="_blank" rel="noreferrer" aria-label={`${p.name} repository`}>
              <GithubIcon size={16} />
            </a>
          ) : p.private ? (
            <span className="private" title={p.private}>
              <Lock size={13} />
              <span className="sr-only">{p.private}</span>
            </span>
          ) : (
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <GithubIcon size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

const filters = ['All', 'Frontend', 'Backend', 'Fullstack']

/** Project grid. `full` adds the search box and the live repository list (used on /projects). */
export function Projects({ repos = [], full = false }) {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  const list = projects.filter(
    (p) =>
      (filter === 'All' || p.category === filter) &&
      (!q || [p.name, p.description, p.org, ...p.tags].join(' ').toLowerCase().includes(q)),
  )
  const repoFor = (p) => p.repoMatch && repos.find((r) => p.repoMatch.test(r.name))?.url

  const others = useMemo(
    () =>
      repos.filter(
        (r) =>
          !projects.some((p) => p.repoMatch?.test(r.name)) &&
          (!q || [r.name, r.description, r.language].join(' ').toLowerCase().includes(q)),
      ),
    [repos, q],
  )

  return (
    <Section id="projects" title="Projects" aside={<Tabs id="projects" items={filters} value={filter} onChange={setFilter} />}>
      {full && (
        <div className="search-row">
          <Search size={14} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, technologies..."
            aria-label="Search projects"
          />
        </div>
      )}
      <div className="pad">
        <motion.div layout className="project-grid">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <ProjectCard key={p.id} p={p} repoUrl={repoFor(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="empty">No projects match “{query || filter}”.</p>}
      </div>

      {full && others.length > 0 && (
        <div className="repo-list">
          <div className="repo-head">
            <p className="mono-label">More on GitHub · live</p>
            <a href={profile.github} target="_blank" rel="noreferrer" className="mono-soft link-soft">
              @{profile.githubUser} <ArrowUpRight size={11} />
            </a>
          </div>
          <ul>
            {others.map((r, i) => (
              <BlurFade as="li" key={r.name} delay={(i % 8) * 0.03}>
                <a href={r.url} target="_blank" rel="noreferrer">
                  <span className="repo-name">{r.name}</span>
                  <span className="repo-desc">{r.description || 'No description'}</span>
                  <span className="mono-soft">{[r.language, r.year].filter(Boolean).join(' · ')}</span>
                  <ArrowUpRight size={13} />
                </a>
              </BlurFade>
            ))}
          </ul>
        </div>
      )}
    </Section>
  )
}
