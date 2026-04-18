"use client";
import { FormEvent, useState } from "react";

type Payload = { email: string; company: string; cloud: string; frameworks: string[] };

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

  if (done) {
    return (
      <div id="early-access" className="bg-[color:var(--bg-card)] border border-[color:var(--border)] rounded-xl p-10 text-center max-w-2xl mx-auto">
        <p className="text-[color:var(--text)] text-lg">You're on the list. We'll reach out within 2 business days.</p>
      </div>
    );
  }

  return (
    <form id="early-access" onSubmit={handle}
      className="bg-[color:var(--bg-card)] border border-[color:var(--border)] rounded-xl p-8 max-w-2xl mx-auto grid gap-4">
      <h2 className="text-2xl font-semibold text-[color:var(--text)] mb-2">Request early access.</h2>
      <label className="grid gap-1.5 text-sm text-[color:var(--text-dim)]">
        Work email
        <input required type="email" name="email"
          className="bg-[color:var(--bg)] border border-[color:var(--border)] rounded-md px-3 py-2 text-[color:var(--text)]" />
      </label>
      <label className="grid gap-1.5 text-sm text-[color:var(--text-dim)]">
        Company
        <input required name="company"
          className="bg-[color:var(--bg)] border border-[color:var(--border)] rounded-md px-3 py-2 text-[color:var(--text)]" />
      </label>
      <label className="grid gap-1.5 text-sm text-[color:var(--text-dim)]">
        Primary cloud
        <select name="cloud" required defaultValue=""
          className="bg-[color:var(--bg)] border border-[color:var(--border)] rounded-md px-3 py-2 text-[color:var(--text)]">
          <option value="" disabled>Select…</option>
          <option value="aws">AWS</option>
          <option value="azure">Azure</option>
          <option value="gcp">GCP</option>
          <option value="k8s">Kubernetes</option>
          <option value="mixed">Mixed</option>
        </select>
      </label>
      <fieldset className="grid gap-2">
        <legend className="text-sm text-[color:var(--text-dim)]">Which framework first?</legend>
        <div className="flex flex-wrap gap-4 text-sm text-[color:var(--text)]">
          {["DPDP", "SOC 2", "ISO 27001"].map(f => (
            <label key={f} className="inline-flex items-center gap-2">
              <input type="checkbox" name="frameworks" value={f} /> {f}
            </label>
          ))}
        </div>
      </fieldset>
      <button type="submit" disabled={submitting}
        className="mt-2 bg-[color:var(--accent-cta)] text-white px-5 py-3 rounded-md font-medium disabled:opacity-60">
        {submitting ? "Submitting…" : "Request Early Access →"}
      </button>
    </form>
  );
}
