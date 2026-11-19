import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { profile } from '../data/content.js'
import CommandPalette from './CommandPalette.jsx'
import Header from './Header.jsx'
import { useClock } from './primitives.jsx'

/** Scroll to the top on page change, or to #section when the URL carries one. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }
    let tries = 0
    const tick = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else if (tries++ < 20) setTimeout(tick, 50)
    }
    tick()
  }, [pathname, hash])
  return null
}

const indexItems = [
  ['about', 'About'],
  ['contact', 'Contact'],
  ['projects', 'Projects'],
  ['experience', 'Experience'],
  ['education', 'Education'],
  ['skills', 'Skills'],
  ['github', 'GitHub'],
]

/** Sticky table of contents beside the column on wide screens (home page only). */
function IndexRail() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' },
    )
    indexItems.forEach(([id]) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return (
    <nav className="index-rail" aria-label="On this page">
      <p>Index</p>
      {indexItems.map(([id, label]) => (
        <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''}>
          {label}
        </a>
      ))}
    </nav>
  )
}

function Footer() {
  const time = useClock(profile.timeZone)
  return (
    <footer className="footer">
      <p>
        Designed &amp; Developed by <strong>{profile.name}</strong>
      </p>
      <p className="mono-soft">© {new Date().getFullYear()} All rights reserved.</p>
      <p className="mono-soft">
        <i className="live-dot" /> {profile.location} · {time}
      </p>
    </footer>
  )
}

export default function Layout({ children }) {
  const { pathname } = useLocation()
  return (
    <>
      <ScrollManager />
      <Header />
      <div className="frame">
        <main>{children}</main>
        <div className="spacer" aria-hidden="true" />
        <Footer />
      </div>
      {pathname === '/' && <IndexRail />}
      <CommandPalette />
    </>
  )
}
