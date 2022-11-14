import React from "react";
import DashButton from "./DashButton";

const StartPage = () => {
  return (
    <div className="container">
      <DashButton text="Nowa Naprawa" link="/repairs/add" />
      <DashButton text="Przejrzyj Naprawy" link="/repairs/all" />
      <DashButton text="Znajdź klientów" link="/customers/" />
      <DashButton text="Znajdź urządzenia" link="/devices" />
      <DashButton text="Statystyki" link="/stats" />
    </div>
  );
};

export default StartPage;
