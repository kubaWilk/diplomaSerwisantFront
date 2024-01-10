import React, { Fragment, useEffect } from "react";
import SectionName from "../../layout/SectionName";
import { Outlet, useNavigate } from "react-router-dom";

const Repairs = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <SectionName text="Naprawy" />
      <Outlet />
    </Fragment>
  );
};

export default Repairs;
