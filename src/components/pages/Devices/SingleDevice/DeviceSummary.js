import React, { useEffect, useState, Fragment, useContext } from "react";
import Loading from "../../../layout/Loading";
import { Config } from "../../../../config";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserContext from "../../../../context/User/UserContext";

const DeviceSummary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [device, setDevice] = useState({});

  const { id } = useParams();
  const {
    user: { jwt: token },
  } = useContext(UserContext);

  useEffect(() => {
    const getDevice = async () => {
      const res = await axios.get(
        `${Config.apiUrl}/api/devices/${id}?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
