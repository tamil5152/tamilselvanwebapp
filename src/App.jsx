import { useEffect, useMemo, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { journey, profile } from './data/content.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import { About, Contact, Footer, Journey, Marquee, Projects, Skills } from './components/Sections.jsx'
import { CursorGlow } from './components/ui.jsx'

/** Loads public repos + profile numbers live from GitHub, so the site stays up to date by itself. */
function useGitHub(user) {
  const [state, setState] = useState({ repos: [], stats: null, status: 'loading' })
  useEffect(() => {
    const ctrl = new AbortController()
    const get = (path) =>
      fetch(`https://api.github.com/users/${user}${path}`, { signal: ctrl.signal }).then((r) => {
        if (!r.ok) throw new Error(`GitHub ${r.status}`)
        return r.json()
      })
    Promise.all([get(''), get('/repos?per_page=100&sort=updated')])
      .then(([u, list]) => {
        const repos = list
          .filter((r) => !r.fork && !r.archived)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at),
          )
          .map((r) => ({
            name: r.name.replace(/[-_]+/g, ' '),
            description: r.description,
            url: r.homepage || r.html_url,
            repo: r.html_url,
            stars: r.stargazers_count,
            tags: [r.language, ...(r.topics || []).slice(0, 2)].filter(Boolean),
          }))
        const stars = repos.reduce((n, r) => n + r.stars, 0)
        const stats = [
          { label: 'Public repos', value: u.public_repos },
          { label: 'Followers', value: u.followers },
          { label: 'Stars earned', value: stars },
        ].filter((s) => s.value > 0)
        setState({ repos, stats: stats.length ? stats : null, status: 'ready' })
      })
      .catch((e) => {
        if (e.name !== 'AbortError') setState({ repos: [], stats: null, status: 'error' })
      })
    return () => ctrl.abort()
  }, [user])
  return state
}

export default function App() {
  const { repos, stats, status } = useGitHub(profile.githubUser)
  const links = useMemo(
    () =>
      [
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        journey.length && { id: 'journey', label: 'Journey' },
        { id: 'contact', label: 'Contact' },
      ].filter(Boolean),
    [],
  )

  return (
    // reducedMotion="user" switches off movement for visitors who ask their OS for less motion
    <MotionConfig reducedMotion="user">
      <div className="bg" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
        <span className="grid" />
        <span className="noise" />
      </div>
      <CursorGlow />
      <Nav links={links} />
      <main>
        <Hero stats={stats} />
        <Marquee />
        <About />
        <Skills />
        <Projects repos={repos} status={status} />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
