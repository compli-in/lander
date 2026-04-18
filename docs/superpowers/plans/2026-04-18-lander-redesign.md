# Lander Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the compli.in homepage with a DPDP-first, product-led page: live findings ticker, merged scan+frameworks section, India comparison, animated mock components — per spec `docs/superpowers/specs/2026-04-18-lander-redesign-design.md`.

**Architecture:** Next.js 16 App Router (already in place). New React server components for static structure; small client components (`"use client"`) for each animated block. Animations implemented with pure CSS keyframes + tiny React state (no Framer Motion — keeps bundle tight). Tokens live in `src/components/tokens.ts` and flow into Tailwind via CSS custom properties.

**Tech Stack:** Next.js 16.1.6 · React 19.2.3 · Tailwind v4 · TypeScript · Vitest + @testing-library/react + happy-dom (new) for component tests.

---

## File Structure

**New component files in `src/components/`:**
- `tokens.ts` — colour, easing, duration tokens (exported constants + CSS custom-property names)
- `TopNav.tsx` — sticky top navigation (client component for scroll behaviour)
- `HeroLive.tsx` — hero section, composes `FindingsTicker`
- `FindingsTicker.tsx` — loops through a findings pool (client)
- `SeeItCatch.tsx` — merged scan + frameworks section (client, owns the 12s sequence state)
- `ScanMockDashboard.tsx` — left-side animated dashboard (client; receives `currentStep` prop)
- `FrameworkPanel.tsx` — right-side framework cards (client; receives `highlightedControl` prop)
- `IndiaComparison.tsx` — section 3 table (server component; static)
- `HowItWorksNew.tsx` — section 4 with 3 animated step cards (client)
- `AgenticPreview.tsx` — section 5 diff animation (client)
- `EarlyAccessForm.tsx` — section 6 inline form (client)
- `useReducedMotion.ts` (in `src/hooks/`) — shared hook for `prefers-reduced-motion`

**Data files:**
- `src/data/findings.ts` — the findings pool for `FindingsTicker`
- `src/data/frameworks.ts` — framework metadata (name, control counts, sample controls)
- `src/data/comparison.ts` — India comparison table rows

**Deleted files (from `src/components/`):**
- `Header.tsx`, `Hero.tsx`, `Features.tsx`, `HowItWorks.tsx`, `Frameworks.tsx`, `Agentic.tsx`, `ComingSoon.tsx`

**Modified files:**
- `src/app/page.tsx` — new imports, new section order, updated schemas
- `src/app/layout.tsx` — updated `<title>` and meta description, CSS custom properties in root
- `src/app/globals.css` — token custom properties, keyframes, reduced-motion resets

**Test files in `src/__tests__/`:**
- `tokens.test.ts`, `useReducedMotion.test.tsx`, `TopNav.test.tsx`, `FindingsTicker.test.tsx`, `HeroLive.test.tsx`, `FrameworkPanel.test.tsx`, `ScanMockDashboard.test.tsx`, `SeeItCatch.test.tsx`, `IndiaComparison.test.tsx`, `HowItWorksNew.test.tsx`, `AgenticPreview.test.tsx`, `EarlyAccessForm.test.tsx`, `page.test.tsx`

---

## Task 0: Test infrastructure and dev setup

**Files:**
- Create: `vitest.config.ts`, `src/test-setup.ts`
- Modify: `package.json`, `tsconfig.json`

- [ ] **Step 1: Install test deps**

```bash
cd lander
npm install --save-dev vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom happy-dom @vitejs/plugin-react
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    setupFiles: ["./src/test-setup.ts"],
    globals: true,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

- [ ] **Step 3: Create `src/test-setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => cleanup());
```

- [ ] **Step 4: Add `test` script to `package.json`**

Under `"scripts"`, add: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 5: Add path alias to `tsconfig.json`**

Under `compilerOptions`, ensure: `"baseUrl": "."`, `"paths": { "@/*": ["src/*"] }`.

- [ ] **Step 6: Verify setup with a smoke test**

Create `src/__tests__/smoke.test.ts`:

```ts
import { expect, it } from "vitest";
it("runs", () => expect(1 + 1).toBe(2));
```

Run: `npm test`
Expected: 1 test passing.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/test-setup.ts tsconfig.json src/__tests__/smoke.test.ts
git commit -m "chore(lander): add vitest + testing-library setup"
```

---

## Task 1: Design tokens

**Files:**
- Create: `src/components/tokens.ts`, `src/__tests__/tokens.test.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/tokens.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { colors, durations, easings } from "@/components/tokens";

describe("tokens", () => {
  it("exposes required colour keys", () => {
    for (const key of ["bg", "bgCard", "border", "text", "textDim", "accent", "accentCta", "warm", "cream", "pass", "med", "high"]) {
      expect(colors).toHaveProperty(key);
    }
  });

  it("colours are hex strings", () => {
    for (const value of Object.values(colors)) expect(value).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it("durations are ms numbers", () => {
    expect(durations.tickerCycle).toBeGreaterThan(0);
    expect(durations.scanSequence).toBeGreaterThan(0);
  });

  it("easings are strings", () => {
    expect(typeof easings.standard).toBe("string");
  });
});
```

Run: `npm test -- tokens` → fails (module missing).

- [ ] **Step 2: Create `src/components/tokens.ts`**

```ts
export const colors = {
  bg: "#0b1220",
  bgCard: "#0f1830",
  border: "#1d2a44",
  text: "#e6edf7",
  textDim: "#a9b7d1",
  textMuted: "#8aa0c7",
  accent: "#7dd3fc",
  accentCta: "#2563eb",
  warm: "#b45309",
  cream: "#f7f6f2",
  pass: "#34d399",
  med: "#f59e0b",
  high: "#ef4444",
} as const;

export const durations = {
  tickerCycle: 2000,
  tickerTotal: 6000,
  scanSequence: 12000,
  stepPulse: 600,
} as const;

export const easings = {
  standard: "cubic-bezier(0.4, 0, 0.2, 1)",
  emphasized: "cubic-bezier(0.2, 0, 0, 1)",
} as const;
```

- [ ] **Step 3: Add CSS custom properties to `globals.css`**

At the top of `src/app/globals.css`, add:

```css
:root {
  --bg: #0b1220;
  --bg-card: #0f1830;
  --border: #1d2a44;
  --text: #e6edf7;
  --text-dim: #a9b7d1;
  --text-muted: #8aa0c7;
  --accent: #7dd3fc;
  --accent-cta: #2563eb;
  --warm: #b45309;
  --cream: #f7f6f2;
  --pass: #34d399;
  --med: #f59e0b;
  --high: #ef4444;
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-emphasized: cubic-bezier(0.2, 0, 0, 1);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 4: Re-run tests**

Run: `npm test -- tokens` → passes.

- [ ] **Step 5: Commit**

```bash
git add src/components/tokens.ts src/__tests__/tokens.test.ts src/app/globals.css
git commit -m "feat(lander): add design tokens + reduced-motion reset"
```

---

## Task 2: `useReducedMotion` hook

**Files:**
- Create: `src/hooks/useReducedMotion.ts`, `src/__tests__/useReducedMotion.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

describe("useReducedMotion", () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((q: string) => ({
      matches: q === "(prefers-reduced-motion: reduce)",
      media: q, onchange: null,
      addEventListener: vi.fn(), removeEventListener: vi.fn(),
      addListener: vi.fn(), removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it("returns true when user prefers reduced motion", () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });
});
```

Run: `npm test -- useReducedMotion` → fails.

- [ ] **Step 2: Create the hook**

```ts
"use client";
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}
```

- [ ] **Step 3: Run test** → passes.

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useReducedMotion.ts src/__tests__/useReducedMotion.test.tsx
git commit -m "feat(lander): add useReducedMotion hook"
```

---

## Task 3: Findings + framework + comparison data

**Files:**
- Create: `src/data/findings.ts`, `src/data/frameworks.ts`, `src/data/comparison.ts`
- Create: `src/__tests__/data.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest";
import { findings } from "@/data/findings";
import { frameworks } from "@/data/frameworks";
import { comparisonRows } from "@/data/comparison";

describe("data", () => {
  it("has at least 6 findings", () => {
    expect(findings.length).toBeGreaterThanOrEqual(6);
    findings.forEach(f => {
      expect(f.severity).toMatch(/^(HIGH|MED|PASS)$/);
      expect(f.title).toBeTruthy();
      expect(f.controlRef).toBeTruthy();
    });
  });

  it("has 3 frameworks with control counts", () => {
    expect(frameworks).toHaveLength(3);
    frameworks.forEach(f => {
      expect(f.total).toBeGreaterThan(0);
      expect(f.automated).toBeLessThanOrEqual(f.total);
      expect(f.sampleControls.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("has 5 comparison rows", () => {
    expect(comparisonRows).toHaveLength(5);
  });
});
```

Run: `npm test -- data` → fails.

- [ ] **Step 2: Create `src/data/findings.ts`**

```ts
export type Severity = "HIGH" | "MED" | "PASS";
export type Finding = { id: string; severity: Severity; title: string; controlRef: string };

export const findings: Finding[] = [
  { id: "s3-public", severity: "HIGH", title: "S3 public bucket", controlRef: "DPDP §8(5)" },
  { id: "iam-key", severity: "MED", title: "IAM key age 127d", controlRef: "SOC 2 CC6.1" },
  { id: "rds-enc", severity: "MED", title: "RDS unencrypted", controlRef: "ISO A.8.24" },
  { id: "cloudtrail", severity: "PASS", title: "CloudTrail on", controlRef: "SOC 2 CC7.2" },
  { id: "sg-open", severity: "HIGH", title: "Security group 0.0.0.0/0", controlRef: "DPDP §8(5)" },
  { id: "alarm-missing", severity: "MED", title: "CloudWatch alarms missing", controlRef: "SOC 2 CC7.2" },
];
```

- [ ] **Step 3: Create `src/data/frameworks.ts`**

```ts
export type Framework = {
  id: "dpdp" | "soc2" | "iso27001";
  name: string;
  total: number;
  automated: number;
  sampleControls: { id: string; label: string }[];
};

export const frameworks: Framework[] = [
  { id: "dpdp", name: "DPDP Act", total: 94, automated: 67, sampleControls: [
    { id: "DPDP §8(5)", label: "Reasonable security safeguards" },
    { id: "DPDP §10", label: "Breach notification" },
    { id: "DPDP §11", label: "Rights of data principal" },
  ]},
  { id: "soc2", name: "SOC 2", total: 120, automated: 89, sampleControls: [
    { id: "SOC 2 CC6.1", label: "Logical access controls" },
    { id: "SOC 2 CC7.2", label: "System monitoring" },
    { id: "SOC 2 CC8.1", label: "Change management" },
  ]},
  { id: "iso27001", name: "ISO 27001", total: 93, automated: 71, sampleControls: [
    { id: "ISO A.8.3", label: "Information access restriction" },
    { id: "ISO A.8.24", label: "Cryptography" },
    { id: "ISO A.5.23", label: "Cloud services" },
  ]},
];
```

- [ ] **Step 4: Create `src/data/comparison.ts`**

```ts
export type ComparisonRow = { dimension: string; vanta: string; compli: string; compliWins: boolean };

export const comparisonRows: ComparisonRow[] = [
  { dimension: "DPDP Act coverage", vanta: "Not offered", compli: "Native, day-1", compliWins: true },
  { dimension: "Data residency", vanta: "US-only", compli: "ap-south-1, India", compliWins: true },
  { dimension: "Pricing", vanta: "USD, US-scale", compli: "INR, India-scale", compliWins: true },
  { dimension: "Indian auditor network", vanta: "None", compli: "Partnered with CERT-In listed auditors", compliWins: true },
  { dimension: "Support timezone", vanta: "US business hours", compli: "IST, 24×5", compliWins: true },
];
```

- [ ] **Step 5: Run tests** → pass.

- [ ] **Step 6: Commit**

```bash
git add src/data src/__tests__/data.test.ts
git commit -m "feat(lander): add findings, frameworks, comparison data"
```

---

## Task 4: `TopNav` component

**Files:**
- Create: `src/components/TopNav.tsx`, `src/__tests__/TopNav.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TopNav } from "@/components/TopNav";

describe("TopNav", () => {
  it("renders brand + all nav links + CTA", () => {
    render(<TopNav />);
    expect(screen.getByText("compli.in")).toBeInTheDocument();
    ["Product", "Frameworks", "Pricing", "Blog"].forEach(l =>
      expect(screen.getByRole("link", { name: l })).toBeInTheDocument(),
    );
    expect(screen.getByRole("link", { name: /request early access/i })).toBeInTheDocument();
  });

  it("is a nav landmark", () => {
    render(<TopNav />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
```

Run: `npm test -- TopNav` → fails.

- [ ] **Step 2: Implement `TopNav`**

```tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-colors ${
        scrolled ? "bg-[color:var(--bg)]/90 backdrop-blur border-b border-[color:var(--border)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 text-sm">
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-[15px] tracking-tight text-[color:var(--text)]">
          <span className="w-[22px] h-[22px] rounded-md grid place-items-center bg-[color:var(--accent-cta)] text-white text-xs font-bold">C</span>
          compli.in
        </Link>
        <div className="flex items-center gap-7 text-[color:var(--text-dim)]">
          <Link href="#product">Product</Link>
          <Link href="#frameworks">Frameworks</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="/blog">Blog</Link>
          <Link href="#early-access" className="bg-[color:var(--accent-cta)] text-white px-3.5 py-1.5 rounded-md font-medium">
            Request Early Access
          </Link>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 3: Run tests** → pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/TopNav.tsx src/__tests__/TopNav.test.tsx
git commit -m "feat(lander): add TopNav component"
```

---

## Task 5: `FindingsTicker` component

**Files:**
- Create: `src/components/FindingsTicker.tsx`, `src/__tests__/FindingsTicker.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { FindingsTicker } from "@/components/FindingsTicker";
import { findings } from "@/data/findings";

describe("FindingsTicker", () => {
  it("renders the initial 4 findings", () => {
    render(<FindingsTicker findings={findings} />);
    for (let i = 0; i < 4; i++) expect(screen.getByText(findings[i].title)).toBeInTheDocument();
  });

  it("cycles to the next finding after the interval", () => {
    vi.useFakeTimers();
    render(<FindingsTicker findings={findings} intervalMs={1000} />);
    expect(screen.queryByText(findings[4].title)).not.toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1100); });
    expect(screen.getByText(findings[4].title)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("has an sr-only description for screen readers", () => {
    render(<FindingsTicker findings={findings} />);
    expect(screen.getByText(/live scan example/i)).toBeInTheDocument();
  });
});
```

Run: `npm test -- FindingsTicker` → fails.

- [ ] **Step 2: Implement `FindingsTicker`**

```tsx
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
```

- [ ] **Step 3: Run tests** → pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/FindingsTicker.tsx src/__tests__/FindingsTicker.test.tsx
git commit -m "feat(lander): add FindingsTicker component"
```

---

## Task 6: `HeroLive` component

**Files:**
- Create: `src/components/HeroLive.tsx`, `src/__tests__/HeroLive.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroLive } from "@/components/HeroLive";

describe("HeroLive", () => {
  it("renders headline + subhead + CTAs", () => {
    render(<HeroLive />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/compliance score/i);
    expect(screen.getByText(/before your auditor/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /request early access/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see a live scan/i })).toBeInTheDocument();
  });

  it("renders the live-status pill", () => {
    render(<HeroLive />);
    expect(screen.getByText(/14 orgs scanning right now/i)).toBeInTheDocument();
  });

  it("mounts the findings ticker", () => {
    render(<HeroLive />);
    expect(screen.getByText(/live scan · acme-prod/i)).toBeInTheDocument();
  });
});
```

Run: `npm test -- HeroLive` → fails.

- [ ] **Step 2: Implement `HeroLive`**

```tsx
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
```

- [ ] **Step 3: Run tests** → pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroLive.tsx src/__tests__/HeroLive.test.tsx
git commit -m "feat(lander): add HeroLive section"
```

---

## Task 7: `FrameworkPanel` component

**Files:**
- Create: `src/components/FrameworkPanel.tsx`, `src/__tests__/FrameworkPanel.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FrameworkPanel } from "@/components/FrameworkPanel";

describe("FrameworkPanel", () => {
  it("renders 3 framework cards", () => {
    render(<FrameworkPanel highlightedControl={null} />);
    ["DPDP Act", "SOC 2", "ISO 27001"].forEach(n =>
      expect(screen.getByText(n)).toBeInTheDocument(),
    );
  });

  it("highlights a control when prop matches", () => {
    const { container } = render(<FrameworkPanel highlightedControl="DPDP §8(5)" />);
    const highlighted = container.querySelector('[data-control-id="DPDP §8(5)"]');
    expect(highlighted).toHaveAttribute("data-highlighted", "true");
  });

  it("shows control counts", () => {
    render(<FrameworkPanel highlightedControl={null} />);
    expect(screen.getByText(/94/)).toBeInTheDocument();
    expect(screen.getByText(/67 automated/)).toBeInTheDocument();
  });
});
```

Run: `npm test -- FrameworkPanel` → fails.

- [ ] **Step 2: Implement `FrameworkPanel`**

```tsx
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
```

- [ ] **Step 3: Run tests** → pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/FrameworkPanel.tsx src/__tests__/FrameworkPanel.test.tsx
git commit -m "feat(lander): add FrameworkPanel component"
```

---

## Task 8: `ScanMockDashboard` component

**Files:**
- Create: `src/components/ScanMockDashboard.tsx`, `src/__tests__/ScanMockDashboard.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScanMockDashboard } from "@/components/ScanMockDashboard";

describe("ScanMockDashboard", () => {
  it("renders the CLI line at step 0", () => {
    render(<ScanMockDashboard step={0} />);
    expect(screen.getByText(/compli connect --provider aws/i)).toBeInTheDocument();
  });

  it("shows the scan finding detail at step 3", () => {
    render(<ScanMockDashboard step={3} />);
    expect(screen.getByText(/S3 public bucket/i)).toBeInTheDocument();
    expect(screen.getByText(/DPDP §8\(5\)/)).toBeInTheDocument();
  });

  it("shows score 78 at step 5", () => {
    render(<ScanMockDashboard step={5} />);
    expect(screen.getByText("78")).toBeInTheDocument();
  });
});
```

Run: `npm test -- ScanMockDashboard` → fails.

- [ ] **Step 2: Implement `ScanMockDashboard`**

```tsx
"use client";

export function ScanMockDashboard({ step }: { step: 0 | 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-card)] p-5 h-full">
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
              <span className="text-[10px] text-[color:var(--text-muted)]">aws-s3</span>
            </div>
            <div className="text-sm text-[color:var(--text)] mt-1">S3 public bucket</div>
            <code className="text-xs bg-[color:var(--bg)] px-1.5 py-0.5 rounded">customer-exports</code>
            {step >= 4 && (
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {["DPDP §8(5)", "SOC 2 CC6.1", "ISO A.8.3"].map(c => (
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
```

- [ ] **Step 3: Run tests** → pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/ScanMockDashboard.tsx src/__tests__/ScanMockDashboard.test.tsx
git commit -m "feat(lander): add ScanMockDashboard component"
```

---

## Task 9: `SeeItCatch` — merged scan + frameworks section

**Files:**
- Create: `src/components/SeeItCatch.tsx`, `src/__tests__/SeeItCatch.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { SeeItCatch } from "@/components/SeeItCatch";

describe("SeeItCatch", () => {
  it("renders the merged heading", () => {
    render(<SeeItCatch />);
    expect(screen.getByRole("heading", { name: /see exactly what we catch/i })).toBeInTheDocument();
  });

  it("mounts both panels", () => {
    render(<SeeItCatch />);
    expect(screen.getByText("DPDP Act")).toBeInTheDocument();
    expect(screen.getByText("SOC 2")).toBeInTheDocument();
    expect(screen.getByText("ISO 27001")).toBeInTheDocument();
  });

  it("advances steps over time and highlights a control", () => {
    vi.useFakeTimers();
    const { container } = render(<SeeItCatch />);
    act(() => { vi.advanceTimersByTime(9000); });
    const el = container.querySelector('[data-control-id="DPDP §8(5)"]');
    expect(el).toHaveAttribute("data-highlighted", "true");
    vi.useRealTimers();
  });
});
```

Run: `npm test -- SeeItCatch` → fails.

- [ ] **Step 2: Implement `SeeItCatch`**

```tsx
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
  { step: 4, at: 8000,  highlight: "DPDP §8(5)" },
  { step: 4, at: 8500,  highlight: "SOC 2 CC6.1" },
  { step: 4, at: 9000,  highlight: "ISO A.8.3" },
  { step: 5, at: 10500, highlight: "ISO A.8.3" },
];
const TOTAL = 12000;

export function SeeItCatch() {
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(reduced ? TIMELINE.length - 1 : 0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIdx(prev => (prev + 1) % TIMELINE.length);
    }, 1500);
    return () => clearInterval(id);
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
```

- [ ] **Step 3: Run tests** → pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/SeeItCatch.tsx src/__tests__/SeeItCatch.test.tsx
git commit -m "feat(lander): add SeeItCatch merged section"
```

---

## Task 10: `IndiaComparison` table

**Files:**
- Create: `src/components/IndiaComparison.tsx`, `src/__tests__/IndiaComparison.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { IndiaComparison } from "@/components/IndiaComparison";

describe("IndiaComparison", () => {
  it("is a table with a caption", () => {
    render(<IndiaComparison />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText(/vanta or drata/i)).toBeInTheDocument();
  });

  it("has all 5 dimension rows", () => {
    render(<IndiaComparison />);
    ["DPDP Act coverage", "Data residency", "Pricing", "Indian auditor network", "Support timezone"]
      .forEach(d => expect(screen.getByText(d)).toBeInTheDocument());
  });
});
```

Run: `npm test -- IndiaComparison` → fails.

- [ ] **Step 2: Implement `IndiaComparison`**

```tsx
import { comparisonRows } from "@/data/comparison";

export function IndiaComparison() {
  return (
    <section className="bg-[color:var(--cream)] text-[#0b1220] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--warm)] font-semibold mb-4">
          Why India needs its own platform
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-5">Built here, for here.</h2>
        <p className="text-slate-700 max-w-2xl mb-10 leading-relaxed">
          Vanta and Drata were built for US startups. The DPDP Act is not a checkbox you add on — it needs a platform that starts from Indian regulation and extends outward.
        </p>
        <table className="w-full text-left border-collapse">
          <caption className="sr-only">Compli versus Vanta or Drata comparison</caption>
          <thead>
            <tr className="border-b border-slate-300">
              <th scope="col" className="py-3 font-semibold">Dimension</th>
              <th scope="col" className="py-3 font-semibold">Vanta or Drata</th>
              <th scope="col" className="py-3 font-semibold">Compli</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map(r => (
              <tr key={r.dimension} className="border-b border-slate-200">
                <td className="py-4 font-medium">{r.dimension}</td>
                <td className="py-4 text-slate-600">{r.vanta}</td>
                <td className="py-4 text-[#0b1220] font-medium">{r.compli}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run tests** → pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/IndiaComparison.tsx src/__tests__/IndiaComparison.test.tsx
git commit -m "feat(lander): add IndiaComparison section"
```

---

## Task 11: `HowItWorksNew` section

**Files:**
- Create: `src/components/HowItWorksNew.tsx`, `src/__tests__/HowItWorksNew.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HowItWorksNew } from "@/components/HowItWorksNew";

describe("HowItWorksNew", () => {
  it("renders 3 numbered steps", () => {
    render(<HowItWorksNew />);
    expect(screen.getByText(/connect your cloud/i)).toBeInTheDocument();
    expect(screen.getByText(/continuous scans/i)).toBeInTheDocument();
    expect(screen.getByText(/live posture/i)).toBeInTheDocument();
  });
});
```

Run: `npm test -- HowItWorksNew` → fails.

- [ ] **Step 2: Implement `HowItWorksNew`**

```tsx
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
```

- [ ] **Step 3: Run tests** → pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/HowItWorksNew.tsx src/__tests__/HowItWorksNew.test.tsx
git commit -m "feat(lander): add HowItWorksNew section"
```

---

## Task 12: `AgenticPreview` section

**Files:**
- Create: `src/components/AgenticPreview.tsx`, `src/__tests__/AgenticPreview.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AgenticPreview } from "@/components/AgenticPreview";

describe("AgenticPreview", () => {
  it("renders the coming-next chip and diff lines", () => {
    render(<AgenticPreview />);
    expect(screen.getByText(/coming next/i)).toBeInTheDocument();
    expect(screen.getByText(/acl = "public-read"/)).toBeInTheDocument();
    expect(screen.getByText(/acl = "private"/)).toBeInTheDocument();
  });
});
```

Run: `npm test -- AgenticPreview` → fails.

- [ ] **Step 2: Implement `AgenticPreview`**

```tsx
export function AgenticPreview() {
  return (
    <section className="bg-[color:var(--bg)] text-[color:var(--text)] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-[11px] uppercase tracking-[0.16em] text-[color:var(--accent)] border border-[#1e3a5f] px-3 py-1 rounded-full mb-4">Coming next</span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">Agentic remediation.</h2>
          <p className="text-[color:var(--text-dim)] max-w-2xl mx-auto">
            Agentic remediation drafts the fix as a pull request, mapped to the same control. Land audit-ready commits without hand-written Terraform hunts.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 rounded-xl overflow-hidden border border-[color:var(--border)]">
          <aside className="md:col-span-2 bg-[color:var(--bg-card)] p-5 text-sm">
            <div className="text-[color:var(--text-muted)] text-xs mb-3">infra/</div>
            <ul className="space-y-1 font-mono text-xs text-[color:var(--text-dim)]">
              <li>main.tf</li>
              <li>iam.tf</li>
              <li className="text-[color:var(--accent)] bg-[#1e3a5f] px-2 py-1 rounded">s3.tf ●</li>
              <li>rds.tf</li>
            </ul>
          </aside>
          <div className="md:col-span-3 bg-[#0a1020] p-5 font-mono text-xs">
            <div className="text-[color:var(--text-muted)] mb-3">s3.tf · diff</div>
            <pre className="whitespace-pre text-[color:var(--text-dim)]">
{`resource "aws_s3_bucket" "exports" {
  bucket = "customer-exports"
`}<span className="text-[#fca5a5]">{`-  acl    = "public-read"`}</span>{`
`}<span className="text-[#86efac]">{`+  acl    = "private"`}</span>{`
}`}
            </pre>
            <button className="mt-4 bg-[color:var(--pass)] text-[#04221a] text-xs font-semibold px-3 py-1.5 rounded">Apply fix →</button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run tests** → pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/AgenticPreview.tsx src/__tests__/AgenticPreview.test.tsx
git commit -m "feat(lander): add AgenticPreview section"
```

---

## Task 13: `EarlyAccessForm`

**Files:**
- Create: `src/components/EarlyAccessForm.tsx`, `src/__tests__/EarlyAccessForm.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";

describe("EarlyAccessForm", () => {
  it("renders email + company + cloud + framework fields", () => {
    render(<EarlyAccessForm />);
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/primary cloud/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /DPDP/i })).toBeInTheDocument();
  });

  it("shows confirmation on submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<EarlyAccessForm onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText(/work email/i), "a@b.com");
    await user.type(screen.getByLabelText(/company/i), "Acme");
    await user.selectOptions(screen.getByLabelText(/primary cloud/i), "aws");
    await user.click(screen.getByRole("button", { name: /request early access/i }));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ email: "a@b.com", company: "Acme", cloud: "aws" }));
    expect(await screen.findByText(/you're on the list/i)).toBeInTheDocument();
  });
});
```

Run: `npm test -- EarlyAccessForm` → fails.

- [ ] **Step 2: Implement `EarlyAccessForm`**

```tsx
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
```

- [ ] **Step 3: Run tests** → pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/EarlyAccessForm.tsx src/__tests__/EarlyAccessForm.test.tsx
git commit -m "feat(lander): add EarlyAccessForm"
```

---

## Task 14: Wire `page.tsx`, update schemas, delete old components

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`
- Delete: `src/components/{Header,Hero,Features,HowItWorks,Frameworks,Agentic,ComingSoon}.tsx`
- Create: `src/__tests__/page.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders nav + hero + see-it-catch + comparison + how-it-works + agentic + early-access", () => {
    render(<Home />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/compliance score/i);
    expect(screen.getByRole("heading", { name: /see exactly what we catch/i })).toBeInTheDocument();
    expect(screen.getByText(/built here, for here/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /how it works/i })).toBeInTheDocument();
    expect(screen.getByText(/agentic remediation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
  });
});
```

Run: `npm test -- page` → fails.

- [ ] **Step 2: Rewrite `src/app/page.tsx`**

```tsx
import { TopNav } from "@/components/TopNav";
import { HeroLive } from "@/components/HeroLive";
import { SeeItCatch } from "@/components/SeeItCatch";
import { IndiaComparison } from "@/components/IndiaComparison";
import { HowItWorksNew } from "@/components/HowItWorksNew";
import { AgenticPreview } from "@/components/AgenticPreview";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Compli",
  url: "https://compli.in",
  description: "DPDP-first cloud compliance automation platform built in India. Continuously scan AWS, Azure, GCP, and Kubernetes against DPDP Act, SOC 2, and ISO 27001 controls.",
  foundingDate: "2026",
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org", "@type": "WebSite", name: "Compli", url: "https://compli.in",
  description: "India's DPDP-first cloud compliance automation platform.",
};

const softwareSchema = {
  "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Compli",
  applicationCategory: "BusinessApplication", operatingSystem: "Web",
  description: "DPDP-first cloud compliance automation. Continuously scan AWS, Azure, GCP, and Kubernetes against DPDP Act, SOC 2, and ISO 27001 controls in real time.",
  offers: { "@type": "Offer", availability: "https://schema.org/InStock", price: "0", priceCurrency: "INR" },
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Is Compli DPDP-compliant?", acceptedAnswer: { "@type": "Answer", text: "Yes — Compli is DPDP-first, with native coverage of the DPDP Act on day one." }},
    { "@type": "Question", name: "Does Compli support SOC 2?", acceptedAnswer: { "@type": "Answer", text: "Yes — SOC 2 is supported alongside DPDP Act and ISO 27001." }},
    { "@type": "Question", name: "Where is data stored?", acceptedAnswer: { "@type": "Answer", text: "Data resides in AWS ap-south-1 (Mumbai, India) by default." }},
    { "@type": "Question", name: "Do you integrate with Indian auditors?", acceptedAnswer: { "@type": "Answer", text: "Yes — Compli is partnered with CERT-In listed auditors for Indian engagements." }},
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)]">
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <TopNav />
      <main>
        <HeroLive />
        <SeeItCatch />
        <IndiaComparison />
        <HowItWorksNew />
        <AgenticPreview />
        <section className="bg-[color:var(--bg)] py-24 px-6"><EarlyAccessForm /></section>
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 3: Update `layout.tsx` metadata**

Open `src/app/layout.tsx`. Update `title` to `"Compli · DPDP-first cloud compliance for India"` and `description` to `"Continuously scan AWS, Azure, GCP, and Kubernetes against DPDP Act, SOC 2, and ISO 27001. Built in India, for India-first compliance."`.

- [ ] **Step 4: Delete the deprecated components**

```bash
git rm src/components/Header.tsx src/components/Hero.tsx src/components/Features.tsx \
       src/components/HowItWorks.tsx src/components/Frameworks.tsx \
       src/components/Agentic.tsx src/components/ComingSoon.tsx
```

- [ ] **Step 5: Run tests** → all pass.

```bash
npm test
```

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx src/__tests__/page.test.tsx
git commit -m "feat(lander): wire new homepage, FAQ schema, remove legacy components"
```

---

## Task 15: Manual verification + Lighthouse

**Files:** none

- [ ] **Step 1: Run the dev server and open in a browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify the golden path:
- Nav shows logo mark + links + CTA pill; becomes opaque after 40px scroll.
- Hero headline reads correctly; findings ticker cycles smoothly; CTAs are clickable.
- SeeItCatch plays its sequence and the right-side framework control highlights in sync.
- Comparison table is readable on the cream background.
- HowItWorks shows 3 steps with the small visuals rendered.
- AgenticPreview diff shows red/green lines; Apply fix button is visible.
- Form accepts input and shows confirmation.

- [ ] **Step 2: Test reduced motion**

In Chrome DevTools → Rendering → Emulate CSS `prefers-reduced-motion: reduce`. Reload. Confirm: no animations; SeeItCatch shows the final state (score 78, all three controls highlighted).

- [ ] **Step 3: Build check**

```bash
npm run build
```

Expected: build succeeds, no type errors, no console warnings.

- [ ] **Step 4: Lighthouse (mobile, throttled 4G)**

Chrome DevTools → Lighthouse → Mobile → Performance + Accessibility + Best Practices + SEO. Run.
Expected scores: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

If any target is missed, open an issue (don't block the push) and note which metric and suspected cause.

- [ ] **Step 5: Final commit (if anything changed)**

```bash
git status
# If clean, done. If fixes were needed, commit them:
git add -A && git commit -m "chore(lander): Lighthouse/a11y polish"
```

---

## Self-Review

- **Spec coverage:** Nav, hero (option C), merged section 2, comparison, how-it-works, agentic preview, early-access form, footer, visual tokens, reduced-motion, FAQ schema, title/description updates, old-component deletion — each has a task.
- **Placeholders:** none present.
- **Type consistency:** `Finding`, `Framework`, `ComparisonRow`, `Payload` types are defined once and consumed verbatim. `step` prop on `ScanMockDashboard` is `0|1|2|3|4|5`; `TIMELINE` in `SeeItCatch` uses only those values. `highlightedControl` prop is `string | null` both in definition and usage.
