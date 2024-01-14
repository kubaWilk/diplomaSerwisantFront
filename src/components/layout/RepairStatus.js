import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import SingleRepairContext from "../../context/SingleRepair/SingleRepairContext";
import UserContext from "../../context/User/UserContext";
import { useParams } from "react-router-dom";

const RepairStatus = () => {
  const { repair, changeRepairStatus } = useContext(SingleRepairContext);
  const { getToken } = useContext(UserContext);
  const { id } = useParams();

  const statuses = {
    OPEN: "Otwarta",
    WAITING_FOR_CUSTOMER: "Oczekuje na decyzję klienta",
    WAITING_FOR_SUPLIER: "Oczekiwanie na dostawcę",
    CANCELED: "Anulowana",
    CLOSED: "Zamknięta",
  };

  const [repairStatus, setRepairStatus] = useState(statuses[repair.status]);

  const onChange = async (e) => {
    const status = Object.keys(statuses).filter(
      (element) => statuses[element] === e.target.value
    );

    changeRepairStatus(id, status.toString(), getToken());
  };

  useEffect(() => {
    setRepairStatus(repair.status);
  }, [repair.status]);

  return (
    <Fragment>
      <div className="flex w-full justify-center align-center space-x-2">
        <label className="font-bold text-lg mb-1">Status naprawy: </label>
        <select
          className="text-sm border border-dotted border-black text-center bg-transparent font-bold uppercase backdrop:bg-black"
          defaultValue={repairStatus}
          onChange={(e) => {
            setRepairStatus(e.target.value);
            onChange(e);
          }}
        >
          <option>Otwarta</option>
          <option>Oczekuje na decyzję klienta</option>
          <option>Oczekiwanie na dostawcę</option>
          <option>Anulowana</option>
          <option>Zamknięta</option>
        </select>
      </div>
    </Fragment>
  );
};

export default RepairStatus;
