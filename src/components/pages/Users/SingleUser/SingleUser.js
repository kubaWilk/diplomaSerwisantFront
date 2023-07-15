import React, { useState, useContext } from "react";
import {
  Link,
  Outlet,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import Dialog from "../../../layout/Dialog";
import UserContext from "../../../../context/User/UserContext";
import Alert from "../../../layout/Alert";
import AlertContext from "../../../../context/Alert/AlertContext";
import axios from "axios";
import { Config } from "../../../../config";

const SingleUser = () => {
  const { id } = useParams();
  const location = useLocation();
  const [deleteModalToggle, setDeleteModalToggle] = useState(false);
  const { deleteUser, isAdmin, user } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteUser(id)
      .then(() => {
        setDeleteModalToggle(false);
        navigate(-1);
      })
      .catch((error) => {
        setAlert("Coś poszło nie tak. Spróbuj jeszcze raz.");
        console.log(error);
      });
  };

  const handlePasswordReset = async () => {
    axios
      .post(`${Config.apiUrl}/api/auth/forgot-password`, {
        email: user.email,
      })
      .then((response) => {
        alert("E-mail z linkiem do resetu hasła wysłany!");
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
        setAlert(
          "Coś poszło nie tak. Sprawdź połączenie internetowe i spróbuj ponownie"
        );
      });
  };

  return (
    <div className="flex flex-col items-center justify-start w-full">
      <div className="flex space-x-2">
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/user/${id}`}
        >
          Podsumowanie
        </Link>
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/user/${id}/repairs`}
        >
          Naprawy
        </Link>
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/user/${id}/edit`}
        >
          Edytuj
        </Link>
        {isAdmin() && (
          <>
            <button
              className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
              onClick={() => {
                handlePasswordReset();
              }}
            >
              Zresetuj Hasło
            </button>
            <button
              className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
              onClick={() => {
                setDeleteModalToggle(true);
              }}
            >
              Usuń
            </button>
          </>
        )}
        {deleteModalToggle && (
          <Dialog
            prompt="Czy chcesz usunąć tego użytkownika? Spowoduje to usunięcie powiązanych napraw i urządzeń!"
            onApprove={() => {
              handleDelete();
            }}
            onCancel={() => {
              setDeleteModalToggle(false);
            }}
          />
        )}
      </div>
      <Alert />
      <Outlet key={location.pathname} />
    </div>
  );
};

export default SingleUser;
