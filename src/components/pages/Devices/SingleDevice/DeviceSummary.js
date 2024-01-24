import React, {
  useEffect,
  useState,
  Fragment,
  useContext,
  useCallback,
} from "react";
import Loading from "../../../layout/Loading";
import { Config } from "../../../../config";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserContext from "../../../../context/User/UserContext";

const DeviceSummary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [device, setDevice] = useState({});

  const { id } = useParams();
  const { getToken } = useContext(UserContext);

  const fetchData = useCallback(async () => {
    const res = await axios.get(`${Config.apiUrl}/device/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    setDevice(res.data);
    setIsLoading(false);
  }, [setDevice, setIsLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      </ul>
    </Fragment>
  );
};

export default DeviceSummary;
