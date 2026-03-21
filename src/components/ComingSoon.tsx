export default function ComingSoon() {
  return (
    <section id="early-access" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-3xl p-12 sm:p-16 border border-slate-700/50">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Early Access Open
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
            Stop Guessing Your Compliance Posture
          </h2>

          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-4 leading-relaxed">
            Join security teams already using Compli to get continuous visibility into their
            cloud compliance — before auditors, regulators, or customers ask for it.
          </p>

          <p className="text-slate-500 text-sm mb-8 max-w-lg mx-auto">
            We&apos;re onboarding a small group of early customers. If you&apos;re a CISO or security
            lead at a SaaS, fintech, or healthcare company, we&apos;d love to talk.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:hello@compli.in?subject=Early Access Request"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-slate-900 bg-sky-500 rounded-lg hover:bg-sky-400 transition-all hover:shadow-lg hover:shadow-sky-500/25 hover:-translate-y-0.5"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Request Early Access
            </a>
          </div>

          <p className="text-sm text-slate-500 mt-6">
            Or reach us directly at{' '}
            <a href="mailto:hello@compli.in" className="text-sky-400 hover:text-sky-300 transition-colors">
              hello@compli.in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
