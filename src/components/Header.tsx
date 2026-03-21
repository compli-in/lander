'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="10" width="28" height="5" rx="2.5" fill="#EFF6FF"/>
            <rect x="6" y="10" width="22" height="5" rx="2.5" fill="#0EA5E9"/>
            <rect x="6" y="18" width="28" height="5" rx="2.5" fill="#EFF6FF"/>
            <rect x="6" y="18" width="26" height="5" rx="2.5" fill="#0EA5E9" opacity="0.7"/>
            <rect x="6" y="26" width="28" height="5" rx="2.5" fill="#EFF6FF"/>
            <rect x="6" y="26" width="18" height="5" rx="2.5" fill="#0EA5E9" opacity="0.45"/>
          </svg>
          <span className="text-xl font-semibold text-slate-900">Compli</span>
        </Link>
        <div className="hidden sm:flex items-center gap-6">
          <Link
            href="/#how-it-works"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/#frameworks"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            Frameworks
          </Link>
          <Link
            href="/#agentic"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            Roadmap
          </Link>
          <Link
            href="/blog"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            Blog
          </Link>
          <a
            href="mailto:hello@compli.in?subject=Early Access Request"
            className="text-sm font-medium text-white bg-sky-500 px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors"
          >
            Request Early Access
          </a>
        </div>
      </nav>
    </header>
  );
}
