import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AlertContext from "../../../context/Alert/AlertContext";
import Loading from "../Loading";

const MockLink = () => {
  return (
    <BrowserRouter>
      <AlertContext.Provider value={{ message: "" }}>
        <Loading />
      </AlertContext.Provider>
    </BrowserRouter>
  );
};

test("renders Loading", () => {
  render(<MockLink />);
  const divElement = screen.getByText(/ładowanie/);
  expect(divElement).toBeInTheDocument();
});
