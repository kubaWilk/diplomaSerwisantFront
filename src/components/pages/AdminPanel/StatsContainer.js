import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Chart from "./Chart";
import "./fakeData";
import {
  RepairStatsDaily,
  RepairStatsMonthly,
  RepairStatsWeekly,
  RepairStatsYearly,
} from "./fakeData";
import UserContext from "../../../context/User/UserContext";
import axios from "axios";
import { Config } from "../../../config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StatsContainer = () => {
  const [dataType, setDataType] = useState("repair");
  const [statType, setStatType] = useState("bar");
  const [intervalType, setIntervalType] = useState("daily");
  const [chartData, setChartData] = useState();
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const { getToken } = useContext(UserContext);

  const onIntervalButtonClick = (e) => {
    const buttonText = e.target.value.toLowerCase();
    setIntervalType(buttonText);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const prepRepairStatData = (data) => {
    return {
      labels: data.map((element) => element.label),
      datasets: [
        {
          label: "Otwartych napraw",
          data: data.map((element) => element.repairsOpened),
        },
        {
          label: "Zamkniętych napraw",
          data: data.map((element) => element.repairsClosed),
        },
      ],
    };
  };

  const prepCostStatData = (data) => {
    return {
      labels: data.map((element) => element.label),
      datasets: [
        {
          label: "Część",
          data: data.map((element) => element.costsPart),
        },
        {
          label: "Usługa",
          data: data.map((element) => element.costsService),
        },
      ],
    };
  };

  const fetchChartData = useCallback(async () => {
    const res = await axios.get(
      `${
        Config.apiUrl
      }/statistics/${dataType}/${intervalType}?from=${formatDate(
        fromDate
      )}&to=${formatDate(toDate)}`,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );

    if (res.data.length === 0) {
      setChartData({ labels: "Brak danych", datasets: [] });
      return;
    }

    switch (dataType) {
      case "repair":
        setChartData(prepRepairStatData(res.data));
        break;
      case "cost":
        setChartData(prepCostStatData(res.data));
        break;
      default:
        setChartData(null);
        break;
    }
  }, [
    dataType,
    intervalType,
    fromDate,
    toDate,
    getToken,
    prepRepairStatData,
    prepCostStatData,
    setChartData,
  ]);

  useEffect(() => {
    switch (intervalType) {
      case "daily":
        setChartData(prepRepairStatData(RepairStatsDaily));
        break;
      case "weekly":
        setChartData(prepRepairStatData(RepairStatsWeekly));
        break;
      case "monthly":
        setChartData(prepRepairStatData(RepairStatsMonthly));
        break;
      case "yearly":
        setChartData(prepRepairStatData(RepairStatsYearly));
        break;
    }
  }, [intervalType]);

  useEffect(() => {
    fetchChartData();
  }, [fromDate, toDate, dataType, statType, intervalType]);

  return (
    <div className="p-2">
      <div className="flex flex-col">
        <div className="flex justify-center">
          <div className="mb-2 w-full flex flex-col justify-center">
            <label className="text-center">Rodzaj danych:</label>
            <select
              className="m-1 p-1 block"
              onChange={(e) => setDataType(e.target.value)}
            >
              <option value="repair">Naprawy</option>
              <option value="cost">Koszty</option>
            </select>
          </div>

          <div className="mb-2 w-full flex flex-col justify-center">
            <label className="text-center">Rodzaj wykresu:</label>
            <select
              className="m-1 p-1 block"
              onChange={(e) => setStatType(e.target.value)}
            >
              <option value="line">Liniowy</option>
              <option value="bar">Słupkowy</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <p className="p-1">Od: </p>
          <DatePicker
            className="border p-1"
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
          />
          <p className="p-1">Do: </p>
          <DatePicker
            className="border p-1"
            selected={toDate}
            onChange={(date) => setToDate(date)}
          />
        </div>

        <div className="m-4">
          <label htmlFor="dailyRadio" className="button ml-1 mr-1">
            <input
              type="radio"
              id="dailyRadio"
              value={"daily"}
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
      {chartData === undefined || chartData === null ? (
        <p className="text-center">Brak danych</p>
      ) : (
        <Chart data={chartData} type={statType} />
      )}
    </div>
  );
};

export default StatsContainer;
