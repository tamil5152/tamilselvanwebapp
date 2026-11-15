import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { profile } from '../data/content.js'
import { Arrow, CountUp, Magnetic } from './ui.jsx'

const ease = [0.22, 1, 0.36, 1]

function Rotating({ words }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2400)
    return () => clearInterval(id)
  }, [words.length])
  return (
    <span className="rotating">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ y: '70%', opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-70%', opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/** Sizes the name so it always spans the available width, whatever its length or font. */
function useFitText(maxPx = 190) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => {
      el.style.fontSize = '100px'
      const size = Math.min(maxPx, (100 * el.clientWidth) / el.scrollWidth)
      el.style.fontSize = `${Math.floor(size * 0.985)}px`
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el.parentElement)
    document.fonts?.ready.then(fit)
    return () => ro.disconnect()
  }, [maxPx])
  return ref
}

export default function Hero({ stats }) {
  const ref = useRef(null)
  const nameRef = useFitText()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const letters = profile.name.toUpperCase().split('')

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero-inner" style={{ y, opacity: fade }}>
        {profile.available && (
          <motion.p
            className="badge"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease }}
          >
            <i className="pulse" /> Available for work
          </motion.p>
        )}

        <h1 className="hero-name" ref={nameRef} aria-label={profile.name}>
          {letters.map((ch, i) => (
            <span className="clip" key={i} aria-hidden="true">
              <motion.span
                initial={{ y: '110%', rotate: 8 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ delay: 0.35 + i * 0.045, duration: 0.9, ease }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="hero-row"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease }}
        >
          <div>
            <p className="hero-role">
              {profile.role} <span className="sep">/</span> {profile.location}
            </p>
            <p className="hero-build">
              I build <Rotating words={profile.rotating} />
            </p>
          </div>
          <p className="hero-tag">{profile.tagline}</p>
        </motion.div>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8, ease }}
        >
          <Magnetic>
            <a className="btn btn-primary" href="#projects">
              View my work <Arrow />
            </a>
          </Magnetic>
          <Magnetic>
            <a className="btn" href="#contact">
              Let's talk
            </a>
          </Magnetic>
          {profile.resumeUrl && (
            <Magnetic>
              <a className="btn" href={profile.resumeUrl} target="_blank" rel="noreferrer">
                Résumé
              </a>
            </Magnetic>
          )}

          {stats && (
            <dl className="stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>
                    <CountUp to={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        aria-label="Scroll to about"
      >
        <span />
        Scroll
      </motion.a>
    </section>
  )
}
