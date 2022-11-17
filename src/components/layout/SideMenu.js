import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

const SideMenu = ({ text }) => {
  return (
    <div id="side-menu">
      <Logo text={text} />
      <ul>
        <li>
          <Link className="menu" to={""}>
            Start
          </Link>
        </li>
        <li>
          <Link className="menu" to={"/repairs/all"}>
            Naprawy
          </Link>
        </li>
        <li>
          <Link className="menu" to={"/customers"}>
            Klienci
          </Link>
        </li>
        <li>
          <Link className="menu" to={"/devices"}>
            Sprzęt
          </Link>
        </li>
        <li>
          <Link className="menu" to={"/stats"}>
            Statystyki
          </Link>
        </li>
        <li>
          <Link className="menu" to={"/users"}>
            Użytkownicy
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
