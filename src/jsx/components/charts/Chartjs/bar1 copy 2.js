import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BarChart11 extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["Contenedor 1"],
      datasets: [
        {
          label: "Litros",
          data: [45000],
          borderColor: "#EA7A9A",
          borderWidth: "0",
          backgroundColor: "#5555EA77",
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
              min: 0,
              max: 100000,
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

export default BarChart11;
