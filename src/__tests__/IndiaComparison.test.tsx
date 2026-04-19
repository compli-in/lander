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
