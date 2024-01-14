import React from "react";
import { useContext, useEffect } from "react";
import RepairsContext from "../../../context/Repairs/RepairsContext";
import RepairItem from "./RepairItem";
import NavButtons from "./NavButtons";
import RepairsSearchRow from "./RepairsSearchRow";
import Loading from "../../layout/Loading";
import UserContext from "../../../context/User/UserContext";
import axios from "axios";
import { Config } from "../../../config";

const RepairsList = ({}) => {
  const { getToken } = useContext(UserContext);
  const { allRepairs, setRepairs, isLoading } = useContext(RepairsContext);

  useEffect(() => {
    const authToken = getToken();

    axios
      .get(`${Config.apiUrl}/repair/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setRepairs(res.data);
      })
      .catch((error) => {
        if (error) console.log("UserState/fetchCustomers", error);
      });
  }, [isLoading]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col w-full flex-start items-center">
      <NavButtons />
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
          <RepairsSearchRow searchCall={() => {}} />
          {allRepairs
            ? allRepairs.map((item) => <RepairItem key={item.id} item={item} />)
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default RepairsList;
