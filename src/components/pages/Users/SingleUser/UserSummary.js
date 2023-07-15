import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../../../context/User/UserContext";
import Loading from "../../../layout/Loading";

const UserSummary = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    street: "",
    postCode: "",
  });

  const { getUserById } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserById(id);

      if (result !== false) {
        setData(result);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="p-2">
      <ul>
        <li>
          <strong>ID: </strong>
          {data.id}
        </li>
        <li>
          <strong>Imię: </strong>
          {data.firstName}
        </li>
        <li>
          <strong>Nazwisko: </strong>
          {data.lastName}
        </li>
        <li>
          <strong>Nr kontaktowy: </strong>
          {data.phoneNumber}
        </li>
        <li>
          <strong>E-Mail: </strong>
          {data.email}
        </li>
        <div className="border-b-2 border-gray-400 border-dotted mt-2">
          Adres:
        </div>
        <li>
          <strong>Ulica </strong>
          {data.street}
        </li>
        <li>
          <strong>Miasto </strong>
          {data.city}
        </li>
        <li>
          <strong>Kod Pocztowy </strong>
          {data.postCode}
        </li>
      </ul>
    </div>
  );
};

export default UserSummary;
