import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <div className="w-1/4 h-[90vh] flex flex-col justify-between border-r border-gray-400">
      <div className="flex flex-col">
        <a href="#" className="ml-4 mt-4 border-b uppercase">
          Start
        </a>
        <a href="#" className="ml-4 mt-4 border-b uppercase">
          Naprawy
        </a>
        <a href="#" className="ml-4 mt-4 border-b uppercase">
          Klienci
        </a>
        <a href="#" className="ml-4 mt-4 border-b uppercase">
          Urządzenia
        </a>
        <a href="#" className="ml-4 mt-4 border-b uppercase">
          Panel Administratora
        </a>
      </div>
      <div>
        <div className="p-2 border-t border-black">
          <div className="flex justify-between flex-col md:flex-row">
            <div className="flex">
              <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full border border-black">
                Av
              </div>
              <div className="flex flex-col ml-2">
                <h3 className="text-md">Jakub Wilk</h3>
                <p className="text-xs">Administrator</p>
              </div>
            </div>
            <button className="px-2 mt-2 md:m-0 py-[3px] border-2 border-black font-bold hover:text-white hover:bg-black duration-100">
              Wyloguj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideMenu;
