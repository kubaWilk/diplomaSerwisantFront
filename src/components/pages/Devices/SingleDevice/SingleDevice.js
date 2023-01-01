import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../layout/Loading";

const SingleDevice = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [device, setDevice] = useState({});

  useEffect(() => {
    const getDevice = async () => {
      const res = await axios.get(`/devices/${id}`);
      setDevice(res.data);
      setIsLoading(false);
    };

    getDevice();
    //eslint-disable-next-line
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="p-2">
      <ul>
        <li>
          <strong>ID: </strong>
          {device.id}
        </li>
        <li>
          <strong>Producent: </strong>
          {device.manufacturer}
        </li>
        <li>
          <strong>Model: </strong>
          {device.model}
        </li>
        <li>
          <strong>Nr seryjny: </strong>
          {device.serialNumber}
        </li>
        <li>
          <strong>Stan przy przyjęciu: </strong>
          {device.stateAtArrival}
        </li>
      </ul>
    </div>
  );
};

export default SingleDevice;
