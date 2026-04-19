export type ComparisonRow = { dimension: string; vanta: string; compli: string; compliWins: boolean };

export const comparisonRows: ComparisonRow[] = [
  { dimension: "DPDP Act coverage", vanta: "Not offered", compli: "Native, day-1", compliWins: true },
  { dimension: "Data residency", vanta: "US-only", compli: "ap-south-1, India", compliWins: true },
  { dimension: "Pricing", vanta: "USD, US-scale", compli: "INR, India-scale", compliWins: true },
  { dimension: "Indian auditor network", vanta: "None", compli: "Partnered with CERT-In listed auditors", compliWins: true },
  { dimension: "Support timezone", vanta: "US business hours", compli: "IST, 24×5", compliWins: true },
];
