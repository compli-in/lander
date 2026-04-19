"use client";
import { FormEvent, useState } from "react";

type Payload = { email: string; company: string; cloud: string; frameworks: string[] };

const INPUT_CLASS =
  "bg-[color:var(--bg)] border border-[color:var(--border)] rounded-lg px-4 py-3 text-base text-[color:var(--text)] placeholder:text-[color:var(--text-muted)] focus:outline-none focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/30 transition";

export function EarlyAccessForm({ onSubmit }: { onSubmit?: (p: Payload) => Promise<void> }) {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const frameworks = data.getAll("frameworks").map(String);
    const payload: Payload = {
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      cloud: String(data.get("cloud") ?? ""),
      frameworks,
    };
    setSubmitting(true);
    try {
      if (onSubmit) await onSubmit(payload);
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  const wrapperClass =
    "relative max-w-2xl mx-auto rounded-2xl border border-[color:var(--accent)]/25 bg-gradient-to-br from-[#10193a] to-[color:var(--bg-card)] shadow-[0_20px_60px_-15px_rgba(56,189,248,0.25)] p-10";

  if (done) {
    return (
      <div id="early-access" className={`${wrapperClass} text-center`}>
        <p className="text-[color:var(--text)] text-lg">You're on the list. We'll reach out within 2 business days.</p>
      </div>
    );
  }

  return (
    <form id="early-access" onSubmit={handle} className={`${wrapperClass} grid gap-5`}>
      <div>
        <h2 className="text-3xl font-semibold text-[color:var(--text)] tracking-tight">Request early access.</h2>
        <p className="text-sm text-[color:var(--text-dim)] mt-2">We'll reach out within 2 business days with onboarding steps.</p>
      </div>
      <label className="grid gap-1.5 text-sm font-medium text-[color:var(--text-dim)]">
        Work email
        <input
          required
          type="email"
          name="email"
          placeholder="you@company.com"
          className={INPUT_CLASS}
        />
      </label>
      <label className="grid gap-1.5 text-sm font-medium text-[color:var(--text-dim)]">
        Company
        <input
          required
          name="company"
          placeholder="Acme Technologies Pvt Ltd"
          className={INPUT_CLASS}
        />
      </label>
      <label className="grid gap-1.5 text-sm font-medium text-[color:var(--text-dim)]">
        Primary cloud
        <select name="cloud" required defaultValue="" className={INPUT_CLASS}>
          <option value="" disabled>Select your primary cloud…</option>
          <option value="aws">AWS</option>
          <option value="azure">Azure</option>
          <option value="gcp">GCP</option>
          <option value="k8s">Kubernetes</option>
          <option value="mixed">Mixed / multi-cloud</option>
        </select>
      </label>
      <fieldset className="grid gap-2.5">
        <legend className="text-sm font-medium text-[color:var(--text-dim)]">Which framework first?</legend>
        <div className="flex flex-wrap gap-3 text-sm text-[color:var(--text)]">
          {["DPDP", "SOC 2", "ISO 27001"].map(f => (
            <label
              key={f}
              className="inline-flex items-center gap-2 bg-[color:var(--bg)] border border-[color:var(--border)] rounded-lg px-3 py-2 cursor-pointer hover:border-[color:var(--accent)]/60 transition"
            >
              <input type="checkbox" name="frameworks" value={f} className="accent-[color:var(--accent-cta)]" /> {f}
            </label>
          ))}
        </div>
      </fieldset>
      <button
        type="submit"
        disabled={submitting}
        className="mt-2 bg-[color:var(--accent-cta)] text-white px-5 py-3.5 rounded-lg font-medium text-base hover:bg-blue-500 disabled:opacity-60 transition"
      >
        {submitting ? "Submitting…" : "Request Early Access →"}
      </button>
    </form>
  );
}
