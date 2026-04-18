import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { SeeItCatch } from "@/components/SeeItCatch";

describe("SeeItCatch", () => {
  it("renders the merged heading", () => {
    render(<SeeItCatch />);
    expect(screen.getByRole("heading", { name: /see exactly what we catch/i })).toBeInTheDocument();
  });

  it("mounts both panels", () => {
    render(<SeeItCatch />);
    expect(screen.getByText("DPDP Act")).toBeInTheDocument();
    expect(screen.getByText("SOC 2")).toBeInTheDocument();
    expect(screen.getByText("ISO 27001")).toBeInTheDocument();
  });

  it("advances steps over time and highlights a control", () => {
    vi.useFakeTimers();
    const { container } = render(<SeeItCatch />);
    act(() => { vi.advanceTimersByTime(9000); });
    const el = container.querySelector('[data-control-id="DPDP §8(5)"]');
    expect(el).toHaveAttribute("data-highlighted", "true");
    vi.useRealTimers();
  });
});
