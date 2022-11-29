import React from "react";
import { useContext, useEffect } from "react";
import RepairsContext from "../../../context/Repairs/RepairsContext";
import RepairItem from "./RepairItem";

const Repairs = () => {
  const { allRepairs, fetchRepairs, isLoading } = useContext(RepairsContext);

  useEffect(() => {
    fetchRepairs();
  }, []);

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="flex flex-col w-full flex-start items-center">
      <h1 className="mt-5 text-3xl uppercase">Naprawy</h1>
      <div className="w-[90%] mt-3 mb-2 border-b border-black"></div>

      <table className="w-[90%] text-center ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status naprawy</th>
            <th>Typ urządzenia</th>
            <th>Producent</th>
            <th>Model</th>
            <th>Imię</th>
            <th>Nazwisko</th>
          </tr>
        </thead>
        <tbody>
          {allRepairs.map((item) => (
            <RepairItem key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Repairs;
