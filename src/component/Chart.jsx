import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({ arr = [], currency }) {
  const prices = [];
  const date = [];

  for (let index = 0; index < arr.length; index++) {
    date.push(new Date(arr[index][0]).toLocaleDateString());
    prices.push(arr[index][1]);
  }
  const data = {
    labels: date,
    datasets: [
      {
        label: `Price Chart In ${currency}`,
        data: prices,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  return (
    <div >
      <Line
      options={
        {
            responsive:true,
        }
      }
      data={data} />
    </div>
  );
}
