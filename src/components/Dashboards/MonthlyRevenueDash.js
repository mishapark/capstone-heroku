import React from "react";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

export const MonthlyRevenueDash = ({ revenue }) => {
  const data = {
    labels: revenue.map((month) => {
      if (month._id == null) {
        month._id = "Other years";
      }
      return month._id;
    }),
    datasets: [
      {
        data: revenue.map((month) => {
          return month.totalMonthlyRevenue;
        }),
        label: "Monthly Revenue",
        backgroundColor: "rgba(0, 36, 255, 0.5)",
      },
    ],
  };

  const options = {
    title: {
      text: "Monthly Revenue",
    },
  };
  return (
    <div>
      <Line options={options} data={data}></Line>
    </div>
  );
};
