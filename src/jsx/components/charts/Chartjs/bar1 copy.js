import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BarChart10 extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["uS/cm"],
      datasets: [
        {
          label: "Desionización",
          data: [0.99],
          borderColor: "#EA7A9A",
          borderWidth: "0",
          backgroundColor: "#EA7A9A77",
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
              min: 0.5,
              max: 1.5,
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

export default BarChart10;
