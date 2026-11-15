import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { profile } from './data/content.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import { Contact, Experience, Marquee, Numbers, Toolkit, Work } from './components/Sections.jsx'

/** Public repositories, loaded live from GitHub so the list never goes stale. */
function useRepos(user) {
  const [repos, setRepos] = useState([])
  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`GitHub ${r.status}`))))
      .then((list) =>
        setRepos(
          list
            .filter((r) => !r.fork && !r.archived)
            .sort(
              (a, b) =>
                b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at),
            )
            .map((r) => ({
              name: r.name,
              description: r.description,
              url: r.html_url,
              language: r.language,
              year: new Date(r.pushed_at).getFullYear(),
            })),
        ),
      )
      .catch(() => {
        /* offline or rate-limited: the section simply doesn't render */
      })
    return () => ctrl.abort()
  }, [user])
  return repos
}

export default function App() {
  const repos = useRepos(profile.githubUser)
  return (
    // reducedMotion="user" turns movement off for visitors who ask their device for less motion
    <MotionConfig reducedMotion="user">
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Numbers />
        <Experience />
        <Work repos={repos} />
        <Toolkit />
        <Contact />
      </main>
    </MotionConfig>
  )
}
