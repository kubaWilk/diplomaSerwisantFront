import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import SectionName from "../../../../layout/SectionName";
import AddButton from "../../../../layout/AddButton";
import CostItem from "./CostItem";
import axios from "axios";
import Loading from "../../../../layout/Loading";
import AddCostModal from "./AddCostModal";

const Cost = () => {
  const { id } = useParams();
  const apiCall = `/costs?repairID=${id}`;
  const navigate = useNavigate();
  //state
  const [costs, setCosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [summedPrice, setSummedPrice] = useState(0);
  const [addCostToggle, setAddCostToggle] = useState(false);

  const getCosts = async () => {
    const res = await axios.get(apiCall);

    setCosts(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getCosts();
  }, []);

  useEffect(() => {
    getCosts();
  }, [addCostToggle]);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < costs.length; i++) {
      sum += Number(costs[i].price);
    }

    setSummedPrice(sum.toFixed(2));
  }, [costs]);

  const removeCostItem = (cost) => {
    axios.delete(`/costs/${cost.id}`);
    setCosts(costs.filter((e) => e !== cost));
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex w-full flex-col items-center justify-start">
      {addCostToggle && <AddCostModal closeToggle={setAddCostToggle} />}
      <SectionName text={`Naprawa #${id}`} />
      <h2 className="uppercase text-xl">Kosztorys</h2>
      <Link className="text-sm" onClick={() => navigate(-1)}>
        Powrót
      </Link>
      <div className="w-full h-full flex flex-col relative items-center">
        {costs.map((item) => (
          <CostItem key={item.id} cost={item} onRemove={removeCostItem} />
        ))}
        <p className="text-2xl uppercase font-bold absolute bottom-10 left-10">
          Łącznie: {summedPrice}zł
        </p>
        <AddButton onClick={() => setAddCostToggle(true)} />
      </div>
    </div>
  );
};

export default Cost;
