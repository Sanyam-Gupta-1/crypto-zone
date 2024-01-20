import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";

const Chart = ({ arr = [], currency, days }) => {
  const prices = [];
  const date = [];

  for (let i = 0; i < arr.length; i++) {
    if (days === "24h") date.push(new Date(arr[i][0]).toLocaleTimeString());
    else date.push(new Date(arr[i][0]).toLocaleDateString());
    prices.push(arr[i][1]);
  }
  // console.log(arr)
  // console.log(date);
  // console.log(arr[0][1]);
  // console.log(prices);
  return (
    <Line
      height="100%"
      width="100%"
      options={{ responsive: true, maintainAspectRatio: false }}
      data={{
        labels: date,
        datasets: [
          {
            label: `Price in ${currency}`,
            data: prices,
            borderColor: "rgb(255,99,132)",
            backgroundColor: "rgba(255,99,132,0.5)",
          },
        ],
      }}
    />
  );
};

export default Chart;
