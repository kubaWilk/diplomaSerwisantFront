import React, { useState, useEffect, useContext } from "react";
import Alert from "../../../layout/Alert";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import AlertContext from "../../../../context/Alert/AlertContext";
import { Config } from "../../../../config";
import axios from "axios";

const PasswordReset = () => {
  const [newPassword1Try, setNewPassword1Try] = useState("");
  const [newPassword2Try, setNewPassword2Try] = useState("");
  const [hasPasswordBeenSet, setHasPasswordBeenSet] = useState(false);
  const navigate = useNavigate();
  const { setAlert } = useContext(AlertContext);

  const { search } = useLocation();
  const resetToken = search.split("=")[1];
  const inputStyle =
    "border-2 border-gray-400 outline-black rounded-md p-1 px-5";

  useEffect(() => {
    if (resetToken === undefined) navigate("/login");
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!checkInput()) return;
    console.log("gówno");

    await axios
      .post(`${Config.apiUrl}/api/auth/reset-password`, {
        code: resetToken,
        password: newPassword1Try,
        passwordConfirmation: newPassword2Try,
      })
      .then((response) => {
        setNewPassword1Try("");
        setNewPassword2Try("");
        setHasPasswordBeenSet(true);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
        let hasErrorOccured = false;

        if (error.response.data.error.message === "Incorrect code provided") {
          setAlert("Link do resetowania hasła wygasł.");
          hasErrorOccured = true;
        }

        !hasErrorOccured &&
          setAlert(
            "Coś poszło nie tak. Sprawdź połączenie internetowe i spróbuj ponownie."
          );
      });
  };

  const checkInput = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (newPassword1Try === "" || newPassword2Try === "") {
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

    return true;
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-6xl font-bold">SerwisantPC</h1>
      <div className="p-4 border-2 mt-5 min-w-80 max-w-[35%]">
        <form onSubmit={onSubmit} className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center w-full">
            <h1 className="text-center uppercase text-xl font-bold">
              Zapomniałem Hasła
            </h1>
            <div className="flex flex-col space-y-1 mb-2">
              <label htmlFor="newPassword1Try">
                <p className="text-center font-bold uppercase">Nowe Hasło</p>
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
            <div className="flex flex-col space-y-1 mb-2">
              <label htmlFor="newPassword1Try">
                <p className="text-center font-bold uppercase">
                  Powtórz Nowe Hasło
                </p>

                <input
                  name="newPassword1Try"
                  className={inputStyle}
                  type="password"
                  placeholder="Powtórz Nowe Hasło"
                  value={newPassword2Try}
                  onChange={(e) => setNewPassword2Try(e.target.value)}
                />
              </label>
            </div>

            {!hasPasswordBeenSet && (
              <div className="mt-2">
                <p className="text-md ">Hasło musi:</p>
                <ul className="text-xs px-2">
                  <li>posiadać 8 znaków</li>
                  <li>zawierać dużą literę</li>
                  <li>zawierać cyfrę</li>
                  <li>zawierać znak specjalny</li>
                </ul>
              </div>
            )}
          </div>
          <Alert />
          {hasPasswordBeenSet && (
            <>
              <p className="text-md p-1 text-center">Hasło zresetowane</p>
              <Link
                className="hover:underline text-sm uppercase m-2"
                to="/login"
              >
                Wróć do strony logowania
              </Link>
            </>
          )}

          <div className="mt-3">
            <button
              type="submit"
              className="p-2 border-2 border-black font-bold hover:bg-black hover:text-white duration-100"
            >
              Zmień hasło
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
