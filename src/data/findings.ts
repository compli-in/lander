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
