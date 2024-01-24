import React, { useCallback, useContext } from "react";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Loading from "../../layout/Loading";
import DevicesSearchRow from "./DevicesSearchRow";
import DeviceItem from "./DeviceItem";
import { useParams } from "react-router-dom";
import UserContext from "../../../context/User/UserContext";
import { Config } from "../../../config";

const DevicesTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allDevices, setAllDevices] = useState([]);
  const { id } = useParams();
  const { getToken } = useContext(UserContext);

  const fetchDevices = useCallback(async () => {
    const res = await axios
      .get(`${Config.apiUrl}/device/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .catch((e) => {});

    setAllDevices(res.data);
    setIsLoading(false);
  }, [setAllDevices, setIsLoading]);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  if (isLoading) return <Loading />;

  return (
    <Fragment>
      <p className="text-xs">
        Aby zobaczyć szczegóły, kliknij podwójnie na wybranej pozycji w tabeli
      </p>
      <table className="text-center repair-table w-[90%]">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producent</th>
            <th>Model</th>
            <th>Nr seryjny:</th>
          </tr>
        </thead>
        {/* <DevicesSearchRow /> */}
        {allDevices &&
          allDevices.map((device) => (
            <DeviceItem key={device.id} item={device} />
          ))}
      </table>
    </Fragment>
  );
};

export default DevicesTable;
