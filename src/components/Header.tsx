'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-navy-900"
          >
            <path
              d="M16 2L4 8v8c0 7.732 5.12 14.936 12 17 6.88-2.064 12-9.268 12-17V8L16 2z"
              fill="#0F172A"
              fillOpacity="0.1"
              stroke="#0F172A"
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
          <span className="text-xl font-semibold text-slate-900">Compli</span>
        </Link>
        <div className="hidden sm:flex items-center gap-6">
          <Link
            href="/#features"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/blog"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/#coming-soon"
            className="text-sm font-medium text-white bg-slate-900 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Get Early Access
          </Link>
        </div>
      </nav>
    </header>
  );
}
