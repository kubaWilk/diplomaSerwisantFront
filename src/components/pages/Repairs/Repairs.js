import React from "react";
import { useContext, useEffect, useState } from "react";
import RepairsContext from "../../../context/Repairs/RepairsContext";
import RepairItem from "./Repair/RepairItem";
import SectionName from "../../layout/SectionName";
import NavButtons from "./NavButtons";
import SearchRow from "./Repair/SearchRow";

const Repairs = () => {
  const { allRepairs, fetchRepairs, searchRepairs, isLoading } =
    useContext(RepairsContext);
  //that state is only to have a useEffect dependency
  const [searchApiCall, setSearchApiCall] = useState("");

  useEffect(() => {
    fetchRepairs();
  }, []);

  useEffect(() => {
    if (searchApiCall === "") return;
    searchRepairs(searchApiCall);
  }, [searchApiCall]);

  if (isLoading) return <div>Loading</div>;

  const prepareApiCall = (apiCall) => {
    let tempApiString = "?";
    const objKeys = Object.keys(apiCall);
    const objVals = Object.values(apiCall);

    objKeys.forEach((e, i) => {
      if (objVals[i] !== "" && tempApiString === "?") {
        tempApiString = tempApiString + `${e}=${objVals[i]}`;
      } else if (objVals[i] !== "") {
        tempApiString = tempApiString + `&${e}=${objVals[i]}`;
      }
    });

    setSearchApiCall(tempApiString);
  };

  return (
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
          <SearchRow searchCall={prepareApiCall} />
          {allRepairs.map((item) => (
            <RepairItem key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Repairs;
