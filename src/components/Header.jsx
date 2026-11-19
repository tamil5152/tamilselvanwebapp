import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Search, Sun, X } from 'lucide-react'
import { profile } from '../data/content.js'
import { ease, usePalette, useTheme } from './primitives.jsx'

export const pages = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
]

export function ThemeButton() {
  const { theme, toggle } = useTheme()
  return (
    <button className="icon-btn" onClick={toggle} aria-label="Toggle theme">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'grid' }}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default function Header() {
  const { setOpen: openPalette } = usePalette()
  const [menu, setMenu] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setMenu(false), [pathname])

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand">
          {profile.shortName}
        </Link>
        <nav className="nav" aria-label="Main">
          {pages.map((p) => (
            <NavLink key={p.to} to={p.to} end={p.to === '/'} className={({ isActive }) => (isActive ? 'is-active' : '')}>
              {({ isActive }) => (
                <>
                  {p.label}
                  {isActive && <motion.span layoutId="nav-underline" className="nav-underline" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => openPalette(true)} aria-label="Search Command Palette">
            <Search size={15} />
          </button>
          <ThemeButton />
          <button className="icon-btn menu-btn" onClick={() => setMenu((m) => !m)} aria-label="Toggle Mobile Menu" aria-expanded={menu}>
            {menu ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.nav
            className="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            aria-label="Mobile"
          >
            {pages.map((p) => (
              <NavLink key={p.to} to={p.to} end={p.to === '/'} className={({ isActive }) => (isActive ? 'is-active' : '')}>
                {p.label}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
