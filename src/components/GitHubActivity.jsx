import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '../data/content.js'
import { GithubIcon } from './icons.jsx'
import { BlurFade, Section } from './primitives.jsx'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Last year of public GitHub contributions, fetched live in the visitor's browser. */
function useContributions(user) {
  const [state, setState] = useState({ status: 'loading' })
  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => setState({ status: 'ready', days: d.contributions, total: d.total?.lastYear ?? 0 }))
      .catch((e) => e.name !== 'AbortError' && setState({ status: 'error' }))
    return () => ctrl.abort()
  }, [user])
  return state
}

function Graph({ days, total }) {
  // Group days into week columns, starting on Sunday.
  const { weeks, months } = useMemo(() => {
    const weeks = []
    const pad = new Date(days[0].date).getDay()
    let week = Array(pad).fill(null)
    days.forEach((d) => {
      week.push(d)
      if (week.length === 7) {
        weeks.push(week)
        week = []
      }
    })
    if (week.length) weeks.push(week)
    const months = []
    weeks.forEach((w, i) => {
      const first = w.find(Boolean)
      if (!first) return
      const m = new Date(first.date).getMonth()
      if (!months.length || months[months.length - 1].m !== m) months.push({ m, i })
    })
    // drop a leading partial month label if it would collide with the next one
    return { weeks, months: months.filter((x, i) => !(i === 0 && months[1] && months[1].i - x.i < 3)) }
  }, [days])

  const C = 10 // cell size
  const G = 3 // gap
  const top = 16 // room for month labels
  const width = weeks.length * (C + G) - G
  const height = top + 7 * (C + G) - G
  return (
    <div className="graph-wrap">
      <svg className="graph" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${total} contributions in the last year`}>
        {months.map(({ m, i }) => (
          <text key={`${m}-${i}`} x={i * (C + G)} y={10} className="graph-month">
            {MONTHS[m]}
          </text>
        ))}
        {weeks.map((w, wi) =>
          w.map((d, di) =>
            d ? (
              <rect
                key={d.date}
                x={wi * (C + G)}
                y={top + di * (C + G)}
                width={C}
                height={C}
                rx={2}
                className={`lv${d.level}`}
              >
                <title>{`${d.count} contribution${d.count === 1 ? '' : 's'} on ${d.date}`}</title>
              </rect>
            ) : null,
          ),
        )}
      </svg>
      <div className="graph-foot">
        <span>
          {total.toLocaleString()} contributions in the last year
        </span>
        <span className="legend">
          Less <i className="lv0" />
          <i className="lv1" />
          <i className="lv2" />
          <i className="lv3" />
          <i className="lv4" /> More
        </span>
      </div>
    </div>
  )
}

export default function GitHubActivity() {
  const data = useContributions(profile.githubUser)
  return (
    <Section
      id="github"
      title="GitHub Activity"
      aside={
        <a href={profile.github} target="_blank" rel="noreferrer" className="mono-soft link-soft">
          @{profile.githubUser} <ArrowUpRight size={11} />
        </a>
      }
    >
      <BlurFade className="pad">
        {data.status === 'ready' && <Graph days={data.days} total={data.total} />}
        {data.status === 'loading' && <div className="graph-skeleton" aria-busy="true" />}
        {data.status === 'error' && (
          <a className="graph-fallback" href={profile.github} target="_blank" rel="noreferrer">
            <GithubIcon size={18} /> See my activity on GitHub <ArrowUpRight size={13} />
          </a>
        )}
      </BlurFade>
    </Section>
  )
}
