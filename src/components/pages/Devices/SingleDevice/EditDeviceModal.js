import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../layout/Loading";
import EditDeviceForm from "./EditDeviceForm";
import UserContext from "../../../../context/User/UserContext";
import { Config } from "../../../../config";
import Dialog from "../../../layout/DialogBase/DialogBase";

const EditDeviceModal = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [deviceData, setDeviceData] = useState({});

  const { id } = useParams();
  const { getToken } = useContext(UserContext);

  useEffect(() => {
    const fetchDevice = async () => {
      const res = await axios.get(`${Config.apiUrl}/device/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setDeviceData(res.data);
      setIsLoading(false);
    };

    fetchDevice();
  }, []);

  return (
    <Dialog>
      <div className="p-2 rounded-md flex flex-col">
        {isLoading ? <Loading /> : <EditDeviceForm deviceData={deviceData} />}
      </div>
    </Dialog>
  );
};

export default EditDeviceModal;
