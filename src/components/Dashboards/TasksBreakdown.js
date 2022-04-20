import React from "react";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

export const TasksBreakdown = ({ tasks }) => {
  const data = {
    labels: ["Approved", "In Progress"],
    datasets: [
      {
        data: [
          tasks.filter((tasks) => tasks.RFQstages === "Approved").length,
          tasks.filter((tasks) => tasks.RFQstages === "Initiated").length,
        ],
        label: ["Tasks"],
        backgroundColor: ["rgba(0, 36, 255, 0.5)", "rgba(0, 80, 255, 0.5)"],
      },
    ],
  };

  const options = {
    title: {
      text: "Monthly Revenue",
    },
    maintainAspectRatio: false,
  };
  return (
    <div>
      {console.log(
        tasks.map((task) => {
          if (task.RFQstages === "Initiated") {
            return task;
          }
        })
      )}
      <Bar options={options} data={data} height="300px" width="200px"></Bar>
    </div>
  );
};
