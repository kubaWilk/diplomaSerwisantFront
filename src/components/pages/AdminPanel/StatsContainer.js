import React, { useState } from "react";

const StatsContainer = () => {
  const [statType, setStatType] = useState("Naprawy");
  const [intervalType, setIntervalType] = useState("daily");

  const onIntervalButtonClick = (e) => {
    const buttonText = e.target.value.toLowerCase();
    setIntervalType(buttonText);
  };

  return (
    <div className="p-2">
      <div className="flex flex-col">
        <div className="flex justify-center">
          <select
            className="w-[50%] m-1 p-1"
            onChange={(e) => setStatType(e.target.value)}
          >
            <option>Naprawy</option>
            <option>Koszty</option>
            <option>Zyski</option>
          </select>
          {statType.toLowerCase() === "naprawy" && (
            <select className="w-[50%] m-1 p-1">
              <option>Otwarte</option>
              <option>Zamknięte</option>
            </select>
          )}
        </div>
        <div className="m-4">
          <label htmlFor="dailyRadio" className="button ml-1 mr-1">
            <input
              type="radio"
              id="dailyRadio"
              value="daily"
              checked={intervalType === "daily"}
              onChange={onIntervalButtonClick}
            />
            Dziennie
          </label>
          <label htmlFor="weeklyRadio" className="button ml-1 mr-1">
            <input
              type="radio"
              id="weeklyRadio"
              value="weekly"
              checked={intervalType === "weekly"}
              onChange={onIntervalButtonClick}
            />
            tygodniowo
          </label>
          <label htmlFor="monthlyRadio" className="button ml-1 mr-1">
            <input
              type="radio"
              id="monthlyRadio"
              value="monthly"
              checked={intervalType === "monthly"}
              onChange={onIntervalButtonClick}
            />
            miesięcznie
          </label>
          <label htmlFor="yearlyRadio" className="button ml-1 mr-1">
            <input
              type="radio"
              id="yearlyRadio"
              value="yearly"
              checked={intervalType === "yearly"}
              onChange={onIntervalButtonClick}
            />
            rocznie
          </label>
        </div>
      </div>
    </div>
  );
};

export default StatsContainer;
