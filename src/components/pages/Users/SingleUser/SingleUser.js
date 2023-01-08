import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import SectionName from "../../../layout/SectionName";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../../../layout/Loading";
import Dialog from "../../../layout/Dialog";
import EditUserModal from "./EditUserModal";
import UserContext from "../../../../context/User/UserContext";

const SingleUser = () => {
  const { id } = useParams();
  const location = useLocation();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalToggle, setDeleteModalToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(false);

  const { isAdmin } = useContext(UserContext);

  const fetchUser = async () => {
    const res = await axios.get(`/users/${id}`);

    setUser(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchUser();
    //eslint-disable-next-line
  }, [editToggle]);

  const deleteUser = async () => {
    axios.delete(`/users/${id}`).catch((e) => console.log(e));
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-start w-full">
      <SectionName text={`${user.firstName} ${user.lastName}`} />
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
          to={`/user/${id}/devices`}
        >
          Urządzenia
        </Link>
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/user/${id}/edit`}
        >
          Edytuj
        </Link>
        {/* <button
          onClick={() => setEditToggle(true)}
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
        >
          Edytuj
        </button> */}
        {editToggle && <EditUserModal toggle={setEditToggle} userData={user} />}
        {isAdmin() && (
          <button
            className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
            onClick={() => {
              setDeleteModalToggle(true);
            }}
          >
            Usuń
          </button>
        )}
        {deleteModalToggle && (
          <Dialog
            prompt="Czy chcesz usunąć tego użytkownika? Spowoduje to usunięcie powiązanych napraw i urządzeń!"
            onApprove={() => {
              deleteUser();
              setDeleteModalToggle(false);
            }}
            onCancel={() => {
              setDeleteModalToggle(false);
            }}
          />
        )}
      </div>
      <Outlet key={location.pathname} />
    </div>
  );
};

export default SingleUser;
