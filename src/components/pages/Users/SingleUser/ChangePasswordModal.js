import React, { useContext, useState } from "react";
import DialogBase from "../../../layout/DialogBase/DialogBase";
import ButtonApprove from "../../../layout/DialogBase/ButtonApprove";
import ButtonCancel from "../../../layout/DialogBase/ButtonCancel";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../../../context/Alert/AlertContext";
import Alert from "../../../layout/Alert";
import axios from "axios";
import { Config } from "../../../../config";
import UserContext from "../../../../context/User/UserContext";

const ChangePasswordModal = () => {
  const [oldPasswordInput, setOldPassword] = useState("");
  const [newPassword1Try, setNewPassword1Try] = useState("");
  const [newPassword2Try, setNewPassword2Try] = useState("");

  const navigate = useNavigate();
  const { getToken } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);

  const inputStyle =
    "border-2 border-gray-400 outline-black rounded-md p-1 px-5";

  const onSubmit = async (e) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    e.preventDefault();
    if (newPassword1Try === "") {
      setAlert("Hasło nie może być puste!");
    } else if (newPassword1Try !== newPassword2Try) {
      setAlert("Hasła różnią się");
    } else if (!passwordRegex.test(newPassword1Try)) {
      setAlert("Podano za słabe hasło");
    } else if (passwordRegex.test(newPassword1Try)) {
      await axios
        .put(
          `${Config.apiUrl}/auth/change-password`,
          { oldPassword: oldPasswordInput, newPassword: newPassword1Try },
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        )
        .then((res) => {
          if (res.status === 200) navigate(-1);
        })
        .catch((e) => {
          if (
            e.response.data.message ===
            "Old password doesn't match the one in the database!"
          )
            setAlert("Podano nieprawidłowe stare hasło.");
        });
    } else {
      setAlert("Coś poszło nie tak");
    }
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
            Stare hasło
          </label>
          <input
            name="oldPassword"
            className={inputStyle}
            type="password"
            placeholder="Stare hasło"
            value={oldPasswordInput}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="newPassword1Try"
            className="text-center font-bold uppercase"
          >
            Nowe Hasło
          </label>
          <input
            name="newPassword1Try"
            className={inputStyle}
            type="password"
            placeholder="Nowe Hasło"
            value={newPassword1Try}
            onChange={(e) => setNewPassword1Try(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="newPassword1Try"
            className="text-center font-bold uppercase"
          >
            Powtórz Nowe Hasło
          </label>
          <input
            name="newPassword1Try"
            className={inputStyle}
            type="password"
            placeholder="Nowe Hasło"
            value={newPassword2Try}
            onChange={(e) => setNewPassword2Try(e.target.value)}
          />
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
