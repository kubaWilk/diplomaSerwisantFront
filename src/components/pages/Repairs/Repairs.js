import React from "react";
import { useContext, useEffect, useState, Fragment } from "react";
import RepairsContext from "../../../context/Repairs/RepairsContext";
import RepairItem from "./RepairItem";
import SectionName from "../../layout/SectionName";
import NavButtons from "./NavButtons";
import RepairsSearchRow from "./RepairsSearchRow";
import Loading from "../../layout/Loading";

const Repairs = ({ filterUserId, filterDeviceID }) => {
  const { allRepairs, fetchRepairs, searchRepairs, isLoading } =
    useContext(RepairsContext);
  //that state is only to have a useEffect dependency
  const [searchApiCall, setSearchApiCall] = useState("");

  useEffect(() => {
    const test = async () => {
      await fetchRepairs();
    };

    test();
  }, []);

  useEffect(() => {
    if (searchApiCall === "") return;
    searchRepairs(searchApiCall);
  }, [searchApiCall]);

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

  const checkUseCase = () => {
    if (filterUserId === -1 && filterDeviceID === -1)
      return useCases.allRepairs;
    else if (filterUserId !== -1 && filterDeviceID === -1)
      return useCases.userReparis;
    else if (filterUserId === -1 && filterDeviceID !== -1)
      return useCases.deviceRepairs;
    else return useCases.invalid;
  };

  const renderUseCase = () => {
    switch (checkUseCase()) {
      case useCases.allRepairs: {
        return allRepairs.map((item) => (
          <RepairItem key={item.id} item={item} />
        ));
      }
      case useCases.userReparis: {
        return allRepairs
          .filter((repair) => repair.customer.id === filterUserId)
          .map((repair) => <RepairItem key={repair.id} item={repair} />);
      }
      case useCases.deviceRepairs: {
        return allRepairs
          .filter((repair) => repair.device.id === filterDeviceID)
          .map((repair) => <RepairItem key={repair.id} item={repair} />);
      }
    }
  };

  const useCases = {
    allRepairs: "allRepairs",
    userReparis: "userRepairs",
    deviceRepairs: "deviceRepairs",
    invalid: "invalid",
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col w-full flex-start items-center">
      {filterUserId === -1 && filterDeviceID === -1 && (
        <Fragment>
          <SectionName text="Naprawy" />
          <NavButtons />
        </Fragment>
      )}
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
          <RepairsSearchRow searchCall={prepareApiCall} />
          {console.log(
            `filterUserID: ${filterUserId} filterDeviceID: ${filterDeviceID} useCase: ${checkUseCase()}`
          )}
          {renderUseCase()}
        </tbody>
      </table>
    </div>
  );
};

Repairs.defaultProps = {
  filterUserId: -1,
  filterDeviceID: -1,
};

export default Repairs;
