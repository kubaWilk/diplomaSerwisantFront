import { render, screen } from "@testing-library/react";
import AddButton from "../AddButton";

describe("test AddButton", () => {
  it("renders AddButton", () => {
    render(<AddButton onClick={() => {}} />);
    const divElement = screen.getByTestId("addButton");
    expect(divElement).toBeInTheDocument();
  });

  it("checks if icon is present in the document", () => {
    render(<AddButton onClick={() => {}} />);
    const iconElement = screen.getByTestId("addButtonIcon");
    expect(iconElement).toBeInTheDocument();
  });
});
