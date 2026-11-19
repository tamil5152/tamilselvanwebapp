import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { profile } from './data/content.js'
import ContactPage from './components/ContactPage.jsx'
import Experience from './components/Experience.jsx'
import GitHubActivity from './components/GitHubActivity.jsx'
import { About, Contact, Education, Hero, Outro, TechStack } from './components/Home.jsx'
import Layout from './components/Layout.jsx'
import { PaletteProvider, ThemeProvider } from './components/primitives.jsx'
import { Projects } from './components/Projects.jsx'

/** Public repositories, loaded live from GitHub in the visitor's browser. */
function useRepos(user) {
  const [repos, setRepos] = useState([])
  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((list) =>
        setRepos(
          list
            .filter((r) => !r.fork && !r.archived)
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
        /* offline or rate-limited: repo links fall back to the profile */
      })
    return () => ctrl.abort()
  }, [user])
  return repos
}

const Title = ({ text }) => {
  useEffect(() => {
    document.title = text
  }, [text])
  return null
}

export default function App() {
  const repos = useRepos(profile.githubUser)
  const base = `${profile.name} — ${profile.role}`
  return (
    <ThemeProvider>
      <PaletteProvider>
        {/* reducedMotion="user" turns animation off for visitors who ask their device for less motion */}
        <MotionConfig reducedMotion="user">
          <Layout>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Title text={base} />
                    <Hero />
                    <About />
                    <Contact />
                    <Projects repos={repos} />
                    <Experience />
                    <Education />
                    <TechStack />
                    <GitHubActivity />
                    <Outro />
                  </>
                }
              />
              <Route
                path="/projects"
                element={
                  <>
                    <Title text={`Projects · ${profile.name}`} />
                    <Projects repos={repos} full />
                    <Outro />
                  </>
                }
              />
              <Route
                path="/experience"
                element={
                  <>
                    <Title text={`Experience · ${profile.name}`} />
                    <Experience />
                    <Education />
                    <Outro />
                  </>
                }
              />
              <Route
                path="/contact"
                element={
                  <>
                    <Title text={`Contact · ${profile.name}`} />
                    <ContactPage />
                  </>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <Title text={`Not found · ${profile.name}`} />
                    <Hero />
                    <Outro />
                  </>
                }
              />
            </Routes>
          </Layout>
        </MotionConfig>
      </PaletteProvider>
    </ThemeProvider>
  )
}
