const steps = [
  {
    number: '01',
    title: 'Connect Your Cloud',
    description:
      'Add an AWS IAM role, Azure service principal, GCP service account, or kubeconfig. Takes under 5 minutes. No agents to deploy, no code to change.',
  },
  {
    number: '02',
    title: 'Run a Scan',
    description:
      'Compli runs hundreds of security checks across your entire cloud environment. Every misconfiguration, every exposed resource, every policy gap — found automatically.',
  },
  {
    number: '03',
    title: 'Fix What Matters',
    description:
      'Findings are prioritised by severity and mapped to compliance controls. Each issue comes with exact remediation steps so your team knows exactly what to do next.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
            From Zero to Compliance Posture in Minutes
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            No professional services. No six-month implementation. Just connect, scan, and fix.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-px bg-gradient-to-r from-sky-500/0 via-sky-400/40 to-sky-500/0" />

          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-start gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0">
                  <span className="text-sky-600 font-semibold text-lg">{step.number}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
