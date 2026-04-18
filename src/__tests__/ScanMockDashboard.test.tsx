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
