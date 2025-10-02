import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const GraphicsDona = ({ dataValues, labels }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Conteo de elementos",
        data: dataValues,
        backgroundColor: ["#F05E29", "#43A047", "#1E88E5", "#8E24AA"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" }, tooltip: { enabled: true } },
    cutout: "50%",
  };

  return (
    <div style={{ height: "350px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default GraphicsDona;
