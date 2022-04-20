import React from "react";
import { Bar } from "react-chartjs-2";

export const TurnOver = ({ thisMonth, lastMonth }) => {
  const data = {
    labels: ["Last month active", "This month active"],
    datasets: [
      {
        data: [lastMonth, thisMonth],
        label: "Active subscribers",
        backgroundColor: ["#0024FF", "#0F1535"],
      },
    ],
  };

  const options = {
    title: {
      text: "Monthly Revenue",
    },
  };
  return (
    <div style={{ height: "150px" }}>
      <Bar options={options} data={data}></Bar>
    </div>
  );
};
