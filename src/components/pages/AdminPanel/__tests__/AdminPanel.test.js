import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AdminPanel from "../AdminPanel";

const AdminPanelMock = () => {
  return (
    <BrowserRouter>
      <AdminPanel />
    </BrowserRouter>
  );
};

describe("AdminPanelComponent core elements", () => {
  it("renders whole AdminPanelComponent", () => {
    render(<AdminPanelMock />);
    const divElement = screen.getByTestId("adminPanel");
    expect(divElement).toBeInTheDocument();
  });

  it("contains SectionName", () => {
    render(<AdminPanelMock />);
    const SectionNameElement = screen.getByText(/Panel administratora/);
    expect(SectionNameElement).toBeInTheDocument();
  });

  it("contains Link element to users section", () => {
    render(<AdminPanelMock />);
    const linkElement = screen.getByText(/Zarządzaj użytkownikami/);
    expect(linkElement).toBeInTheDocument();
  });
});
