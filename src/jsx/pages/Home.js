import { Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import ShowMoreText from "react-show-more-text";
import Summary from "./Summary";
import { Component } from "react";
import CircularJSON from "circular-json";
import { Line } from "react-chartjs-2";

import { Col, Alert, Button, Badge, Media } from 'react-bootstrap'
import BarChart1 from "../components/charts/Chartjs/bar1";
import BarChart10 from "../components/charts/Chartjs/bar1 copy";
import BarChart11 from "../components/charts/Chartjs/bar1 copy 2";
import BarChart12 from "../components/charts/Chartjs/bar1 copy 3";

const data = {
  defaultFontFamily: 'Poppins',
  labels: ['-30seg', '-25seg', '-20seg', '-15seg', '-10seg', '-5seg', 'Now'],
  datasets: [
    {
      label: 'Decantazación (turbidez)',
      data: [80.81, 79.2, 80.54, 81.01, 80.22, 80.55, 78.56],
      borderColor: '#rgba(234, 228, 136, .75)',
      borderWidth: '2',
      backgroundColor: '#rgba(234, 228, 136, .25)',
    },
    {
      label: 'Filtro de Arena (turbidez)',
      data: [80.34, 79.55, 80.94, 81.81, 80.12, 80.05, 79.96],
      borderColor: '#rgba(154, 128, 236, .75',
      borderWidth: '1',
      backgroundColor: 'rgba(154, 128, 236, .25)',
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
          max: 83,
          min: 77,
          stepSize: 5,
          padding: 10,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          padding: 5,
        },
      },
    ],
  },
};

const testDecantacion = [80.81, 79.2, 80.54, 81.01, 80.22, 80.55, 78.56];
const testFiltroArena = [80.34, 79.55, 80.94, 81.81, 80.12, 80.05, 79.96];

const Home = () => {
  const [dataDecantacion, setDataDecantacion] = useState(testDecantacion); 
  const [dataFiltroArena, setFiltroArena] = useState(testFiltroArena);
  const [dataDualTurbo, setDataDualTurbo] = useState(data); 

  useEffect(() => {
    const interval = setInterval(() => {
      dataDecantacion.shift();
      dataDecantacion.push((Math.random()*2) + 79.25);
      const newData = dataDecantacion;
      dataFiltroArena.shift();
      dataFiltroArena.push((Math.random()*2) + 79.25);
      const newData2 = dataFiltroArena;
      setDataDecantacion(newData);
      setFiltroArena(newData2);

      setDataDualTurbo({...dataDualTurbo, datasets: [
        {
          label: 'Decantazación (turbidez)',
          data: newData,
          borderColor: '#rgba(234, 228, 136, .75)',
          borderWidth: '2',
          backgroundColor: '#rgba(234, 228, 136, .25)',
        },
        {
          label: 'Filtro de Arena (turbidez)',
          data: newData2,
          borderColor: '#rgba(154, 128, 236, .75',
          borderWidth: '1',
          backgroundColor: 'rgba(154, 128, 236, .25)',
        },
      ]});
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() =>
  console.log("Hola"), [dataDualTurbo])

  return (
    <div>
      <Alert
        variant={'danger'}
        className='alert-dismissible fade show'
      >
        El agua en el municipio de Toluca, está agotandose, realizando pedido...
        <strong>{data.msg}</strong> {data.text}
      </Alert>
      <Summary />
      <div className="row">
        <div className="container d-flex flex-wrap">
        <Card className="w-100">
            <Card.Header className=' border-0 pb-0'>
              <Card.Title>Planta Estado de México
              </Card.Title>
            </Card.Header>
            <Card.Body>
              {
                // GRAPHS
                <div className="row w-100">
                  <div className="col-12 col-md-6">
                    <h6>Decantazación y Filtro de Arena</h6>
                    <Line data={dataDualTurbo} options={options} height={150} />
                  </div>
                  <div className="col-12 col-md-6">
                    <h6>Filtro de Carbón</h6>
                    <BarChart1 />
                  </div>
                  <div className="col-12 col-md-6">
                  <h6>Desionización</h6>
                    <BarChart10 />
                  </div>
                </div>
                
              }
            </Card.Body>
            <Card.Footer className=' border-0 pt-0'>
              <Card.Text className=' d-inline'>Estatus:</Card.Text>
              <Card.Link href='#' className='float-right'>
                Ver ubicación
              </Card.Link>
            </Card.Footer>
          </Card>
        </div>
      </div>
      <div className="row">
        <div className="d-flex justify-content-evenly w-100 flex-wrap">
                  <div className="col-12 col-md-6">
        <Card>
            <Card.Header className=' border-0 pb-0'>
              <Card.Title>Municipio: Toluca</Card.Title>
            </Card.Header>
            <Card.Body style={{height: "15rem"}}>
              {
                // GRAPHS
                <div className="row">
                  <div className="col-12">
                    <h6>Litros en Contenedor</h6>
                    <BarChart11 />
                  </div>
                </div>
                
              }
            </Card.Body>
            <Card.Footer className=' border-0 pt-0'>
              <Card.Text className=' d-inline'>Estatus:</Card.Text>
            </Card.Footer>
          </Card>
          </div>
          <div className="col-12 col-md-6">
          <Card>
            <Card.Header className=' border-0 pb-0'>
              <Card.Title>Municipio: Ocoyoacac</Card.Title>
            </Card.Header>
            <Card.Body style={{height: "15rem"}}>
              {
                // GRAPHS
                <div className="row">
                  <div className="col-12">
                    <h6>Litros en Contenedor</h6>
                    <BarChart12 />
                  </div>
                </div>
                
              }
            </Card.Body>
            <Card.Footer className=' border-0 pt-0'>
              <Card.Text className=' d-inline'>Estatus:</Card.Text>
            </Card.Footer>
          </Card>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Home;
