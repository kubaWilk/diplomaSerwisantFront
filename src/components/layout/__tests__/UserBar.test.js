import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserBar from "../UserBar";

const UserBarMock = () => {
  const mockUser = {
    firstName: "Andrzej",
    lastName: "Nowak",
  };

  let hasLoggetOut = false;

  return (
    <BrowserRouter>
      <UserBar
        user={mockUser}
        role="Administrator"
        onLogout={() => {
          hasLoggetOut = true;
        }}
      />
    </BrowserRouter>
  );
};

describe("tests UserBar", () => {
  it("renders with proper user's name", () => {
    render(<UserBarMock />);
    const divElement = screen.getByText(/Andrzej Nowak/);
    expect(divElement).toBeInTheDocument();
  });

  it("renders user's fake avatar", () => {
    render(<UserBarMock />);
    const divElement = screen.getByTestId("avatar");
    expect(divElement).toBeInTheDocument();
  });

  it("checks if fake avatar has proper initials", () => {
    render(<UserBarMock />);
    const divElement = screen.getByText(/AN/);
    expect(divElement).toBeInTheDocument();
  });

  it("renders role", () => {
    render(<UserBarMock />);
    const divElement = screen.getByText(/Administrator/);
    expect(divElement).toBeInTheDocument();
  });
});
