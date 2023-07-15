import { render, screen, act, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AddRepair from "../AddRepair";
import AlertState from "../../../../../context/Alert/AlertState";
import SingleRepairState from "../../../../../context/SingleRepair/SingleRepairState";
import UserState from "../../../../../context/User/UserState";
import axios from "axios";
import { Config } from "../../../../../config";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useNavigate: () => jest.fn(),
}));

jest.mock("axios");

const postRepairResponseMock = {
  data: "test",
};

const postDeviceReponseMock = {
  data: {
    data: {
      id: 1,
    },
  },
};

const postUserResponseMock = {
  data: {
    username: "test.test",
    id: 1,
  },
};

const userStateMock = {
  jwt: "testingToken",
};

const AddRepairMock = () => {
  return (
    <BrowserRouter>
      <AlertState>
        <UserState>
          <SingleRepairState>
            <AddRepair />
          </SingleRepairState>
        </UserState>
      </AlertState>
    </BrowserRouter>
  );
};

describe("tests onSubmit method in AddRepair", () => {
  //only to be called after rendering a component in a test!
  const fillInput = async () => {
    const firstName = screen.getByLabelText(/Imię/);
    const lastName = screen.getByLabelText(/Nazwisko/);
    const eMail = screen.getByLabelText(/E - Mail/);
    const phoneNumber = screen.getByLabelText(/Nr telefonu/);
    const street = screen.getByLabelText(/Ulica/);
    const postCode = screen.getByLabelText(/Kod pocztowy/);
    const city = screen.getByLabelText(/Miasto/);
    const manufacturer = screen.getByLabelText(/Producent/);
    const model = screen.getByLabelText(/Model/);
    const serialNumber = screen.getByLabelText(/Nr seryjny/);
    const stateAtArrival = screen.getByLabelText(/Stan przy przyjęciu/);
    const newCustomer = screen.getByTestId("newCustomerSelect");
    const newDevice = screen.getByTestId("newDeviceSelect");

    await act(async () => {
      fireEvent.change(firstName, { target: { value: "Andrzej" } });
      fireEvent.change(lastName, { target: { value: "Nowak" } });
      fireEvent.change(eMail, { target: { value: "test@test.com" } });
      fireEvent.change(phoneNumber, { target: { value: "123123123" } });
      fireEvent.change(street, { target: { value: "Miejska 2" } });
      fireEvent.change(postCode, { target: { value: "00-001" } });
      fireEvent.change(city, { target: { value: "Warszawa" } });
      fireEvent.change(manufacturer, { target: { value: "Lenovo" } });
      fireEvent.change(model, { target: { value: "Thinkpad" } });
      fireEvent.change(serialNumber, { target: { value: "123123ASD" } });
      fireEvent.change(stateAtArrival, { target: { value: "good" } });
      fireEvent.select(newCustomer);
      fireEvent.select(newDevice);
    });
  };

  describe("tests checkInput", () => {
    it("should show alert on empty customer's firstName", async () => {
      await act(async () => {
        render(<AddRepairMock />);
      });

      const submitButton = screen.getByText(/Dodaj naprawę/);
      const testedInput = screen.getByLabelText(/Imię/);

      await act(async () => {
        await fillInput();
        fireEvent.change(testedInput, { target: { value: "" } });
        fireEvent.click(submitButton);
      });
      const alertOnEmptyFirstName = screen.getByText(/Nieprawidłowe Imię/);
      expect(alertOnEmptyFirstName).toBeInTheDocument();
    });

    it("should show alert on empty customer's lastName", async () => {
      await act(async () => {
        render(<AddRepairMock />);
      });

      const submitButton = screen.getByText(/Dodaj naprawę/);
      const testedInput = screen.getByLabelText(/Nazwisko/);

      await act(async () => {
        await fillInput();
        fireEvent.change(testedInput, { target: { value: "" } });
        fireEvent.click(submitButton);
      });

      const alertOnEmptyFirstName = screen.getByText(/Nieprawidłowe Nazwisko/);
      expect(alertOnEmptyFirstName).toBeInTheDocument();
    });

    it("should show alert on empty customer's phoneNumber", async () => {
      await act(async () => {
        render(<AddRepairMock />);
      });

      const submitButton = screen.getByText(/Dodaj naprawę/);
      const testedInput = screen.getByLabelText(/Nr telefonu/);

      await act(async () => {
        await fillInput();
        fireEvent.change(testedInput, { target: { value: "" } });
        fireEvent.click(submitButton);
      });

      const alertOnEmptyFirstName = screen.getByText(
        /Nieprawidłowy nr telefonu!/
      );
      expect(alertOnEmptyFirstName).toBeInTheDocument();
    });

    it("should show alert on empty customer's street", async () => {
      await act(async () => {
        render(<AddRepairMock />);
      });

      const submitButton = screen.getByText(/Dodaj naprawę/);
      const testedInput = screen.getByLabelText(/Ulica/);

      await act(async () => {
        await fillInput();
        fireEvent.change(testedInput, { target: { value: "" } });
        fireEvent.click(submitButton);
      });

      const alertOnEmptyFirstName = screen.getByText(/Nieprawidłowa ulica/);
      expect(alertOnEmptyFirstName).toBeInTheDocument();
    });

    it("should show alert on empty customer's postCode", async () => {
      await act(async () => {
        render(<AddRepairMock />);
      });

      const submitButton = screen.getByText(/Dodaj naprawę/);
      const testedInput = screen.getByLabelText(/Kod pocztowy/);

      await act(async () => {
        await fillInput();
        fireEvent.change(testedInput, { target: { value: "" } });
        fireEvent.click(submitButton);
      });

      const alertOnEmptyFirstName = screen.getByText(
        /Nieprawidłowy kod pocztowy/
      );
      expect(alertOnEmptyFirstName).toBeInTheDocument();
    });

    it("should show alert on empty device manufacturer", async () => {
      await act(async () => {
        render(<AddRepairMock />);
      });

      const submitButton = screen.getByText(/Dodaj naprawę/);
      const testedInput = screen.getByLabelText(/Producent/);

      await act(async () => {
        await fillInput();
        fireEvent.change(testedInput, { target: { value: "" } });
        fireEvent.click(submitButton);
      });

      const alertOnEmptyFirstName = screen.getByText(
        /Należy podać producenta urządzenia/
      );
      expect(alertOnEmptyFirstName).toBeInTheDocument();
    });

    it("should show alert on empty device model", async () => {
      await act(async () => {
        render(<AddRepairMock />);
      });

      const submitButton = screen.getByText(/Dodaj naprawę/);
      const testedInput = screen.getByLabelText(/Model/);

      await act(async () => {
        await fillInput();
        fireEvent.change(testedInput, { target: { value: "" } });
        fireEvent.click(submitButton);
      });

      const alertOnEmptyFirstName = screen.getByText(
        /Należy podać model urządzenia/
      );
      expect(alertOnEmptyFirstName).toBeInTheDocument();
    });

    it("should show alert on customer's phoneNumber containing charcters different than + or numbers", async () => {
      await act(async () => {
        render(<AddRepairMock />);
      });

      const submitButton = screen.getByText(/Dodaj naprawę/);
      const testedInput = screen.getByLabelText(/Nr telefonu/);

      await act(async () => {
        await fillInput();
        fireEvent.change(testedInput, {
          target: { value: "+48 23 qweqweqwe" },
        });
        fireEvent.click(submitButton);
      });

      const alertOnEmptyFirstName = screen.getByText(
        /Nieprawidłowy nr telefonu!/
      );
      expect(alertOnEmptyFirstName).toBeInTheDocument();
    });

    it("should show alert on customer's street containing charcters different letters or numbers divided with space", async () => {
      await act(async () => {
        render(<AddRepairMock />);
      });

      const submitButton = screen.getByText(/Dodaj naprawę/);
      const testedInput = screen.getByLabelText(/Ulica/);

      await act(async () => {
        await fillInput();
        fireEvent.change(testedInput, {
          target: { value: "Miejska2 !@# 33 ulica" },
        });
        fireEvent.click(submitButton);
      });

      const alertOnEmptyFirstName = screen.getByText(/Nieprawidłowa ulica/);
      expect(alertOnEmptyFirstName).toBeInTheDocument();
    });

    it("should show alert on customer's postCode wrong format", async () => {
      await act(async () => {
        render(<AddRepairMock />);
      });

      const submitButton = screen.getByText(/Dodaj naprawę/);
      const testedInput = screen.getByLabelText(/Kod pocztowy/);

      await act(async () => {
        await fillInput();
        fireEvent.change(testedInput, {
          target: { value: "00-001 sadf" },
        });
        fireEvent.click(submitButton);
      });

      const alertOnEmptyFirstName = screen.getByText(
        /Nieprawidłowy kod pocztowy/
      );
      expect(alertOnEmptyFirstName).toBeInTheDocument();
    });

    it("should show alert on customer's city wrong format", async () => {
      await act(async () => {
        render(<AddRepairMock />);
      });

      const submitButton = screen.getByText(/Dodaj naprawę/);
      const testedInput = screen.getByLabelText(/Miasto/);

      await act(async () => {
        await fillInput();
        fireEvent.change(testedInput, {
          target: { value: "Warszawa !@# 22" },
        });
        fireEvent.click(submitButton);
      });

      const alertOnEmptyFirstName = screen.getByText(/Nieprawidłowe miasto/);
      expect(alertOnEmptyFirstName).toBeInTheDocument();
    });
  });

  describe("tests new customer input", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("submit button should add new customer", async () => {
      await act(async () => {
        render(<AddRepairMock />);
      });

      const buttonElement = screen.getByText(/Dodaj naprawę/);

      axios.get.mockResolvedValueOnce(postUserResponseMock);
      axios.post.mockResolvedValueOnce(postUserResponseMock);
      axios.post.mockResolvedValueOnce(postDeviceReponseMock);
      axios.post.mockResolvedValueOnce(postRepairResponseMock);

      await act(async () => {
        await fillInput();
        fireEvent.click(buttonElement);
      });

      expect(axios.post).toHaveBeenNthCalledWith(
        1,
        `${Config.apiUrl}/api/custom-user/register`,
        {
          email: "test@test.com",
          eMail: "test@test.com",
          provider: "local",
          firstName: "Andrzej",
          lastName: "Nowak",
          phoneNumber: "123123123",
          postCode: "00-001",
          city: "Warszawa",
          street: "Miejska 2",
          inAppRole: "customer",
          role: 5,
        },
        { headers: { Authorization: `Bearer undefined` } }
      );
    });

    it("submit button should add new device", async () => {
      await act(async () => {
        render(<AddRepairMock />);
      });

      const buttonElement = screen.getByText(/Dodaj naprawę/);

      axios.get.mockResolvedValueOnce(postUserResponseMock);
      axios.post.mockResolvedValueOnce(postUserResponseMock);
      axios.post.mockResolvedValueOnce(postDeviceReponseMock);
      axios.post.mockResolvedValueOnce(postRepairResponseMock);

      await act(async () => {
        await fillInput();
        fireEvent.click(buttonElement);
      });

      expect(axios.post).toHaveBeenNthCalledWith(
        2,
        `${Config.apiUrl}/api/devices`,
        {
          data: {
            manufacturer: "Lenovo",
            model: "Thinkpad",
            serialNumber: "123123ASD",
            stateAtArrival: "good",
          },
        },
        {
          headers: {
            Authorization: `Bearer undefined`,
          },
        }
      );
    });

    it("submit button should add new repair with new customer and new device", async () => {
      await act(async () => {
        render(<AddRepairMock />);
      });

      const buttonElement = screen.getByText(/Dodaj naprawę/);

      axios.get.mockResolvedValueOnce(postUserResponseMock);
      axios.post.mockResolvedValueOnce(postUserResponseMock);
      axios.post.mockResolvedValueOnce(postDeviceReponseMock);
      axios.post.mockResolvedValueOnce(postRepairResponseMock);

      await act(async () => {
        await fillInput();
        fireEvent.click(buttonElement);
      });

      expect(axios.post).toHaveBeenNthCalledWith(
        3,
        `${Config.apiUrl}/api/repairs`,
        {
          data: {
            status: "W trakcie",
            customer: 1,
            device: 1,
            photos: null,
          },
        },
        {
          headers: {
            Authorization: `Bearer undefined`,
          },
        }
      );
    });
  });
});
