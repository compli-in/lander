export default function ComingSoon() {
  return (
    <section id="coming-soon" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 sm:p-16 shadow-xl">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            Coming Soon
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
            We&apos;re Building Something Special
          </h2>

          <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Compli is currently in development. Join our early access list to be the first
            to experience AI-powered compliance management.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:hello@compli.in"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-slate-900 bg-white rounded-lg hover:bg-slate-100 transition-all hover:shadow-lg"
            >
              <svg
                className="mr-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contact Us
            </a>
          </div>

          <p className="text-sm text-slate-400 mt-6">
            Questions? Reach out at{' '}
            <a href="mailto:hello@compli.in" className="text-sky-400 hover:text-sky-300 transition-colors">
              hello@compli.in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
