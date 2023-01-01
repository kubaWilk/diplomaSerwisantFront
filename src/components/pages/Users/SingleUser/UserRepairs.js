import React from "react";
import { useParams } from "react-router-dom";
import Repairs from "../../Repairs/Repairs";

const UserRepairs = () => {
  const { id } = useParams();
  return <Repairs filterId={Number.parseInt(id)} />;
};

export default UserRepairs;
