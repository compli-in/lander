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
