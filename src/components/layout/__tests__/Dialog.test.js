import { render, screen } from "@testing-library/react";
import Dialog from "../Dialog";

describe("Dialog tests", () => {
  it("Dialog contains heading with default prompt", () => {
    render(<Dialog onApprove={() => {}} onCancel={() => {}} />);
    const headingElement = screen.getByTestId("heading");
    expect(headingElement).toHaveTextContent("Potwierdź operację");
  });

  it("Dialog contains paragraph with default prompt", () => {
    render(<Dialog onApprove={() => {}} onCancel={() => {}} />);
    const paragraphElement = screen.getByTestId("paragraph");
    expect(paragraphElement).toHaveTextContent("Potwierdź operację");
  });

  it("Dialog contains approve button with default text", () => {
    render(<Dialog onApprove={() => {}} onCancel={() => {}} />);
    const approveButton = screen.getByText(/Tak/);
    expect(approveButton).toBeInTheDocument();
  });

  it("Dialog contains cancel button with default text", () => {
    render(<Dialog onApprove={() => {}} onCancel={() => {}} />);
    const cancelButton = screen.getByText(/Nie/);
    expect(cancelButton).toBeInTheDocument();
  });
});
