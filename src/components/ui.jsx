import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'

export const ease = [0.16, 1, 0.3, 1]

/** Turns "**bold**" markers in content strings into <strong>. */
export function rich(text) {
  return text.split('**').map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))
}

/** Fades + lifts children in the first time they scroll into view. */
export function Reveal({ children, delay = 0, y = 22, className, as = 'div', ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/**
 * Text that rises out from behind a mask, one line at a time.
 * The observer sits on the wrapper (never clipped); lines animate through variants.
 */
export function Lines({ lines, as = 'h2', className, delay = 0, onLoad = false }) {
  const Tag = motion[as]
  const trigger = onLoad
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '-40px' } }
  return (
    <Tag className={className} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span className="mask" key={i}>
          <motion.span
            variants={{ hidden: { y: '112%' }, show: { y: 0 } }}
            transition={{ duration: 1.1, delay: delay + i * 0.09, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Hairline that draws itself from left to right. */
export function Rule({ delay = 0 }) {
  return (
    <motion.hr
      className="rule"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.3, delay, ease }}
    />
  )
}

/** Section label + masked serif title. `title` is an array of lines; <em> gives the italic accent. */
export function SectionHead({ index, label, title }) {
  return (
    <header className="section-head">
      <Reveal className="label">
        <span>{index}</span>
        {label}
      </Reveal>
      <Lines lines={title} className="section-title" />
    </header>
  )
}

/** Number that counts up when it enters the viewport. */
export function CountUp({ to, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.8, ease, onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to])
  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  )
}

export const Arrow = () => (
  <svg className="arrow" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
    <path d="M6 18 18 6M8 6h10v10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
  </svg>
)
