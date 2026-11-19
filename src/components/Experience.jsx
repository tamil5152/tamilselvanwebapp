import { experience } from '../data/content.js'
import { BlurFade, Section, Tag } from './primitives.jsx'

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      {experience.map((job) => (
        <article className="job" id={job.id} key={job.id}>
          <BlurFade className="job-head">
            <h3>
              {job.role} <span className="sep">·</span> <span className="job-company">{job.company}</span>
            </h3>
            <span className="mono-soft">{job.period}</span>
          </BlurFade>
          <BlurFade as="p" className="job-summary" delay={0.05}>
            {job.summary}
          </BlurFade>
          <BlurFade className="stats" delay={0.1}>
            {job.stats.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </BlurFade>
          <ul className="job-points">
            {job.points.map((p, i) => (
              <BlurFade as="li" key={p} delay={0.05 + i * 0.04}>
                {p}
              </BlurFade>
            ))}
          </ul>
          <BlurFade className="tags" delay={0.1}>
            <span className="mono-soft job-place">{job.place}</span>
            {job.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </BlurFade>
        </article>
      ))}
    </Section>
  )
}
