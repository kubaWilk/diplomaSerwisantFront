import React, { Fragment } from "react";
import DashContainer from "../../DashContainer";
import SectionName from "../../layout/SectionName";
import NavButtons from "./NavButtons";
import { Outlet } from "react-router-dom";

const Repairs = () => {
  return (
    <Fragment>
      <SectionName text="Naprawy" />
      <Outlet />
    </Fragment>
  );
};

export default Repairs;
