import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Briefcase,
  Compass,
  Copy,
  CornerDownLeft,
  FileText,
  FolderGit2,
  Globe,
  GraduationCap,
  Layers,
  Mail,
  Moon,
  Search,
  Terminal,
} from 'lucide-react'
import { profile, projects } from '../data/content.js'
import { GithubIcon, LinkedinIcon } from './icons.jsx'
import { usePalette, useTheme } from './primitives.jsx'

export default function CommandPalette() {
  const { open, setOpen } = usePalette()
  const { toggle } = useTheme()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const [toast, setToast] = useState('')
  const input = useRef(null)
  const listRef = useRef(null)

  const groups = useMemo(() => {
    const go = (to) => () => navigate(to)
    const ext = (url) => () => window.open(url, '_blank', 'noopener')
    return [
      {
        name: 'Navigation',
        items: [
          { label: 'Go to Home', hint: 'Overview, about and highlights', icon: Compass, run: go('/') },
          { label: 'Go to About', hint: 'Who I am and what I focus on', icon: Terminal, run: go('/#about') },
          { label: 'Go to Projects', hint: 'HackColab, LMS portal and more', icon: Globe, run: go('/projects') },
          { label: 'Go to Experience', hint: 'CARATSTONE Solutions and BELVO', icon: Briefcase, run: go('/experience') },
          { label: 'Go to Education', hint: 'Degree and achievements', icon: GraduationCap, run: go('/#education') },
          { label: 'Go to Tech Stack', hint: 'Languages, frameworks and tools', icon: Layers, run: go('/#skills') },
          { label: 'Go to Contact', hint: 'Email, socials, résumé and message form', icon: Mail, run: go('/contact') },
        ],
      },
      {
        name: 'Projects',
        items: projects.map((p) => ({
          label: p.name,
          hint: p.tags.slice(0, 4).join(' · '),
          icon: FolderGit2,
          run: go(`/projects#${p.id}`),
        })),
      },
      {
        name: 'Actions',
        items: [
          {
            label: 'Copy email address',
            hint: profile.email,
            icon: Copy,
            keep: true,
            run: async () => {
              try {
                await navigator.clipboard.writeText(profile.email)
                setToast('Email copied')
              } catch {
                window.location.href = `mailto:${profile.email}`
              }
            },
          },
          { label: 'Open résumé', hint: 'PDF', icon: FileText, run: ext(profile.resume) },
          { label: 'Toggle theme', hint: 'Light / dark', icon: Moon, run: toggle },
          { label: 'Open GitHub', hint: `@${profile.githubUser}`, icon: () => <GithubIcon size={15} />, run: ext(profile.github) },
          { label: 'Open LinkedIn', hint: 'linkedin.com/in/tamil--selvan', icon: () => <LinkedinIcon size={15} />, run: ext(profile.linkedin) },
        ],
      },
    ]
  }, [navigate, toggle])

  const term = q.trim().toLowerCase()
  const filtered = groups
    .map((g) => ({ ...g, items: g.items.filter((i) => !term || `${i.label} ${i.hint}`.toLowerCase().includes(term)) }))
    .filter((g) => g.items.length)
  const flat = filtered.flatMap((g) => g.items)

  useEffect(() => {
    if (open) {
      setQ('')
      setActive(0)
      setTimeout(() => input.current?.focus(), 30)
    }
  }, [open])
  useEffect(() => setActive(0), [q])
  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active])
  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(''), 1600)
    return () => clearTimeout(id)
  }, [toast])

  const choose = (item) => {
    item.run()
    if (!item.keep) setOpen(false)
  }
  const onKey = (e) => {
    if (e.key === 'Escape') setOpen(false)
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (a + 1) % Math.max(flat.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (a - 1 + flat.length) % Math.max(flat.length, 1))
    } else if (e.key === 'Enter' && flat[active]) {
      e.preventDefault()
      choose(flat[active])
    }
  }

  let index = -1
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -6 }}
            transition={{ duration: 0.18 }}
            onKeyDown={onKey}
          >
            <div className="palette-search">
              <Search size={16} />
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search pages, projects, or actions..."
                aria-label="Search commands"
              />
              <kbd>ESC</kbd>
            </div>
            <div className="palette-list" ref={listRef}>
              {filtered.map((g) => (
                <div key={g.name}>
                  <p className="palette-group">{g.name}</p>
                  {g.items.map((item) => {
                    index += 1
                    const i = index
                    const Icon = item.icon
                    return (
                      <button
                        key={item.label}
                        data-active={i === active}
                        className="palette-item"
                        onMouseMove={() => setActive(i)}
                        onClick={() => choose(item)}
                      >
                        <span className="palette-icon">
                          <Icon size={15} />
                        </span>
                        <span className="palette-text">
                          <b>{item.label}</b>
                          <small>{item.hint}</small>
                        </span>
                        {i === active && <CornerDownLeft size={13} className="palette-enter" />}
                      </button>
                    )
                  })}
                </div>
              ))}
              {!flat.length && <p className="palette-empty">No results for “{q}”.</p>}
            </div>
            <div className="palette-foot">
              <span>↑↓ navigate · Enter select</span>
              <span>{toast || 'ESC close'}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
