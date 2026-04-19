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
