import { render, screen, act, fireEvent } from "@testing-library/react";
import EditDeviceForm from "../EditDeviceForm";
import AlertState from "../../../../../context/Alert/AlertState";
import UserContext from "../../../../../context/User/UserContext";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { Config } from "../../../../../config";

const deviceId = 1;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    id: deviceId,
  }),
  useNavigate: () => jest.fn(),
  useRouteMatch: () => ({ url: "/" }),
}));

jest.mock("axios");

const EditDeviceFormMock = () => {
  const deviceData = {
    manufacturer: "Lenovo",
    model: "Thinkpad",
    serialNumber: "ASDFASDF",
    stateAtArrival: "good",
  };

  return (
    <BrowserRouter>
      <AlertState>
        <UserContext.Provider value={{ user: { jwt: "testing token" } }}>
          <EditDeviceForm deviceData={deviceData} />
        </UserContext.Provider>
      </AlertState>
    </BrowserRouter>
  );
};

describe("tests EditUserForm rendering", () => {
  it("EditUserForm should render", async () => {
    await act(async () => render(<EditDeviceFormMock />));
    const component = screen.getByTestId("EditDeviceForm");
    expect(component).toBeInTheDocument();
  });

  it("EditUserForm should containt label for manufacturer", async () => {
    await act(async () => render(<EditDeviceFormMock />));
    const labelElement = screen.getByText(/Producent/);
    expect(labelElement).toBeInTheDocument();
  });

  it("EditUserForm should containt input for manufacturer", async () => {
    await act(async () => render(<EditDeviceFormMock />));
    const inputElement = screen.getByLabelText(/Producent/);
    expect(inputElement).toBeInTheDocument();
  });

  it("EditUserForm should containt input for manufacturer with proper placeholder", async () => {
    await act(async () => render(<EditDeviceFormMock />));
    const inputElement = screen.getByLabelText(/Producent/);
    expect(inputElement.placeholder).toBe("Producent");
  });

  it("EditUserForm should containt label for model", async () => {
    await act(async () => render(<EditDeviceFormMock />));
    const labelElement = screen.getByText(/Model/);
    expect(labelElement).toBeInTheDocument();
  });

  it("EditUserForm should containt input for model", async () => {
    await act(async () => render(<EditDeviceFormMock />));
    const inputElement = screen.getByLabelText(/Model/);
    expect(inputElement).toBeInTheDocument();
  });

  it("EditUserForm should containt input for model with proper placeholder", async () => {
    await act(async () => render(<EditDeviceFormMock />));
    const inputElement = screen.getByLabelText(/Model/);
    expect(inputElement.placeholder).toBe("Model");
  });

  it("EditUserForm should containt label for serial number", async () => {
    await act(async () => render(<EditDeviceFormMock />));
    const labelElement = screen.getByText(/Nr seryjny/);
    expect(labelElement).toBeInTheDocument();
  });

  it("EditUserForm should containt input for serial number", async () => {
    await act(async () => render(<EditDeviceFormMock />));
    const inputElement = screen.getByLabelText(/Nr seryjny/);
    expect(inputElement).toBeInTheDocument();
  });

  it("EditUserForm should containt input for serial number with proper placeholder", async () => {
    await act(async () => render(<EditDeviceFormMock />));
    const inputElement = screen.getByLabelText(/Nr seryjny/);
    expect(inputElement.placeholder).toBe("Nr seryjny");
  });

  it("EditUserForm should containt label for state at arrival", async () => {
    await act(async () => render(<EditDeviceFormMock />));
    const labelElement = screen.getByText(/Stan przy przyjęciu/);
    expect(labelElement).toBeInTheDocument();
  });

  it("EditUserForm should containt input for state at arrival", async () => {
    await act(async () => render(<EditDeviceFormMock />));
    const inputElement = screen.getByLabelText(/Stan przy przyjęciu/);
    expect(inputElement).toBeInTheDocument();
  });

  it("EditUserForm should containt input for state at arrival with proper placeholder", async () => {
    await act(async () => render(<EditDeviceFormMock />));
    const inputElement = screen.getByLabelText(/Stan przy przyjęciu/);
    expect(inputElement.placeholder).toBe("Stan przy przyjęciu");
  });

  it("EditUserForm should contain accept button", async () => {
    await act(async () => render(<EditDeviceFormMock />));
    const buttonElement = screen.getByText(/Zapisz/);
    expect(buttonElement).toBeInTheDocument();
  });

  it("EditUserForm should contain cancel button", async () => {
    await act(async () => render(<EditDeviceFormMock />));
    const buttonElement = screen.getByText(/Anuluj/);
    expect(buttonElement).toBeInTheDocument();
  });
});

describe("tests form's input check", () => {
  it("Should not allow user to enter no manufacturer", async () => {
    axios.put.mockResolvedValueOnce({ data: "git" });

    await act(async () => render(<EditDeviceFormMock />));
    const buttonElement = screen.getByText(/Zapisz/);
    let inputElement = screen.getByLabelText(/Producent/);

    await act(async () => {
      fireEvent.change(inputElement, { target: { value: "" } });
      fireEvent.click(buttonElement);
    });

    const errorElement = await screen.findByText(
      /Producent sprzętu nie może być pusty/
    );
    expect(errorElement).toBeInTheDocument();
  });

  it("Should not allow user to enter no model", async () => {
    axios.put.mockResolvedValueOnce({ data: "git" });

    await act(async () => render(<EditDeviceFormMock />));
    const buttonElement = screen.getByText(/Zapisz/);
    let inputElement = screen.getByLabelText(/Model/);

    await act(async () => {
      fireEvent.change(inputElement, { target: { value: "" } });
      fireEvent.click(buttonElement);
    });

    const errorElement = await screen.findByText(
      /Model sprzętu nie może być pusty/
    );
    expect(errorElement).toBeInTheDocument();
  });
});

describe("tests EditDeviceForm interaction with api", () => {
  it("api request should send data user entered", async () => {
    const mockData = {
      manufacturer: "Lenovo",
      model: "Thinkpad",
      serialNumber: "ASDFASDF",
      stateAtArrival: "good",
    };

    await act(async () => {
      render(<EditDeviceFormMock />);
    });

    const manufacturerInput = screen.getByLabelText(/Producent/);
    const modelInput = screen.getByLabelText(/Model/);
    const snInput = screen.getByLabelText(/Nr seryjny/);
    const stateInput = screen.getByLabelText(/Stan przy przyjęciu/);
    const postButton = screen.getByText(/Zapisz/);

    await act(async () => {
      fireEvent.change(manufacturerInput, {
        target: { value: mockData.manufacturer },
      });
      fireEvent.change(modelInput, {
        target: { value: mockData.model },
      });
      fireEvent.change(snInput, {
        target: { value: mockData.serialNumber },
      });
      fireEvent.change(stateInput, {
        target: { value: mockData.stateAtArrival },
      });
      axios.put.mockResolvedValueOnce({ data: "git" });

      //Save Button Click
      fireEvent.click(postButton);
    });

    expect(axios.put).toHaveBeenCalledWith(
      `${Config.apiUrl}/api/devices/${deviceId}`,
      {
        data: {
          manufacturer: mockData.manufacturer,
          model: mockData.model,
          serialNumber: mockData.serialNumber,
          stateAtArrival: mockData.stateAtArrival,
        },
      },
      {
        headers: {
          Authorization: `Bearer testing token`,
        },
      }
    );
  });
});
