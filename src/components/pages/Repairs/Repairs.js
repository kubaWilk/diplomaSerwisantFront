import React, { Fragment, useEffect } from "react";
import SectionName from "../../layout/SectionName";
import { Outlet, useLocation } from "react-router-dom";

const Repairs = () => {
  const location = useLocation();

  return (
    <Fragment>
      {location.pathname === "/app/repairs/all" && (
        <SectionName text="Naprawy" />
      )}
      <Outlet />
    </Fragment>
  );
};

export default Repairs;
