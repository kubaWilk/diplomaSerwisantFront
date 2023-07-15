import React, { useContext, useState } from "react";
import DialogBase from "../../../layout/DialogBase/DialogBase";
import ButtonApprove from "../../../layout/DialogBase/ButtonApprove";
import ButtonCancel from "../../../layout/DialogBase/ButtonCancel";
import { useNavigate, useParams } from "react-router-dom";
import AlertContext from "../../../../context/Alert/AlertContext";
import Alert from "../../../layout/Alert";
import UserContext from "../../../../context/User/UserContext";

const ChangePasswordModal = () => {
  const [currentPasswordInput, setCurrentPassword] = useState("");
  const [newPassword1Try, setNewPassword1Try] = useState("");
  const [newPassword2Try, setNewPassword2Try] = useState("");

  const navigate = useNavigate();
  const { setAlert } = useContext(AlertContext);
  const { changePassword } = useContext(UserContext);
  const { id } = useParams();

  const isInEditForm = id !== undefined ? true : false;

  const inputStyle =
    "border-2 border-gray-400 outline-black rounded-md p-1 px-5";

  const onSubmit = (e) => {
    e.preventDefault();
    if (checkInput()) return;
  };

  const checkInput = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (currentPasswordInput === "" || newPassword1Try === "") {
      setAlert("Żadne pole nie może być puste");
      return false;
    }

    if (newPassword1Try !== newPassword2Try) {
      setAlert("Hasła różnią się");
      return false;
    }

    if (!passwordRegex.test(newPassword1Try)) {
      setAlert("Podano za słabe hasło");
      return false;
    }

    changePassword(currentPasswordInput, newPassword1Try)
      .then((isSuccess) => {
        console.log(isSuccess);
        if (isSuccess) navigate(-1);
        else setAlert("Coś poszło nie tak. Spróbuj jeszcze raz.");
      })
      .catch((errResponse) => {
        const {
          response: {
            data: { error },
          },
        } = errResponse;
        let hasErrorOccured = false;

        if (
          error.message ===
          "Your new password must be different than your current password"
        ) {
          setAlert("Nowe hasło musi różnić się od poprzedniego!");
          hasErrorOccured = true;
        }

        if (error.message === "The provided current password is invalid") {
          setAlert("Podano nieprawidłowe stare hasło");
          hasErrorOccured = true;
        }

        if (!hasErrorOccured) {
          setAlert("Coś poszło nie tak. Spróbuj jeszcze raz.");
          console.log(error);
        }
      });
  };

  return (
    <DialogBase>
      <h2 className="uppercase text-center font-bold m-2 text-lg">
        Zmień hasło
      </h2>
      <div className="px-5 flex flex-col items-center justify-center">
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="oldPassword"
            className="text-center font-bold uppercase"
          >
            <p>Stare hasło</p>
            <input
              name="oldPassword"
              className={inputStyle}
              type="password"
              placeholder="Stare hasło"
              value={currentPasswordInput}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </label>
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="newPassword1Try"
            className="text-center font-bold uppercase"
          >
            <p>Nowe Hasło</p>
            <input
              name="newPassword1Try"
              className={inputStyle}
              type="password"
              placeholder="Nowe Hasło"
              value={newPassword1Try}
              onChange={(e) => setNewPassword1Try(e.target.value)}
            />
          </label>
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="newPassword1Try"
            className="text-center font-bold uppercase"
          >
            <p>Powtórz Nowe Hasło</p>

            <input
              name="newPassword1Try"
              className={inputStyle}
              type="password"
              placeholder="Nowe Hasło"
              value={newPassword2Try}
              onChange={(e) => setNewPassword2Try(e.target.value)}
            />
          </label>
        </div>
        <div className="mt-2">
          <p className="text-md ">Hasło musi:</p>
          <ul className="text-xs px-2">
            <li>posiadać 8 znaków</li>
            <li>zawierać dużą literę</li>
            <li>zawierać cyfrę</li>
            <li>zawierać znak specjalny</li>
          </ul>
        </div>
        <Alert />
        <div className="flex space-x-2">
          <ButtonApprove onClick={(e) => onSubmit(e)} text="Tak" />
          <ButtonCancel onCancel={() => navigate(-1)} text="Nie" />
        </div>
      </div>
    </DialogBase>
  );
};

export default ChangePasswordModal;
