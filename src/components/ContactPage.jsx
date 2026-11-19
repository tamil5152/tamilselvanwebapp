import { useState } from 'react'
import { Check, Copy, Send } from 'lucide-react'
import { profile } from '../data/content.js'
import { ContactStrip, Outro } from './Home.jsx'
import { BlurFade, Section, useClock } from './primitives.jsx'

/**
 * Message form. There is no backend: submitting opens the visitor's mail app
 * with everything pre-filled, so nothing is stored and no service is needed.
 */
function MessageForm() {
  const [form, setForm] = useState({ name: '', email: '', topic: 'Job opportunity', message: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    const subject = `${form.topic} — from ${form.name}`
    const body = `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }
  return (
    <form className="form" onSubmit={submit}>
      <div className="form-row">
        <label>
          <span>Name</span>
          <input required value={form.name} onChange={set('name')} placeholder="Your name" autoComplete="name" />
        </label>
        <label>
          <span>Email</span>
          <input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" autoComplete="email" />
        </label>
      </div>
      <label>
        <span>Topic</span>
        <select value={form.topic} onChange={set('topic')}>
          <option>Job opportunity</option>
          <option>Freelance project</option>
          <option>Collaboration</option>
          <option>Just saying hi</option>
        </select>
      </label>
      <label>
        <span>Message</span>
        <textarea required rows={5} value={form.message} onChange={set('message')} placeholder="What would you like to build?" />
      </label>
      <div className="form-foot">
        <span className="mono-soft">Opens your mail app with this filled in.</span>
        <button type="submit" className="btn-dark">
          Send message <Send size={13} />
        </button>
      </div>
    </form>
  )
}

export default function ContactPage() {
  const time = useClock(profile.timeZone, { hour: 'numeric', minute: '2-digit' })
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }
  return (
    <>
      <Section id="contact" title="Contact">
        <ContactStrip />
        <div className="pad contact-info">
          <BlurFade className="info-card">
            <p className="mono-label">Email</p>
            <div className="email-row">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button className="icon-btn" onClick={copy} aria-label="Copy email address">
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </BlurFade>
          <BlurFade className="info-card" delay={0.05}>
            <p className="mono-label">Based in</p>
            <p>
              {profile.location} · <span className="mono-soft">{time} IST</span>
            </p>
          </BlurFade>
          <BlurFade className="info-card wide" delay={0.1}>
            <p className="mono-label">Open to</p>
            <p>
              <i className="live-dot" /> {profile.openTo[0].toUpperCase() + profile.openTo.slice(1)}.
            </p>
          </BlurFade>
        </div>
      </Section>
      <Section title="Send a Message">
        <div className="pad">
          <MessageForm />
        </div>
      </Section>
      <Outro />
    </>
  )
}
