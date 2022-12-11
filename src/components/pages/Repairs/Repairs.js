import React, { Fragment } from "react";
import { useContext, useEffect } from "react";
import RepairsContext from "../../../context/Repairs/RepairsContext";
import RepairItem from "./RepairItem";
import SectionName from "../../layout/SectionName";
import NavButtons from "./NavButtons";
import SingleRepairState from "../../../context/SingleRepair/SingleRepairState";

const Repairs = () => {
  const { allRepairs, fetchRepairs, isLoading } = useContext(RepairsContext);

  useEffect(() => {
    fetchRepairs();
  }, []);

  if (isLoading) return <div>Loading</div>;

  return (
    <SingleRepairState>
      <div className="flex flex-col w-full flex-start items-center">
        <SectionName text="Naprawy" />
        <NavButtons />
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
            {allRepairs.map((item) => (
              <RepairItem key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </SingleRepairState>
  );
};

export default Repairs;
