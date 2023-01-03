import React, { useEffect, useState, Fragment } from "react";
import Loading from "../../../layout/Loading";
import axios from "axios";
import { useParams } from "react-router-dom";

const DeviceSummary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [device, setDevice] = useState({});

  const { id } = useParams();

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
    <Fragment>
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
    </Fragment>
  );
};

export default DeviceSummary;
