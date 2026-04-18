import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TopNav } from "@/components/TopNav";

describe("TopNav", () => {
  it("renders brand + all nav links + CTA", () => {
    render(<TopNav />);
    expect(screen.getByText("compli.in")).toBeInTheDocument();
    ["Product", "Frameworks", "Pricing", "Blog"].forEach(l =>
      expect(screen.getByRole("link", { name: l })).toBeInTheDocument(),
    );
    expect(screen.getByRole("link", { name: /request early access/i })).toBeInTheDocument();
  });

  it("is a nav landmark", () => {
    render(<TopNav />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
