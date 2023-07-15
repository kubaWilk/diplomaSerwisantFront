import { screen, render, act } from "@testing-library/react";
import UserContext from "../../../../../context/User/UserContext";
import DeviceSummary from "../DeviceSummary";
import { Config } from "../../../../../config";
import axios from "axios";
import AlertState from "../../../../../context/Alert/AlertState";

const deviceId = 1;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    id: deviceId,
  }),
  useRouteMatch: () => ({ url: "/" }),
}));

jest.mock("axios");

const DeviceSummaryMock = () => {
  return (
    <UserContext.Provider value={{ user: { jwt: "testingToken" } }}>
      <AlertState>
        <DeviceSummary />
      </AlertState>
    </UserContext.Provider>
  );
};

beforeEach(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

describe("tests DeviceSummary api calls", () => {
  it("DeviceSummary makes get request for data to render", async () => {
    const device = {
      id: 1,
      manufacturer: "Lenovo",
      model: "Thinkpad",
      serialNumber: "ASDFGH123",
      stateAtArrival: "good",
    };

    axios.get.mockResolvedValueOnce({ data: device });

    await act(async () => render(<DeviceSummaryMock />));

    expect(axios.get).toHaveBeenCalledWith(
      `${Config.apiUrl}/api/devices/${deviceId}?populate=*`,
      {
        headers: {
          Authorization: `Bearer testingToken`,
        },
      }
    );
  });

  it("DeviceSummary shows Loading on error from api", async () => {
    const device = {
      id: 1,
      manufacturer: "Lenovo",
      model: "Thinkpad",
      serialNumber: "ASDFGH123",
      stateAtArrival: "good",
    };
    axios.get.mockRejectedValueOnce("testing error");

    await act(async () => render(<DeviceSummaryMock />));

    const loadingElement = screen.getByText(/Trwa ładowanie/);
    expect(loadingElement).toBeInTheDocument();
  });
});

describe("renders DeviceSummary", () => {
  beforeEach(() => {
    const device = {
      id: 1,
      manufacturer: "Lenovo",
      model: "Thinkpad",
      serialNumber: "ASDFGH123",
      stateAtArrival: "good",
    };

    axios.get.mockResolvedValueOnce({ data: device });
  });

  it("DeviceSummary contains main ul container", async () => {
    await act(async () => render(<DeviceSummaryMock />));
    const ulElement = screen.getByTestId("DeviceSummaryMainUl");
    expect(ulElement).toBeInTheDocument();
  });

  it("DeviceSummary contains device ID", async () => {
    await act(async () => render(<DeviceSummaryMock />));
    const idElement = screen.getByText(1);
    expect(idElement).toBeInTheDocument();
  });

  it("DeviceSummary contains device manufacturer", async () => {
    await act(async () => render(<DeviceSummaryMock />));
    const manufacturerElement = screen.getByText(/Lenovo/);
    expect(manufacturerElement).toBeInTheDocument();
  });

  it("DeviceSummary contains device model", async () => {
    await act(async () => render(<DeviceSummaryMock />));
    const modelElement = screen.getByText(/Thinkpad/);
    expect(modelElement).toBeInTheDocument();
  });

  it("DeviceSummary contains device serial number", async () => {
    await act(async () => render(<DeviceSummaryMock />));
    const snElement = screen.getByText(/ASDFGH123/);
    expect(snElement).toBeInTheDocument();
  });

  it("DeviceSummary contains device state at arrival", async () => {
    await act(async () => render(<DeviceSummaryMock />));
    const stateAtArrivalElement = screen.getByText(/good/);
    expect(stateAtArrivalElement).toBeInTheDocument();
  });
});
