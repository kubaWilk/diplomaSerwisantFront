import React from "react";
import { Outlet } from "react-router-dom";
import SectionName from "../../layout/SectionName";

const Devices = () => {
  return (
    <div className="flex w-full flex-col justify-start items-center">
      <SectionName text="Urządzenia" />
      <Outlet />
    </div>
  );
};

export default Devices;
