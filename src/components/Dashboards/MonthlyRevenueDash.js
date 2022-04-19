import React from "react";
import { Bar } from "react-chartjs-2";

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
        backgroundColor: "#0024FF",
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
      <Bar options={options} data={data}></Bar>
    </div>
  );
};
