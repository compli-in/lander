"use client";
import { frameworks } from "@/data/frameworks";

export function FrameworkPanel({ highlightedControl }: { highlightedControl: string | null }) {
  return (
    <div className="flex flex-col gap-4">
      {frameworks.map(f => {
        const pct = Math.round((f.automated / f.total) * 100);
        return (
          <div key={f.id} className="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-card)] p-5">
            <div className="flex items-baseline justify-between mb-2">
              <div className="text-[color:var(--text)] font-semibold">{f.name}</div>
              <div className="text-xs text-[color:var(--text-muted)]">{f.total} controls · {f.automated} automated</div>
            </div>
            <div className="h-1.5 rounded-full bg-[#1a2545] overflow-hidden mb-3">
              <div className="h-full bg-[color:var(--accent-cta)]" style={{ width: `${pct}%` }} />
            </div>
            <ul className="space-y-1.5">
              {f.sampleControls.map(c => (
                <li
                  key={c.id}
                  data-control-id={c.id}
                  data-highlighted={highlightedControl === c.id}
                  className={`text-xs px-2.5 py-1.5 rounded-md transition-all ${
                    highlightedControl === c.id
                      ? "bg-[#1e3a5f] ring-1 ring-[color:var(--accent)] text-[color:var(--text)]"
                      : "text-[color:var(--text-dim)]"
                  }`}
                >
                  <span className="font-mono text-[10px] text-[color:var(--text-muted)] mr-2">{c.id}</span>
                  {c.label}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
