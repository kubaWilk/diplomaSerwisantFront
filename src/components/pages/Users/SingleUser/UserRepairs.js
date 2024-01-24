import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RepairItem from "../../Repairs/RepairItem";
import { Config } from "../../../../config";
import axios from "axios";
import UserContext from "../../../../context/User/UserContext";

const UserRepairs = () => {
  const { id } = useParams();
  const [allRepairs, setAllRepairs] = useState();
  const { getToken } = useContext(UserContext);

  const fetchCustomerRepairs = useCallback(async () => {
    const res = await axios.get(`${Config.apiUrl}/repair/customer/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    setAllRepairs(res.data);
  }, [setAllRepairs]);

  useEffect(() => {
    fetchCustomerRepairs();
  }, [fetchCustomerRepairs]);

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

export default UserRepairs;
