import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../../context/User/UserContext";

const HomeButtons = () => {
  const { isCustomer } = useContext(UserContext);
  return (
    <div className="flex flex-col space-x-2 md:flex-row">
      <Link
        to="/app/repairs/all"
        className="border-2 border-black p-2 font-bold uppercase hover:bg-black duration-200 hover:text-white"
      >
        Przejrzyj Narpawy
      </Link>
      {!isCustomer() && (
        <Link
          to="/app/repairs/new"
          className="border-2 border-black p-2 font-bold uppercase hover:bg-black duration-200 hover:text-white"
        >
          Dodaj Naprawę
        </Link>
      )}
    </div>
  );
};

export default HomeButtons;
