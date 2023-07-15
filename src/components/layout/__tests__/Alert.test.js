import { render, screen } from "@testing-library/react";
import AlertContext from "../../../context/Alert/AlertContext";
import Alert from "../Alert";

const MockComponent = () => {
  return (
    <AlertContext.Provider value={{ message: "testMessage" }}>
      <Alert />
    </AlertContext.Provider>
  );
};

test("renders Alert", () => {
  render(<MockComponent />);
  const divElement = screen.getByText(/testMessage/);
  expect(divElement).toBeInTheDocument();
});
