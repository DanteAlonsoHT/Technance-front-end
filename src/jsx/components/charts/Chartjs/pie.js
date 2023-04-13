import React from "react";
import { Pie } from "react-chartjs-2";

const ChartPie = ({ color1, color2, color3, height, width }) => {
  const data = {
    datasets: [
      {
        data: [0.99, 0.01],
        borderWidth: 0,
        backgroundColor: [
          `${color1 ? color1 : "rgba(234, 122, 154, 0.7)"}`,
          `${color2 ? color2 : "rgba(234, 122, 154, 0.27)"}`,
        ],
        hoverBackgroundColor: [
          `${color1 ? color1 : "rgba(234, 122, 154, 0.7)"}`,
          `${color2 ? color2 : "rgba(234, 122, 154, 0.27)"}`,
        ],
      },
    ],
    labels: ["Desionización uS/cm", "-"],
  };

  const options = {
    responsive: true,
    legend: false,
    maintainAspectRatio: false,
  };

  return (
    <>
      <Pie data={data} options={options} />
    </>
  );
};

export default ChartPie;
