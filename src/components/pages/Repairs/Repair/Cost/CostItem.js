import React, { useCallback, useState } from "react";
import { useContext } from "react";
import UserContext from "../../../../../context/User/UserContext";
import { translateCostTypes } from "../../../../../Utils";
import Dialog from "../../../../layout/Dialog";
import axios from "axios";
import { Config } from "../../../../../config";

const CostItem = ({ cost, toggle, toggleSetter }) => {
  const { isCustomer } = useContext(UserContext);

  const { getToken } = useContext(UserContext);

  const onRemove = useCallback(
    async (cost) => {
      await axios
        .delete(`${Config.apiUrl}/cost/${cost.id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        .catch((e) => console.log(e));
    },
    [getToken]
  );

  return (
    <div className="flex flex-col w-[90%]">
      {toggle && (
        <Dialog
          prompt="Czy chcesz usunąć wskazany element?"
          onApprove={async () => {
            await onRemove(cost);
            toggleSetter(false);
          }}
          onCancel={() => toggleSetter(false)}
        />
      )}
      <div className="flex flex-col items-start w-full">
        <div className="flex w-full justify-between items-center relative">
          <div className="flex flex-col">
            {!isCustomer() && (
              <div className="absolute top-0 right-1">
                <i
                  onClick={() => toggleSetter(true)}
                  className="fa-regular fa-trash-can text-black cursor-pointer"
                ></i>
              </div>
            )}
            <div>
              <p>
                <strong>
                  Typ: {cost.costType === "PART" ? "Część" : "Usługa"}
                </strong>
              </p>
              <p>
                <strong>Nazwa:</strong> {cost.name}
              </p>
            </div>
          </div>
          <div className="flex mr-2 min-w-[10vw]">
            <p className="font-bold text-lg uppercase">{cost.price} zł</p>
          </div>
        </div>
        <div className="border border-gray-200 border-dotted w-full"></div>
      </div>
    </div>
  );
};

export default CostItem;
