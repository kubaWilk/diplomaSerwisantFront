import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SingleRepairContext from "../../../context/SingleRepair/SingleRepairContext";
import UserContext from "../../../context/User/UserContext";
import RepairStatus from "../RepairStatus";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    id: "1",
  }),
  useRouteMatch: () => ({ url: "/" }),
}));

//Mock almost ready to be used in integration tests with context,
//however these are only unit tests
const RepairStatusMock = () => {
  const repair = {
    status: "",
  };

  const user = { jwt: "abcd" };
  const id = "1";
  const putRepair = (id, status, token) => {};

  return (
    <SingleRepairContext.Provider
      value={{ repair: repair, putRepair: putRepair }}
    >
      <UserContext.Provider value={{ user: user }}>
        <BrowserRouter>
          <RepairStatus />
        </BrowserRouter>
      </UserContext.Provider>
    </SingleRepairContext.Provider>
  );
};

describe("rendering and testing component's core elements", () => {
  it("renders RepairStatus component", () => {
    render(<RepairStatusMock />);
    const divElement = screen.getByTestId("repairStatusComponent");
    expect(divElement).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<RepairStatusMock />);
    const labelElement = screen.getByText(/Status naprawy/);
    expect(labelElement).toBeInTheDocument();
  });

  it("renders select element", () => {
    render(<RepairStatusMock />);
    const selectElement = screen.getByLabelText(/Status naprawy/);
    expect(selectElement).toBeInTheDocument();
  });

  it("should set correct checked by default option", () => {
    render(<RepairStatusMock />);
    const defaultOption = screen.getByRole("option", {
      name: "W trakcie",
    }).selected;
    expect(defaultOption).toBe(true);
  });

  it("should display correct number of options", () => {
    render(<RepairStatusMock />);
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(4);
  });

  it("should allow user to change repairStatus", () => {
    render(<RepairStatusMock />);
    const selectElement = screen.getByLabelText(/Status naprawy/);
    fireEvent.change(selectElement, {
      target: { value: "Zamknięta" },
    });

    const chosenOption = screen.getByRole("option", { name: "Zamknięta" });

    expect(chosenOption.selected).toBe(true);
  });
});
