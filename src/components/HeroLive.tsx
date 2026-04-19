import Link from "next/link";
import { FindingsTicker } from "./FindingsTicker";
import { findings } from "@/data/findings";

export function HeroLive() {
  return (
    <section className="relative pt-32 pb-20 px-6 bg-[color:var(--bg)] text-[color:var(--text)]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(70% 55% at 50% 0%, rgba(56,189,248,.18), transparent 65%)" }} />
      <div className="relative max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)] border border-[#1e3a5f] px-3.5 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-[color:var(--pass)] rounded-full" />
          14 orgs scanning right now
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-semibold leading-[1.05] tracking-tight mb-5">
          Know your cloud compliance score
          <br />
          <span className="text-[color:var(--accent)]">before your auditor does.</span>
        </h1>
        <p className="text-lg text-[color:var(--text-dim)] max-w-2xl mx-auto mb-8 leading-relaxed">
          DPDP Act, SOC 2, ISO 27001 — continuously evaluated across AWS, Azure, GCP, and Kubernetes. Built in India, for India-first compliance.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link href="#early-access" className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium bg-[color:var(--accent-cta)] text-white hover:bg-blue-500 transition">
            Request Early Access →
          </Link>
          <Link href="#see-it-catch" className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm border border-[#2a3a5c] text-[color:var(--text-dim)] hover:bg-[#111c36] transition">
            ▶ See a live scan
          </Link>
        </div>
        <FindingsTicker findings={findings} />
      </div>
    </section>
  );
}
