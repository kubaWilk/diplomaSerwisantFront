import React, { useContext, useState } from "react";
import Alert from "../../../layout/Alert";
import { Link } from "react-router-dom";
import { Config } from "../../../../config";
import AlertContext from "../../../../context/Alert/AlertContext";
import axios from "axios";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [hasEmailBeenSent, setHasEmailBeenSent] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${Config.apiUrl}/api/auth/forgot-password`, {
        email: email,
      })
      .then((response) => {
        setHasEmailBeenSent(true);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
        setAlert(
          "Coś poszło nie tak. Sprawdź połączenie internetowe i spróbuj ponownie"
        );
      });
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
            <p className="text-sm p-1 text-center mb-2">
              Wpisz adres e-mail w polu poniżej, aby otrzymać link resetujący
              hasło
            </p>
            <input
              name="email"
              type="text"
              className="border-2 rounded-md p-1 px-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Alert />
          {hasEmailBeenSent && (
            <p className="text-sm p-1 text-center">
              Wiadomość została wysłana, jeśli istnieje konto z podanym adresem
              e-mail.
            </p>
          )}
          <Link className="hover:underline" to="/login">
            Wróć do strony logowania
          </Link>
          <div className="mt-3">
            <button
              type="submit"
              className="p-2 border-2 border-black font-bold hover:bg-black hover:text-white duration-100"
            >
              Wyślij
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
