import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../layout/Loading";

const UserSummary = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${id}`);

      setUser(res.data);
      setIsLoading(false);
      console.log(id);
    };

    fetchUser();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="p-2">
      <ul>
        <li>
          <strong>ID: </strong>
          {user.id}
        </li>
        <li>
          <strong>Imię: </strong>
          {user.firstName}
        </li>
        <li>
          <strong>Nazwisko: </strong>
          {user.lastName}
        </li>
        <li>
          <strong>Nr kontaktowy: </strong>
          {user.phoneNumber}
        </li>
        <div className="border-b-2 border-gray-400 border-dotted mt-2">
          Adres:
        </div>
        <li>
          <strong>Ulica </strong>
          {user.street}
        </li>
        <li>
          <strong>Miasto </strong>
          {user.city}
        </li>
        <li>
          <strong>Kod Pocztowy </strong>
          {user.postCode}
        </li>
      </ul>
    </div>
  );
};

export default UserSummary;
