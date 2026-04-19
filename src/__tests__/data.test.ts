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
