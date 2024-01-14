import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import SectionName from "../../../../layout/SectionName";
import AddButton from "../../../../layout/AddButton";
import CostItem from "./CostItem";
import axios from "axios";
import Loading from "../../../../layout/Loading";
import AddCostModal from "./AddCostModal";
import Dialog from "../../../../layout/Dialog";
import { useContext } from "react";
import SingleRepairContext from "../../../../../context/SingleRepair/SingleRepairContext";
import UserContext from "../../../../../context/User/UserContext";
import { Config } from "../../../../../config";

const Cost = () => {
  const { id } = useParams();
  const { repair, postCostAccept } = useContext(SingleRepairContext);
  const { costAccepted } = repair;
  const apiCall = `${Config.apiUrl}/cost/repair?id=${id}`;
  const navigate = useNavigate();
  const { isCustomer, getToken } = useContext(UserContext);
  //state
  const [costs, setCosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [summedPrice, setSummedPrice] = useState(0);
  const [addCostToggle, setAddCostToggle] = useState(false);
  const [approveCostModalToggle, setApproveCostModalToggle] = useState(false);

  const getCosts = useCallback(async () => {
    const res = await axios
      .get(apiCall, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .catch((e) => {});

    res && setCosts(res.data);
    setIsLoading(false);
  }, [setCosts, setIsLoading]);

  const removeCostItem = useCallback(async (cost) => {
    await axios
      .delete(`${Config.apiUrl}/cost/${cost.id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .catch((e) => console.log(e));
  });

  useEffect(() => {
    getCosts();
  }, [getCosts, removeCostItem]);

  useEffect(() => {
    if (addCostToggle === false) {
      setIsLoading(true);
      getCosts();
    }
  }, [addCostToggle]);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < costs.length; i++) {
      sum += Number(costs[i].price);
    }

    setSummedPrice(sum.toFixed(2));
  }, [costs]);

  const submitAcceptCost = () => {
    postCostAccept(id);
    setApproveCostModalToggle(false);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex w-full h-full flex-col items-center justify-start">
      {addCostToggle && (
        <AddCostModal
          closeToggle={setAddCostToggle}
          costs={costs}
          costSetter={setCosts}
        />
      )}
      <SectionName text={`Naprawa #${id}`} />
      <h2 className="uppercase text-xl">Kosztorys</h2>
      <div className="flex space-x-2">
        <p>Status:</p>
        {costAccepted ? (
          <p className="text-green-400">zaakceptowany przez klienta</p>
        ) : (
          <p className="text-red-600">niezaakceptowany</p>
        )}
      </div>

      <Link className="text-sm" onClick={() => navigate(-1)}>
        Powrót
      </Link>
      <div className="w-full h-full flex flex-col relative items-center">
        {costs
          ? costs.map((item) => (
              <CostItem key={item.id} cost={item} onRemove={removeCostItem} />
            ))
          : ""}
        <p className="text-2xl uppercase font-bold absolute bottom-10 left-10">
          Łącznie: {summedPrice} zł
        </p>
        {!costAccepted && isCustomer() && (
          <button
            onClick={() => setApproveCostModalToggle(true)}
            className="button"
          >
            Zaakceptuj koszt
          </button>
        )}
        {approveCostModalToggle && (
          <Dialog
            prompt="Czy chcesz zaakceptować kosztorys naprawy? Decyzja jest nieodwracalna i zobowiązuje do zapłaty za naprawę."
            onApprove={() => submitAcceptCost()}
            onCancel={() => setApproveCostModalToggle(false)}
          />
        )}
        {!isCustomer() && <AddButton onClick={() => setAddCostToggle(true)} />}
      </div>
    </div>
  );
};

export default Cost;
