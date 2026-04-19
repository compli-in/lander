import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroLive } from "@/components/HeroLive";

describe("HeroLive", () => {
  it("renders headline + subhead + CTAs", () => {
    render(<HeroLive />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/compliance score/i);
    expect(screen.getByText(/before your auditor/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /request early access/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see a live scan/i })).toBeInTheDocument();
  });

  it("renders the live-status pill", () => {
    render(<HeroLive />);
    expect(screen.getByText(/14 orgs scanning right now/i)).toBeInTheDocument();
  });

  it("mounts the findings ticker", () => {
    render(<HeroLive />);
    expect(screen.getByText(/live scan · acme-prod/i)).toBeInTheDocument();
  });
});
