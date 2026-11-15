import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { hackcolab, profile } from '../data/content.js'
import { Arrow, Lines, Reveal, rich } from './ui.jsx'

// A small illustration of what HackColab does: two people typing into the same file at once.
const script = [
  { who: 0, text: '// room: pair-session' },
  { who: 0, text: 'const doc = new CRDT.Text()' },
  { who: 1, text: "socket.on('op', (op) => {" },
  { who: 1, text: '  doc.apply(op)   // merge, no conflicts' },
  { who: 1, text: '  render(doc)' },
  { who: 1, text: '})' },
  { who: 0, text: 'run(doc.toString())   // → Docker sandbox' },
]
const people = ['Tamil', 'Guest']
const total = (who) => script.filter((l) => l.who === who).reduce((n, l) => n + l.text.length, 0)
const done = [total(0), total(1)]

function Editor() {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-80px' })
  const reduce = useReducedMotion()
  // how many characters each person has typed so far
  const [typed, setTyped] = useState([0, 0])
  const finished = typed[0] >= done[0] && typed[1] >= done[1]

  useEffect(() => {
    if (reduce) {
      setTyped(done)
      return
    }
    if (!inView) return
    if (finished) {
      const id = setTimeout(() => setTyped([0, 0]), 4200)
      return () => clearTimeout(id)
    }
    const id = setTimeout(
      () => setTyped(([x, y]) => [Math.min(done[0], x + 1), Math.min(done[1], y + (x > 14 ? 1 : 0))]),
      46,
    )
    return () => clearTimeout(id)
  }, [typed, inView, finished, reduce])

  // Work out how much of each line is visible, and which line each person's cursor is on.
  const budget = [...typed]
  const takes = script.map((line) => {
    const take = Math.min(budget[line.who], line.text.length)
    budget[line.who] -= take
    return take
  })
  const caretLine = [0, 1].map((who) => {
    if (finished || typed[who] === 0) return -1
    const current = script.findIndex((l, i) => l.who === who && takes[i] < l.text.length)
    return current === -1 ? script.findLastIndex((l) => l.who === who) : current
  })

  return (
    <figure className="editor" ref={ref}>
      <div className="editor-bar">
        <span>session.ts</span>
        <span className="editor-people">
          <i className="p0" /> {people[0]}
          <i className="p1" /> {people[1]}
        </span>
      </div>
      <ol className="editor-code">
        {script.map((line, i) => {
          const shown = line.text.slice(0, takes[i])
          const [code, comment] = shown.split(/(?=\/\/)/)
          const active = caretLine[line.who] === i
          const startsComment = shown.startsWith('//')
          return (
            <li key={i}>
              <span>
                {startsComment ? <span className="cm">{shown}</span> : code}
                {!startsComment && comment && <span className="cm">{comment}</span>}
                {active && (
                  <span className={`caret p${line.who}`}>
                    <b>{people[line.who]}</b>
                  </span>
                )}
              </span>
            </li>
          )
        })}
      </ol>
      <div className="editor-status">
        <span>
          <i className="live" /> 2 collaborators · CRDT synced
        </span>
        <span className={finished ? 'is-done' : ''}>{finished ? '✓ ran in Docker sandbox' : 'typing…'}</span>
      </div>
      <figcaption>Illustration of a shared session — two cursors, one document.</figcaption>
    </figure>
  )
}

export default function HackColab({ repoUrl }) {
  return (
    <article className="feature">
      <div className="feature-head">
        <Reveal className="label">
          <span>★</span>
          {hackcolab.award}
        </Reveal>
        <Lines as="h3" className="feature-title" lines={[hackcolab.name]} />
        <Reveal as="p" className="feature-tag" delay={0.1}>
          {hackcolab.tagline}
        </Reveal>
      </div>

      <div className="feature-body">
        <Reveal delay={0.1}>
          <Editor />
        </Reveal>

        <div>
          <ul className="feature-points">
            {hackcolab.points.map((p, i) => (
              <Reveal as="li" key={i} delay={i * 0.06}>
                <span>0{i + 1}</span>
                <p>{rich(p)}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal as="p" className="stack" delay={0.2}>
            {hackcolab.stack.join(' · ')}
          </Reveal>
          <Reveal delay={0.25}>
            <a className="link" href={repoUrl || profile.links.github} target="_blank" rel="noreferrer">
              {repoUrl ? 'View the repository' : 'Find it on GitHub'} <Arrow />
            </a>
          </Reveal>
        </div>
      </div>

      <dl className="feature-stats">
        {hackcolab.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07}>
            <dd>{s.value}</dd>
            <dt>{s.label}</dt>
          </Reveal>
        ))}
      </dl>
    </article>
  )
}
