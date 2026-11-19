import { createContext, useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

/* ───────── Theme ───────── */
const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage blocked — the theme still applies for this visit */
    }
  }, [theme])
  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}
export const useTheme = () => useContext(ThemeContext)

/* ───────── Palette open state (shared by header, hero button and keyboard shortcut) ───────── */
const PaletteContext = createContext(null)
export function PaletteProvider({ children }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  return <PaletteContext.Provider value={{ open, setOpen }}>{children}</PaletteContext.Provider>
}
export const usePalette = () => useContext(PaletteContext)

/* ───────── Live clock in Tamil's time zone ───────── */
export function useClock(timeZone, opts = { hour: '2-digit', minute: '2-digit', second: '2-digit' }) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return new Intl.DateTimeFormat('en-US', { timeZone, ...opts }).format(now)
}

/* ───────── Motion ───────── */
/** Blur + fade + lift into view, once. */
export function BlurFade({ children, delay = 0, className, as = 'div', ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ───────── Layout pieces ───────── */
/** Full-bleed section header: hatched outside the column, plain inside, dots on the rails. */
export function SectionHead({ title, aside, as: Tag = 'h2' }) {
  return (
    <div className="sec-head">
      <i className="dot tl" />
      <i className="dot tr" />
      <i className="dot bl" />
      <i className="dot br" />
      <Tag className="sec-title">{title}</Tag>
      {aside && <div className="sec-aside">{aside}</div>}
    </div>
  )
}

export function Section({ id, title, aside, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`} aria-label={typeof title === 'string' ? title : undefined}>
      <SectionHead title={title} aside={aside} />
      {children}
    </section>
  )
}

/** Thin hatched spacer band between blocks. */
export const Spacer = () => <div className="spacer" aria-hidden="true" />

export function Tag({ children }) {
  return <span className="tag">{children}</span>
}

/** Segmented tab control with a sliding pill. */
export function Tabs({ items, value, onChange, id }) {
  return (
    <div className="tabs" role="tablist">
      {items.map((item) => (
        <button
          key={item}
          role="tab"
          aria-selected={value === item}
          className={value === item ? 'is-active' : ''}
          onClick={() => onChange(item)}
        >
          {value === item && (
            <motion.span layoutId={`tab-${id}`} className="tab-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
          )}
          <span>{item}</span>
        </button>
      ))}
    </div>
  )
}
