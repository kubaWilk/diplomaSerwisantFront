import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../layout/Loading";
import DevicesSearchRow from "./DevicesSearchRow";
import DeviceItem from "./DeviceItem";
import { useParams } from "react-router-dom";

const DevicesTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allDevices, setAllDevices] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getDevices = async () => {
      if (id === undefined) {
        const res = await axios.get(`/devices`);
        setAllDevices(res.data);
        setIsLoading(false);
      } else {
        const res = await axios.get(`/devices?ownerID=${id}`);
        setAllDevices(res.data);
        setIsLoading(false);
      }
    };

    getDevices();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <table className="text-center repair-table w-[90%]">
      <thead>
        <tr>
          <th>ID</th>
          <th>Producent</th>
          <th>Model</th>
          <th>Nr seryjny:</th>
          <th>Właściciel</th>
        </tr>
      </thead>
      <DevicesSearchRow />
      {allDevices.map((device) => (
        <DeviceItem item={device} />
      ))}
    </table>
  );
};

export default DevicesTable;
