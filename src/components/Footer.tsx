export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="10" width="28" height="5" rx="2.5" fill="#EFF6FF"/>
              <rect x="6" y="10" width="22" height="5" rx="2.5" fill="#0EA5E9"/>
              <rect x="6" y="18" width="28" height="5" rx="2.5" fill="#EFF6FF"/>
              <rect x="6" y="18" width="26" height="5" rx="2.5" fill="#0EA5E9" opacity="0.7"/>
              <rect x="6" y="26" width="28" height="5" rx="2.5" fill="#EFF6FF"/>
              <rect x="6" y="26" width="18" height="5" rx="2.5" fill="#0EA5E9" opacity="0.45"/>
            </svg>
            <span className="text-lg font-semibold text-slate-900">Compli</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="/#features" className="hover:text-slate-700 transition-colors">
              Features
            </a>
            <a href="/blog" className="hover:text-slate-700 transition-colors">
              Blog
            </a>
            <a href="mailto:hello@compli.in" className="hover:text-slate-700 transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Compli. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
