'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F1A]/80 backdrop-blur-md border-b border-slate-800">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 2L4 8v8c0 7.732 5.12 14.936 12 17 6.88-2.064 12-9.268 12-17V8L16 2z"
              fill="rgba(255,255,255,0.05)"
              stroke="#E2E8F0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16l3 3 6-6"
              stroke="#0EA5E9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xl font-semibold text-slate-100">Compli</span>
        </Link>
        <div className="hidden sm:flex items-center gap-6">
          <Link
            href="/#features"
            className="text-sm text-slate-400 hover:text-slate-100 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/blog"
            className="text-sm text-slate-400 hover:text-slate-100 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/#coming-soon"
            className="text-sm font-medium text-slate-900 bg-sky-500 px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors"
          >
            Get Early Access
          </Link>
        </div>
      </nav>
    </header>
  );
}
