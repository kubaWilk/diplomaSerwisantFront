import React, { Fragment, useContext, useEffect, useState } from "react";
import SingleRepairContext from "../../context/SingleRepair/SingleRepairContext";
import UserContext from "../../context/User/UserContext";
import { useParams } from "react-router-dom";

const RepairStatus = () => {
  const [inComponentRepairStatus, setInComponentRepairStatus] = useState();

  const { repair, putRepair } = useContext(SingleRepairContext);
  const {
    user: { jwt: token },
  } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    if (
      repair.status !== inComponentRepairStatus &&
      inComponentRepairStatus !== undefined
    )
      putRepair(id, inComponentRepairStatus, token);
  }, [inComponentRepairStatus]);

  useEffect(() => {
    setInComponentRepairStatus(repair.status);
  }, [repair.status]);

  return (
    <Fragment>
      <div
        data-testid="repairStatusComponent"
        className="flex w-full justify-center align-center space-x-2"
      >
        <label className="font-bold text-lg mb-1">
          Status naprawy:
          <select
            className="custom-select uppercase"
            value={inComponentRepairStatus}
            onChange={(e) => setInComponentRepairStatus(e.target.value)}
          >
            <option>W trakcie</option>
            <option>Oczekuje na decyzję klienta</option>
            <option>Oczekiwanie na dostawcę</option>
            <option>Zamknięta</option>
          </select>
        </label>
      </div>
    </Fragment>
  );
};

export default RepairStatus;
