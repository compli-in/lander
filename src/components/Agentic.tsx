const capabilities = [
  {
    title: 'Remediation Agent',
    description:
      'Tell the agent to fix a finding. It generates the exact Terraform, CLI command, or console steps — and tracks whether the fix was applied in the next scan.',
    status: 'coming soon',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Compliance Copilot',
    description:
      'Ask plain-English questions: "Are we ready for a SOC 2 audit?" or "What\'s blocking our ISO 27001 certification?" Get a clear answer backed by your actual scan data.',
    status: 'coming soon',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Board Report Generator',
    description:
      'One click to generate a board-ready compliance report. Summarises your posture, trend over time, open risks, and remediation progress — no manual deck work.',
    status: 'coming soon',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Autonomous Monitor',
    description:
      'Agents watch your cloud 24/7 and alert you the moment a new misconfiguration appears — before it becomes a finding in your next audit or a headline in the news.',
    status: 'coming soon',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
];

export default function Agentic() {
  return (
    <section id="agentic" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            What&apos;s Next — Agentic Compliance
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
            Automated Today.{' '}
            <span className="text-violet-600">Agentic Tomorrow.</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Scanning and mapping findings is just the start. The next layer of Compli is a suite
            of AI agents that don&apos;t just find problems — they help you fix them, explain them,
            and report on them automatically.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600 shrink-0 group-hover:bg-violet-100 transition-colors">
                  {cap.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-base font-semibold text-slate-900">{cap.title}</h3>
                    <span className="text-xs text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200 shrink-0">
                      {cap.status}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{cap.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm">
            Want early access to agentic features?{' '}
            <a href="mailto:hello@compli.in?subject=Agentic Features Early Access" className="text-violet-600 hover:text-violet-500 transition-colors">
              Let us know →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
