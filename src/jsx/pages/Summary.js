import React from "react";
import ChartDonught3 from "./donught3";
//import { Link } from "react-router-dom";
const Summary = () => {
   return (
  <div className="row">
        <div className="col-xl-3 col-xxl-6 col-sm-6">
          <div className="card grd-card">
            <div className="card-body">
              <div className="media align-items-center">
                <div className="media-body mr-2">
                  <h2 className="text-white font-w600">80.32%</h2>
                  <span className="text-white">Decantazación (turbidez)</span>
                </div>
                <div className="d-inline-block position-relative donut-chart-sale">
                  <ChartDonught3
                    backgroundColor="#FFFFFF"
                    backgroundColor2="#F6B4AF"
                    height="100"
                    width="100"
                    value={100 - (80.32/100)*100}
                  />
                  <small className="text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F6B4AF" class="bi bi-droplet-fill" viewBox="0 0 16 16" style={{transform: "scale(2)"}}>
                      <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"/>
                    </svg>
                  </small>
                  <span className="circle bg-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-6 col-sm-6">
          <div className="card grd-card">
            <div className="card-body">
              <div className="media align-items-center">
                <div className="media-body mr-2">
                  <h2 className="text-white font-w600">80.84%</h2>
                  <span className="text-white">Filtro de Arena (turbidez)</span>
                </div>
                <div className="d-inline-block position-relative donut-chart-sale">
                  <ChartDonught3
                    backgroundColor="#FFFFFF"
                    backgroundColor2="#F6B4AF"
                    height="100"
                    width="100"
                    value={100 - (80.84/100)*100}
                  />
                  <small className="text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F6B4AF" class="bi bi-hourglass-split" viewBox="0 0 16 16" style={{transform: "scale(2)"}}>
                    <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
                  </svg>
                  </small>
                  <span className="circle bg-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-6 col-sm-6">
          <div className="card grd-card">
            <div className="card-body">
              <div className="media align-items-center">
                <div className="media-body mr-2">
                  <h2 className="text-white font-w600">1.76 ppm</h2>
                  <span className="text-white">Filtro de Carbón</span>
                </div>
                <div className="d-inline-block position-relative donut-chart-sale">
                  <ChartDonught3
                    backgroundColor="#FFFFFF"
                    backgroundColor2="#F6B4AF"
                    height="100"
                    width="100"
                    value={100 - (1.76/2)*100}
                  />
                  <small className="text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F6B4AF" class="bi bi-c-circle" viewBox="0 0 16 16" style={{transform: "scale(2)"}}>
                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512Z"/>
                  </svg>
                  </small>
                  <span className="circle bg-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-6 col-sm-6">
          <div className="card grd-card">
            <div className="card-body">
              <div className="media align-items-center">
                <div className="media-body mr-2">
                  <h2 className="text-white font-w600">0.99 uS/cm</h2>
                  <span className="text-white">Desionización</span>
                </div>
                <div className="d-inline-block position-relative donut-chart-sale">
                  <ChartDonught3
                    backgroundColor="#FFFFFF"
                    backgroundColor2="#F6B4AF"
                    height="100"
                    width="100"
                    value={100 - (0.99/1)*100}
                  />
                  <small className="text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F6B4AF" class="bi bi-patch-plus" viewBox="0 0 16 16" style={{transform: "scale(2)"}}>
                    <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                  </svg>
                  </small>
                  <span className="circle bg-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
)
}

export default Summary;
