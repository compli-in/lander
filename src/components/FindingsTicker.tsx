"use client";
import { useEffect, useState } from "react";
import type { Finding, Severity } from "@/data/findings";

const SEV: Record<Severity, { border: string; label: string }> = {
  HIGH: { border: "border-l-[color:var(--high)]", label: "text-[#fca5a5]" },
  MED:  { border: "border-l-[color:var(--med)]",  label: "text-[#fcd34d]" },
  PASS: { border: "border-l-[color:var(--pass)]", label: "text-[#6ee7b7]" },
};

export function FindingsTicker({ findings, intervalMs = 2000 }: { findings: Finding[]; intervalMs?: number }) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setOffset(o => (o + 1) % findings.length), intervalMs);
    return () => clearInterval(id);
  }, [findings.length, intervalMs]);

  const visible = Array.from({ length: 4 }, (_, i) => findings[(offset + i) % findings.length]);

  return (
    <div
      className="mx-auto max-w-5xl rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-card)] p-4"
      aria-hidden="true"
    >
      <div className="flex justify-between text-xs text-[color:var(--text-muted)] mb-3">
        <span>Live scan · acme-prod · AWS ap-south-1</span>
        <span className="text-[color:var(--pass)]">● streaming findings</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {visible.map(f => (
          <div key={f.id} className={`bg-[#1a2545] border-l-[3px] ${SEV[f.severity].border} p-2.5 rounded-md transition-opacity duration-500`}>
            <div className={`text-[10px] font-bold tracking-widest ${SEV[f.severity].label}`}>{f.severity}</div>
            <div className="text-sm text-[color:var(--text)] mt-1">{f.title}</div>
            <div className="text-[10px] text-[color:var(--text-muted)]">{f.controlRef}</div>
          </div>
        ))}
      </div>
      <span className="sr-only">
        Live scan example showing findings such as public S3 buckets mapped to DPDP section 8(5), SOC 2 CC6.1, and ISO A.8.3 controls.
      </span>
    </div>
  );
}
