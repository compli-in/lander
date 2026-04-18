import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders nav + hero + see-it-catch + comparison + how-it-works + agentic + early-access", () => {
    render(<Home />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/compliance score/i);
    expect(screen.getByRole("heading", { name: /see exactly what we catch/i })).toBeInTheDocument();
    expect(screen.getByText(/built here, for here/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /how it works/i })).toBeInTheDocument();
    expect(screen.getByText(/agentic remediation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
  });
});
