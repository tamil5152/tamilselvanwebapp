import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Generative banner: a dot field with travelling waves that brightens around the pointer.
 * Drawn on canvas so it stays crisp at any width; renders a single still frame for reduced motion.
 */
export default function Banner() {
  const canvas = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = canvas.current
    const ctx = el.getContext('2d')
    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const pointer = { x: -999, y: -999 }
    const gap = 11

    const resize = () => {
      const r = el.getBoundingClientRect()
      w = r.width
      h = r.height
      el.width = w * dpr
      el.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      const time = t / 1000
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          // two interfering waves + a slow drift
          const v =
            Math.sin(x * 0.018 + time * 0.9) * Math.cos(y * 0.05 - time * 0.6) +
            Math.sin((x + y) * 0.012 - time * 0.5)
          const n = (v + 2) / 4 // 0..1
          const d = Math.hypot(x - pointer.x, y - pointer.y)
          const glow = Math.max(0, 1 - d / 120)
          const r = 0.6 + n * 1.6 + glow * 1.6
          // warm accent on wave crests, cool dots elsewhere
          const crest = n > 0.72
          const a = 0.18 + n * 0.55 + glow * 0.4
          ctx.fillStyle = crest || glow > 0.35 ? `rgba(255,140,90,${a})` : `rgba(180,200,255,${a * 0.8})`
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const loop = (t) => {
      draw(t)
      raf = requestAnimationFrame(loop)
    }
    const move = (e) => {
      const r = el.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      if (reduce) draw(4000)
    }
    const leave = () => {
      pointer.x = pointer.y = -999
      if (reduce) draw(4000)
    }

    resize()
    const ro = new ResizeObserver(() => {
      resize()
      if (reduce) draw(4000)
    })
    ro.observe(el)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    if (reduce) draw(4000)
    else raf = requestAnimationFrame(loop)

    // pause when off screen to save battery
    const io = new IntersectionObserver(([entry]) => {
      if (reduce) return
      cancelAnimationFrame(raf)
      if (entry.isIntersecting) raf = requestAnimationFrame(loop)
    })
    io.observe(el)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [reduce])

  return (
    <div className="banner">
      <canvas ref={canvas} aria-hidden="true" />
      <p className="banner-caption">
        <span>~/hosur</span> $ building production web platforms<i className="caret" />
      </p>
    </div>
  )
}
