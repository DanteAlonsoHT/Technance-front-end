import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BarChart1 extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["PPM"],
      datasets: [
        {
          label: "Filtro de Carbón",
          data: [1.76],
          borderColor: "#EA7A9A",
          borderWidth: "0",
          backgroundColor: "#EA7A9A",
        },
      ],
    };

    const options = {
      legend: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 1.5,
              max: 2,
            },
          },
        ],
        xAxes: [
          {
            // Change here
            barPercentage: 0.5,
          },
        ],
      },
    };

    return (
      <>
        <Bar data={data} height={150} options={options} />
      </>
    );
  }
}

export default BarChart1;
