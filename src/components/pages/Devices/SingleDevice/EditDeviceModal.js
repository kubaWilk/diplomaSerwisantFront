import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../layout/Loading";
import EditDeviceForm from "./EditDeviceForm";
import UserContext from "../../../../context/User/UserContext";
import { Config } from "../../../../config";

const EditDeviceModal = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [deviceData, setDeviceData] = useState({});

  const { id } = useParams();
  const {
    user: { jwt: token },
  } = useContext(UserContext);

  useEffect(() => {
    const fetchDevice = async () => {
      const res = await axios.get(
        `${Config.apiUrl}/api/devices/${id}?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDeviceData(res.data);
      setIsLoading(false);
    };

    fetchDevice();
  }, []);

  return (
    <div className="w-screen h-screen z-50 fixed top-0 right-0 bg-gray-200 bg-opacity-70">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="bg-white border-2 border-black p-2 rounded-md flex flex-col">
          {isLoading ? <Loading /> : <EditDeviceForm deviceData={deviceData} />}
        </div>
      </div>
    </div>
  );
};

export default EditDeviceModal;
