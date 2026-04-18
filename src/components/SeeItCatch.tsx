"use client";
import { useEffect, useState } from "react";
import { ScanMockDashboard } from "./ScanMockDashboard";
import { FrameworkPanel } from "./FrameworkPanel";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TIMELINE: { step: 0|1|2|3|4|5; at: number; highlight: string | null }[] = [
  { step: 0, at: 0,     highlight: null },
  { step: 1, at: 1500,  highlight: null },
  { step: 2, at: 4000,  highlight: null },
  { step: 3, at: 6000,  highlight: null },
  { step: 4, at: 8000,  highlight: "SOC 2 CC6.1" },
  { step: 4, at: 8500,  highlight: "ISO A.8.3" },
  { step: 4, at: 9000,  highlight: "DPDP §8(5)" },
  { step: 5, at: 10500, highlight: "ISO A.8.3" },
];
const TOTAL = 12000;

export function SeeItCatch() {
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(reduced ? TIMELINE.length - 1 : 0);

  useEffect(() => {
    if (reduced) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    TIMELINE.forEach((entry, i) => {
      if (i === 0) return; // already at 0
      const id = setTimeout(() => setIdx(i), entry.at);
      timers.push(id);
    });
    // loop: restart after TOTAL ms
    const loopId = setTimeout(() => setIdx(0), TOTAL);
    timers.push(loopId);
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  const current = TIMELINE[idx];

  return (
    <section id="see-it-catch" className="bg-[color:var(--bg)] text-[color:var(--text)] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">See exactly what we catch.</h2>
          <p className="text-[color:var(--text-dim)] max-w-2xl mx-auto">
            One scan, three frameworks. Every finding maps to the controls your auditor — and the DPDP Board — actually reference.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3"><ScanMockDashboard step={current.step} /></div>
          <div className="lg:col-span-2"><FrameworkPanel highlightedControl={current.highlight} /></div>
        </div>
      </div>
    </section>
  );
}
