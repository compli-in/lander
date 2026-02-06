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
                d="M11 14V10a5 5 0 0 1 10 0v4"
                stroke="#0EA5E9"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <rect
                x="7"
                y="14"
                width="18"
                height="14"
                rx="3"
                fill="rgba(14,165,233,0.1)"
                stroke="#0EA5E9"
                strokeWidth="2"
              />
              <path
                d="M18.5 18.5A3.5 3.5 0 1 0 18.5 23.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
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
