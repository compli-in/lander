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
