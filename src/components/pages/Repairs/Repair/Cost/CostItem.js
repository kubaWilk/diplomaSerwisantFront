import React, { useState } from "react";
import { translateCostTypes } from "../../../../../Utils";
import Dialog from "../../../../layout/Dialog";

const CostItem = ({ cost, onRemove }) => {
  const costTypesToNames = {
    service: "Usługa",
    part: "Część",
  };

  const [deleteCostToggle, setDeleteCostToggle] = useState(false);

  return (
    <div className="flex flex-col w-[90%]">
      {deleteCostToggle && (
        <Dialog
          prompt="Czy chcesz usunąć wskazany element?"
          onApprove={() => {
            onRemove(cost);
            setDeleteCostToggle(false);
          }}
          onCancel={() => setDeleteCostToggle(false)}
        />
      )}
      <div className="flex flex-col items-start w-full">
        <div className="flex w-full justify-between items-center relative">
          <div className="flex flex-col">
            <div className="absolute top-0 right-1">
              <i
                onClick={() => setDeleteCostToggle(true)}
                className="fa-regular fa-trash-can text-black cursor-pointer"
              ></i>
            </div>
            <div>
              <p>
                <strong>Typ: </strong>
                {translateCostTypes(cost.type, costTypesToNames)}
              </p>
              <p>
                <strong>Nazwa:</strong> {cost.name}
              </p>
            </div>
          </div>
          <div className="flex mr-2 min-w-[10vw]">
            <p className="font-bold text-lg uppercase">{cost.price}zł</p>
          </div>
        </div>
        <div className="border border-gray-200 border-dotted w-full"></div>
      </div>
    </div>
  );
};

export default CostItem;
