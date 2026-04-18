import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";

describe("EarlyAccessForm", () => {
  it("renders email + company + cloud + framework fields", () => {
    render(<EarlyAccessForm />);
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/primary cloud/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /DPDP/i })).toBeInTheDocument();
  });

  it("shows confirmation on submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<EarlyAccessForm onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText(/work email/i), "a@b.com");
    await user.type(screen.getByLabelText(/company/i), "Acme");
    await user.selectOptions(screen.getByLabelText(/primary cloud/i), "aws");
    await user.click(screen.getByRole("button", { name: /request early access/i }));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ email: "a@b.com", company: "Acme", cloud: "aws" }));
    expect(await screen.findByText(/you're on the list/i)).toBeInTheDocument();
  });
});
