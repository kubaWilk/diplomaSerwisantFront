import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Chart = ({ data, type }) => {
  return (
    <div>
      {type === "bar" && <Bar data={data} />}
      {type === "line" && <Line data={data} />}
    </div>
  );
};

export default Chart;
