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
