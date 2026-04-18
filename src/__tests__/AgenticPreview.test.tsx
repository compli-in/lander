import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AgenticPreview } from "@/components/AgenticPreview";

describe("AgenticPreview", () => {
  it("renders the coming-next chip and diff lines", () => {
    render(<AgenticPreview />);
    expect(screen.getByText(/coming next/i)).toBeInTheDocument();
    expect(screen.getByText(/acl = "public-read"/)).toBeInTheDocument();
    expect(screen.getByText(/acl = "private"/)).toBeInTheDocument();
  });
});
