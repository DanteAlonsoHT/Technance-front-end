import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BarChart6 extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Red",
          backgroundColor: "#8BC740",
          hoverBackgroundColor: "#8BC740",
          data: ["12", "12", "12", "12", "12", "12", "12"],
        },
        {
          label: "Green",
          backgroundColor: "#27BC48",
          hoverBackgroundColor: "#27BC48",
          data: ["12", "12", "12", "12", "12", "12", "12"],
        },
        {
          label: "Blue",
          backgroundColor: "#EA7A9A",
          hoverBackgroundColor: "#EA7A9A",
          data: ["12", "12", "12", "12", "12", "12", "12"],
        },
      ],
    };
    const options = {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltips: {
        mode: "index",
        intersect: false,
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
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

export default BarChart6;
