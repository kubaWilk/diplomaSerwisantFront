import React, { useContext } from "react";
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
  const {
    user: { jwt: token },
  } = useContext(UserContext);

  useEffect(() => {
    const getDevices = async () => {
      if (id === undefined) {
        const res = await axios.get(`${Config.apiUrl}/api/devices?populate=*`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllDevices(res.data);
        setIsLoading(false);
      } else {
        const res = await axios.get(
          `${Config.apiUrl}/api/devices?filters[owner][id][$eq]=${id}&populate=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllDevices(res.data);
        setIsLoading(false);
      }
    };

    getDevices();
  }, []);

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
        <DevicesSearchRow />
        {allDevices.map((device) => (
          <DeviceItem item={device} />
        ))}
      </table>
    </Fragment>
  );
};

export default DevicesTable;
