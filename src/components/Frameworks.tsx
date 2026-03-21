const live = [
  { name: 'SOC 2', description: '38 Trust Services Criteria', badge: 'Live' },
  { name: 'ISO 27001:2022', description: '93 Annex A controls', badge: 'Live' },
  { name: 'DPDP Act 2023', description: 'India Digital Personal Data Protection', badge: 'Live' },
];

const coming = [
  'CERT-In Directions 2022',
  'RBI Cybersecurity Framework',
  'SEBI CSCRF',
  'PCI DSS v4.0',
  'GDPR',
  'HIPAA',
  'NIST CSF 2.0',
];

const providers = [
  { name: 'Amazon Web Services', short: 'AWS' },
  { name: 'Microsoft Azure', short: 'Azure' },
  { name: 'Google Cloud', short: 'GCP' },
  { name: 'Kubernetes', short: 'K8s' },
];

export default function Frameworks() {
  return (
    <section id="frameworks" className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
            Every Framework. Every Cloud.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Built for India&apos;s regulatory reality — with global frameworks covered too.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Frameworks */}
          <div>
            <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-6">Compliance Frameworks</h3>
            <div className="space-y-4 mb-8">
              {live.map((f) => (
                <div key={f.name} className="flex items-start justify-between gap-4 bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                  <div>
                    <p className="font-semibold text-white">{f.name}</p>
                    <p className="text-sm text-slate-400 mt-0.5">{f.description}</p>
                  </div>
                  <span className="shrink-0 text-xs font-medium bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    {f.badge}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/30">
              <p className="text-sm font-medium text-slate-400 mb-3">Coming Soon</p>
              <div className="flex flex-wrap gap-2">
                {coming.map((name) => (
                  <span key={name} className="text-xs text-slate-500 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cloud providers */}
          <div>
            <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-6">Cloud Providers</h3>
            <div className="grid grid-cols-2 gap-4">
              {providers.map((p) => (
                <div key={p.name} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-colors">
                  <p className="text-2xl font-semibold text-white mb-1">{p.short}</p>
                  <p className="text-sm text-slate-400">{p.name}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-br from-sky-500/10 to-slate-800/50 rounded-xl p-6 border border-sky-500/20">
              <p className="text-white font-semibold mb-2">Built for India&apos;s Security Teams</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Compli is the only compliance platform built with Indian regulations as first-class
                citizens — not an afterthought. DPDP Act, CERT-In, RBI, and SEBI frameworks
                alongside global standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
