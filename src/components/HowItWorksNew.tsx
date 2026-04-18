import { ReactNode } from "react";

function Step({ n, title, body, visual }: { n: number; title: string; body: string; visual: ReactNode }) {
  return (
    <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-card)] p-6">
      <div className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)] mb-3">Step {n}</div>
      <h3 className="text-lg font-semibold text-[color:var(--text)] mb-2">{title}</h3>
      <p className="text-sm text-[color:var(--text-dim)] mb-5 leading-relaxed">{body}</p>
      <div className="rounded-lg bg-[color:var(--bg)] border border-[color:var(--border)] p-4 font-mono text-xs text-[color:var(--text-dim)] min-h-[90px]">
        {visual}
      </div>
    </div>
  );
}

export function HowItWorksNew() {
  return (
    <section id="product" className="bg-[color:var(--bg)] text-[color:var(--text)] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">How it works.</h2>
          <p className="text-[color:var(--text-dim)] max-w-2xl mx-auto">From zero to continuous compliance in an afternoon.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Step n={1} title="Connect your cloud in 5 minutes." body="Cross-account IAM role. No agents, no static keys."
            visual={<><div>$ aws sts assume-role</div><div className="text-[color:var(--pass)]">✓ Connected · 18 accounts</div></>} />
          <Step n={2} title="Continuous scans, not quarterly snapshots." body="Every change re-scored in minutes."
            visual={<><div>Scanning · 342/500 checks</div><div className="h-1.5 mt-2 rounded-full bg-[#1a2545] overflow-hidden"><div className="h-full w-[68%] bg-[color:var(--accent-cta)]" /></div></>} />
          <Step n={3} title="Live posture + prioritised fixes." body="Ranked by audit impact, not raw CVE score."
            visual={<><div className="flex items-baseline gap-3"><span className="text-2xl font-semibold text-[color:var(--text)]">78</span><span className="text-[color:var(--pass)] text-xs">↑ 4 today</span></div></>} />
        </div>
      </div>
    </section>
  );
}
