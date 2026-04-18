import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { FindingsTicker } from "@/components/FindingsTicker";
import { findings } from "@/data/findings";

describe("FindingsTicker", () => {
  it("renders the initial 4 findings", () => {
    render(<FindingsTicker findings={findings} />);
    for (let i = 0; i < 4; i++) expect(screen.getByText(findings[i].title)).toBeInTheDocument();
  });

  it("cycles to the next finding after the interval", () => {
    vi.useFakeTimers();
    render(<FindingsTicker findings={findings} intervalMs={1000} />);
    expect(screen.queryByText(findings[4].title)).not.toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1100); });
    expect(screen.getByText(findings[4].title)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("has an sr-only description for screen readers", () => {
    render(<FindingsTicker findings={findings} />);
    expect(screen.getByText(/live scan example/i)).toBeInTheDocument();
  });
});
