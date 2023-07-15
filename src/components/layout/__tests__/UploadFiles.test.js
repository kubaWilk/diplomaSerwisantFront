import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";
import UploadFiles from "../UploadFiles";

const UploadFilesMock = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  return <UploadFiles formState={{ uploadedFiles, setUploadedFiles }} />;
};

describe("tests UploadFiles Component", () => {
  it("renders UploadFiles component", () => {
    render(<UploadFilesMock />);
    const component = screen.getByTestId("uploadFilesComponent");
    expect(component).toBeInTheDocument();
  });

  it("contains a label describing component", () => {
    render(<UploadFilesMock />);
    const label = screen.getByText(/Zdjęcia/);
    expect(label).toBeInTheDocument();
  });

  it("contains an input element for photos", () => {
    render(<UploadFilesMock />);
    const inputElement = screen.getByLabelText(/Dodaj/);
    expect(inputElement).toBeInTheDocument();
  });

  it("user can add a file", async () => {
    render(<UploadFilesMock />);

    const file = new File(["hello"], "hello.png", { type: "image/png" });
    const inputElement = screen.getByLabelText(/Dodaj/);
    fireEvent.change(inputElement, { target: { files: [file] } });

    const addedFile = screen.getByTestId("addedFile0");
    expect(addedFile).toBeInTheDocument();
  });

  it("user can delete a file", async () => {
    render(<UploadFilesMock />);
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    const inputElement = screen.getByLabelText(/Dodaj/);
    fireEvent.change(inputElement, { target: { files: [file] } });

    const removeFileAnchor = screen.getByTestId("fileRemoveAnchor0");
    fireEvent.click(removeFileAnchor);
    expect(removeFileAnchor).not.toBeInTheDocument();
  });
});
