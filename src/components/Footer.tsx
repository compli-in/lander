export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
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
            <span className="text-lg font-semibold text-slate-100">Compli</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="/#features" className="hover:text-slate-300 transition-colors">
              Features
            </a>
            <a href="/blog" className="hover:text-slate-300 transition-colors">
              Blog
            </a>
            <a href="mailto:hello@compli.in" className="hover:text-slate-300 transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-600">
            &copy; {new Date().getFullYear()} Compli. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
