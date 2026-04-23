"use client";

export function ScanMockDashboard({ step, onReplay }: { step: 0 | 1 | 2 | 3 | 4 | 5; onReplay?: () => void }) {
  return (
    <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-card)] p-5 h-full relative">
      {onReplay && (
        <button
          type="button"
          onClick={onReplay}
          aria-label="Replay scan animation"
          className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-md border border-[color:var(--border)] bg-[color:var(--bg)] px-2 py-1 text-[11px] text-[color:var(--text-dim)] hover:text-[color:var(--text)] hover:border-[color:var(--accent)]/60 transition"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <path d="M3 4v5h5" />
          </svg>
          Replay
        </button>
      )}
      <div className="flex justify-between text-xs text-[color:var(--text-muted)] mb-4">
        <span>Dashboard · acme-prod</span>
        <span className="text-[color:var(--pass)]">● connected</span>
      </div>

      {step === 0 && (
        <div className="font-mono text-sm text-[color:var(--text-dim)]">
          <div>$ compli connect --provider aws</div>
          <div className="text-[color:var(--pass)]">✓ Assume role OK · 18 accounts</div>
        </div>
      )}

      {(step === 1 || step === 2) && (
        <div>
          <div className="text-sm text-[color:var(--text)] mb-2">Scanning AWS · ap-south-1</div>
          <div className="h-2 rounded-full bg-[#1a2545] overflow-hidden">
            <div className="h-full bg-[color:var(--accent-cta)] transition-[width] duration-1000"
              style={{ width: step === 1 ? "42%" : "100%" }} />
          </div>
          <div className="text-xs text-[color:var(--text-muted)] mt-2">
            {step === 1 ? "342 / 500 checks" : "500 / 500 checks complete"}
          </div>
        </div>
      )}

      {step >= 3 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[color:var(--text)]">Findings</span>
            <span className="text-xs text-[color:var(--text-muted)]">6 new</span>
          </div>
          <div className={`rounded-lg p-4 border-l-[3px] border-l-[color:var(--high)] bg-[#1a2545] transition-all ${
            step >= 4 ? "ring-2 ring-[color:var(--high)]/40" : ""
          }`}>
            <div className="flex justify-between">
              <span className="text-[10px] font-bold tracking-widest text-[#fca5a5]">HIGH</span>
              <span className="text-[10px] text-[color:var(--text-muted)]">aws-s3 · PII</span>
            </div>
            <div className="text-sm text-[color:var(--text)] mt-1">Bucket stores PII without encryption</div>
            <code className="text-xs bg-[color:var(--bg)] px-1.5 py-0.5 rounded">customers.raw-pii</code>
            {step >= 3 && (
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {["DPDP §8(5)", "SOC 2 CC6.1", "ISO A.8.24"].map(c => (
                  <span key={c} className="text-[10px] bg-[#1e3a5f] text-[color:var(--accent)] px-2 py-0.5 rounded">{c}</span>
                ))}
              </div>
            )}
          </div>
          {step >= 5 && (
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs text-[color:var(--text-muted)]">Posture:</span>
              <span className="text-xl font-semibold line-through text-[color:var(--text-muted)]">82</span>
              <span className="text-2xl font-semibold text-[color:var(--text)]">78</span>
              <span className="text-xs text-[#fbbf24]">↓ 4</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
