import React, { useState, useContext, useCallback, useEffect } from "react";
import UserContext from "../../../../context/User/UserContext";
import axios from "axios";
import { Config } from "../../../../config";
import RepairItem from "../../Repairs/RepairItem";
import { useParams } from "react-router-dom";
import Repairs from "../../Repairs/Repairs";

const DeviceRepairs = () => {
  const { id } = useParams();
  const [allRepairs, setAllRepairs] = useState();
  const { getToken } = useContext(UserContext);

  const fetchDeviceRepairs = useCallback(async () => {
    const res = await axios
      .get(`${Config.apiUrl}/repair/device/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .catch((e) => {
        console.log(e);
      });

    setAllRepairs(res.data);
  }, [setAllRepairs]);

  useEffect(() => {
    fetchDeviceRepairs();
  }, [fetchDeviceRepairs]);

  return (
    <div className="flex flex-col w-full flex-start items-center">
      <p className="text-xs">
        Aby zobaczyć szczegóły naprawy kliknij na pozycji w tabeli
      </p>
      <table className="w-[90%] text-center repair-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status naprawy</th>
            <th>Producent</th>
            <th>Model</th>
            <th>Imię</th>
            <th>Nazwisko</th>
          </tr>
        </thead>
        <tbody>
          {allRepairs
            ? allRepairs.map((item) => <RepairItem key={item.id} item={item} />)
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceRepairs;
