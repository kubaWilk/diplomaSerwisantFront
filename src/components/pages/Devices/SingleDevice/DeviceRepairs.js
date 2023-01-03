import React from "react";
import { useParams } from "react-router-dom";
import Repairs from "../../Repairs/Repairs";

const DeviceRepairs = () => {
  const { id } = useParams();
  return <Repairs filterDeviceID={Number.parseInt(id)} />;
};

export default DeviceRepairs;
