import React from "react";
import { Outlet } from "react-router-dom";
import SectionName from "../../layout/SectionName";
import { Link, useParams } from "react-router-dom";

const Devices = () => {
  const { id } = useParams();
  return (
    <div className="flex w-full flex-col justify-start items-center">
      <SectionName text="Urządzenia" />
      <Outlet />
    </div>
  );
};

export default Devices;
