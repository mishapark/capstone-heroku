import React from "react";
import { Bar } from "react-chartjs-2";

export const AnnualRevenueDash = ({ revenue }) => {
  const data = {
    labels: revenue.map((year) => {
      if (year._id == null) {
        year._id = "Other years";
      }
      return year._id;
    }),
    datasets: [
      {
        data: revenue.map((year) => {
          return year.totalAnnualRevenue;
        }),
        label: "Year Revenue",
        backgroundColor: "#0F1535",
      },
    ],
  };

  const options = {
    title: {
      text: "Year Revenue",
    },
  };
  return (
    <div>
      <Bar options={options} data={data}></Bar>
    </div>
  );
};
