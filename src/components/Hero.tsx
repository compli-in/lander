export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-400 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          AI-Powered Compliance Platform
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight mb-6">
          Data Compliance,{' '}
          <span className="text-sky-400">Simplified</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Automate your compliance workflows with AI. Manage policies, respond to security questionnaires,
          and stay ahead of regulations — all in one intelligent platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#coming-soon"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-slate-900 bg-sky-500 rounded-lg hover:bg-sky-400 transition-all hover:shadow-lg hover:shadow-sky-500/25 hover:-translate-y-0.5"
          >
            Get Early Access
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-800 hover:border-slate-600 transition-all"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
