import React, { Fragment, useContext, useEffect, useState } from "react";
import SingleRepairContext from "../../context/SingleRepair/SingleRepairContext";
import UserContext from "../../context/User/UserContext";
import { useParams } from "react-router-dom";

const RepairStatus = () => {
  const [repairStatus, setRepairStatus] = useState();

  const { repair, putRepair } = useContext(SingleRepairContext);
  const {
    user: { jwt: token },
  } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    if (repair.status !== repairStatus && repairStatus !== undefined)
      putRepair(id, repairStatus, token);
  }, [repairStatus]);

  useEffect(() => {
    setRepairStatus(repair.status);
  }, [repair.status]);

  return (
    <Fragment>
      <div className="flex w-full justify-center align-center space-x-2">
        <label className="font-bold text-lg mb-1">Status naprawy: </label>
        <select
          className="text-sm border border-dotted border-black text-center bg-transparent font-bold uppercase backdrop:bg-black"
          value={repairStatus}
          onChange={(e) => setRepairStatus(e.target.value)}
        >
          <option>W trakcie</option>
          <option>Oczekuje na decyzję klienta</option>
          <option>Oczekiwanie na dostawcę</option>
          <option>Zamknięta</option>
        </select>
      </div>
    </Fragment>
  );
};

export default RepairStatus;
