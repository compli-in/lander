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
