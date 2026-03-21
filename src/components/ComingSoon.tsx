'use client';

import { useState } from 'react';

export default function ComingSoon() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm({ name: '', email: '', company: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="early-access" className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-3xl p-10 sm:p-12 border border-slate-700/50">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Early Access Open
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-3">
            Request Early Access
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            We&apos;re onboarding a small group of security teams. Tell us about your environment
            and we&apos;ll be in touch within 24 hours.
          </p>

          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-lg">You&apos;re on the list!</p>
                <p className="text-slate-400 text-sm mt-1">We&apos;ll reach out within 24 hours.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm text-slate-400">Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Priya Sharma"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm text-slate-400">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="priya@company.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-slate-400">Company</label>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-slate-400">What cloud(s) are you running?</label>
                <textarea
                  rows={3}
                  placeholder="e.g. AWS (3 accounts), GCP. Currently doing SOC 2 Type II audit..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-colors resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-400">Something went wrong. Email us directly at{' '}
                  <a href="mailto:hello@compli.in" className="underline">hello@compli.in</a>
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-slate-900 bg-sky-500 rounded-lg hover:bg-sky-400 transition-all hover:shadow-lg hover:shadow-sky-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : 'Request Early Access'}
                {status !== 'loading' && (
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
