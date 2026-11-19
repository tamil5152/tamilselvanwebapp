import { useEffect } from 'react'

/*
 * A pixel cat that chases the mouse pointer.
 * React port of oneko.js by adryd325 — https://github.com/adryd325/oneko.js (MIT).
 * The sprite sheet (public/oneko.gif) comes from that project.
 *
 * It idles, gets alerted, runs in 8 directions, scratches walls, and falls asleep;
 * its position is remembered across pages and visits. Disabled for "reduce motion"
 * and on touch-only devices, where there is no pointer to chase.
 */
const SPRITES = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  scratchWallN: [[0, 0], [0, -1]],
  scratchWallS: [[-7, -1], [-6, -2]],
  scratchWallE: [[-2, -2], [-2, -3]],
  scratchWallW: [[-4, 0], [-4, -1]],
  tired: [[-3, -2]],
  sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]],
  NE: [[0, -2], [0, -3]],
  E: [[-3, 0], [-3, -1]],
  SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]],
  SW: [[-5, -3], [-6, -1]],
  W: [[-4, -2], [-4, -3]],
  NW: [[-1, 0], [-1, -1]],
}
const SPEED = 10
const STORE = 'oneko'

export default function Oneko() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const touchOnly = window.matchMedia('(hover: none)').matches
    if (reduce || touchOnly) return

    const s = { x: 32, y: 32, mx: 0, my: 0, frame: 0, idle: 0, anim: null, animFrame: 0, bg: '' }
    try {
      Object.assign(s, JSON.parse(localStorage.getItem(STORE)) || {})
    } catch {
      /* no saved position */
    }

    const el = document.createElement('div')
    el.className = 'oneko'
    el.setAttribute('aria-hidden', 'true')
    el.style.backgroundImage = 'url(/oneko.gif)'
    if (s.bg) el.style.backgroundPosition = s.bg
    document.body.appendChild(el)

    const place = () => {
      el.style.transform = `translate(${s.x - 16}px, ${s.y - 16}px)`
    }
    const sprite = (name, f) => {
      const set = SPRITES[name] || SPRITES.idle
      const [sx, sy] = set[f % set.length]
      s.bg = `${sx * 32}px ${sy * 32}px`
      el.style.backgroundPosition = s.bg
    }
    const resetIdle = () => {
      s.anim = null
      s.animFrame = 0
    }

    const idle = () => {
      s.idle += 1
      // roughly every 20 seconds, pick an idle animation
      if (s.idle > 10 && Math.floor(Math.random() * 200) === 0 && s.anim == null) {
        const options = ['sleeping', 'scratchSelf']
        if (s.x < 32) options.push('scratchWallW')
        if (s.y < 32) options.push('scratchWallN')
        if (s.x > window.innerWidth - 32) options.push('scratchWallE')
        if (s.y > window.innerHeight - 32) options.push('scratchWallS')
        s.anim = options[Math.floor(Math.random() * options.length)]
      }
      switch (s.anim) {
        case 'sleeping':
          if (s.animFrame < 8) {
            sprite('tired', 0)
            break
          }
          sprite('sleeping', Math.floor(s.animFrame / 4))
          if (s.animFrame > 192) resetIdle()
          break
        case 'scratchWallN':
        case 'scratchWallS':
        case 'scratchWallE':
        case 'scratchWallW':
        case 'scratchSelf':
          sprite(s.anim, s.animFrame)
          if (s.animFrame > 9) resetIdle()
          break
        default:
          sprite('idle', 0)
          return
      }
      s.animFrame += 1
    }

    const step = () => {
      s.frame += 1
      const dx = s.x - s.mx
      const dy = s.y - s.my
      const dist = Math.hypot(dx, dy)
      if (dist < SPEED || dist < 48) {
        idle()
        return
      }
      resetIdle()
      if (s.idle > 1) {
        // startled: pause for a moment before running
        sprite('alert', 0)
        s.idle = Math.min(s.idle, 7) - 1
        return
      }
      let dir = dy / dist > 0.5 ? 'N' : ''
      dir += dy / dist < -0.5 ? 'S' : ''
      dir += dx / dist > 0.5 ? 'W' : ''
      dir += dx / dist < -0.5 ? 'E' : ''
      sprite(dir, s.frame)
      s.x = Math.min(Math.max(16, s.x - (dx / dist) * SPEED), window.innerWidth - 16)
      s.y = Math.min(Math.max(16, s.y - (dy / dist) * SPEED), window.innerHeight - 16)
      place()
    }

    let raf = 0
    let last = 0
    const loop = (t) => {
      if (t - last > 100) {
        last = t
        step()
      }
      raf = requestAnimationFrame(loop)
    }
    const move = (e) => {
      s.mx = e.clientX
      s.my = e.clientY
    }
    const save = () => {
      try {
        localStorage.setItem(STORE, JSON.stringify(s))
      } catch {
        /* storage blocked */
      }
    }

    place()
    document.addEventListener('mousemove', move)
    window.addEventListener('beforeunload', save)
    raf = requestAnimationFrame(loop)
    return () => {
      save()
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', move)
      window.removeEventListener('beforeunload', save)
      el.remove()
    }
  }, [])
  return null
}
