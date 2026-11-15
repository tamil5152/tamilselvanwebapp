import { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

/** Fades + slides children in the first time they scroll into view. */
export function Reveal({ children, delay = 0, y = 28, className, as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </Tag>
  )
}

/** Numbered section heading with a title that wipes up into view. */
export function SectionHead({ index, label, title }) {
  return (
    <header className="section-head">
      <Reveal className="eyebrow">
        <span>{index}</span> {label}
      </Reveal>
      {/* The observer sits on the h2 (never clipped), and the inner span animates via variants */}
      <motion.h2
        className="section-title"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
      >
        <span className="clip">
          <motion.span
            variants={{ hidden: { y: '105%' }, show: { y: 0 } }}
            transition={{ duration: 0.9, ease }}
          >
            {title}
          </motion.span>
        </span>
      </motion.h2>
    </header>
  )
}

/** Element that is gently pulled toward the pointer. */
export function Magnetic({ children, strength = 0.3 }) {
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 })
  const move = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const leave = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.span className="magnetic" style={{ x, y }} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </motion.span>
  )
}

/** Card that tilts in 3D and carries a spotlight that follows the pointer. */
export function TiltCard({ children, className = '', ...rest }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, var(--spot), transparent 65%)`
  const move = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 10)
    rx.set((0.5 - py) * 10)
    mx.set(px * 100)
    my.set(py * 100)
  }
  const leave = () => {
    rx.set(0)
    ry.set(0)
  }
  return (
    <motion.div
      className={`tilt ${className}`}
      style={{ rotateX: rx, rotateY: ry }}
      onPointerMove={move}
      onPointerLeave={leave}
      {...rest}
    >
      <motion.div className="tilt-glow" style={{ background: glow }} aria-hidden="true" />
      {children}
    </motion.div>
  )
}

/** Number that counts up when it enters the viewport. */
export function CountUp({ to }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.6, ease, onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to])
  return <span ref={ref}>{n}</span>
}

/** Soft light that follows the mouse across the whole page (desktop only). */
export function CursorGlow() {
  const x = useSpring(useMotionValue(-600), { stiffness: 90, damping: 20 })
  const y = useSpring(useMotionValue(-600), { stiffness: 90, damping: 20 })
  useEffect(() => {
    const move = (e) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])
  return <motion.div className="cursor-glow" style={{ x, y }} aria-hidden="true" />
}

export const Arrow = () => (
  <svg className="arrow" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
