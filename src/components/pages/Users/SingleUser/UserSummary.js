import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../../../context/User/UserContext";
import Loading from "../../../layout/Loading";
import { Config } from "../../../../config";
import axios from "axios";

const UserSummary = () => {
  const { id } = useParams();
  const { getToken, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    street: "",
    postCode: "",
  });

  const fetchUser = useCallback(async () => {
    const res = await axios
      .get(`${Config.apiUrl}/user/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .catch((e) => {
        if (e.response.status === 401) {
          logout();
          navigate("/");
        }
      });

    setUserData(res.data);
    setIsLoading(false);
  }, [setUserData, setIsLoading]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) return <Loading />;

  return (
    <div className="p-2 w-full">
      <ul>
        <li>
          <strong>ID: </strong>
          {userData.id}
        </li>
        <li>
          <strong>Imię: </strong>
          {userData.userInfo.firstName}
        </li>
        <li>
          <strong>Nazwisko: </strong>
          {userData.userInfo.lastName}
        </li>
        <li>
          <strong>Nr kontaktowy: </strong>
          {userData.userInfo.phoneNumber}
        </li>
        <div className="border-b-2 border-gray-400 border-dotted mt-2">
          Adres:
        </div>
        <li>
          <strong>Ulica </strong>
          {userData.userInfo.street}
        </li>
        <li>
          <strong>Miasto </strong>
          {userData.userInfo.city}
        </li>
        <li>
          <strong>Kod Pocztowy </strong>
          {userData.userInfo.postCode}
        </li>
      </ul>
    </div>
  );
};

export default UserSummary;
