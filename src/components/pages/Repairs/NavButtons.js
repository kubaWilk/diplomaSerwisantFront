import React from "react";
import { Link } from "react-router-dom";

const NavButtons = () => {
  return (
    <div className="flex flex-col space-x-2 md:flex-row mt-2 mb-5">
      <Link
        to="/repairs/new"
        className="border-2 border-black p-2 font-bold uppercase hover:bg-black duration-200 hover:text-white"
      >
        Dodaj Naprawę
      </Link>
    </div>
  );
};

export default NavButtons;
