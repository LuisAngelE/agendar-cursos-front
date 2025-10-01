import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const GraphicsDona = () => {
  const labels = ["Red", "Blue", "Yellow"];
  const dataValues = [300, 50, 100];

  const data = {
    labels,
    datasets: [
      {
        label: "My First Dataset",
        data: dataValues,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    cutout: "50%",
  };

  return (
    <div style={{ height: "350px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default GraphicsDona;
