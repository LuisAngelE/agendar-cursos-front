import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graphics = ({ dataValues, labels }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Conteo de elementos",
        data: dataValues,
        backgroundColor: ["#F05E29", "#43A047", "#1E88E5", "#8E24AA"],
        borderColor: ["#F05E29", "#43A047", "#1E88E5", "#8E24AA"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Gráfica de Barras" },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div style={{ height: "350px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graphics;
