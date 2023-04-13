import React, { Fragment, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { store } from "../../../../store/store";
import {
  loadingToggleAction,
  updateAction,
} from "../../../../store/actions/AuthActions";
import swal from "sweetalert";
import PageTitle from "../../../layouts/PageTitle";

const AppProfile = () => {
  const [activeToggle, setActiveToggle] = useState("aboutMe");
  const regexText = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  const regexNumbers = /^\d+$/;
  const stateRedux = store.getState();
  const data = stateRedux.auth.auth;

  let errorsObj = { email: "", password: "" };
  const [email, setEmail] = useState(data.userDetails.email);
  const [errors, setErrors] = useState(errorsObj);
  const [fullName, setFullName] = useState(data.userDetails.full_name);
  const [preferredName, setPreferredName] = useState(data.userDetails.preferred_name);
  const [password, setPassword] = useState("");
  const [imageProfile, setImageProfile] = useState(null);

  const [imageName, setImageName] = useState(null);
  const imageProfileRef = useRef();
  const fileReader = new FileReader();

  const dispatch = useDispatch();

  function onUpdateUp(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (fullName === "") {
      errorObj.fullName = "Nombre completo es requerido";
      error = true;
    } else if (!regexText.test(fullName)) {
      errorObj.fullName = "Solo letras son permitidas en este campo";
      error = true;
    }

    if (preferredName === "") {
      errorObj.preferredName = "Nombre preferido es requerido";
      error = true;
    }

    if (email === "") {
      errorObj.email = "Correo electrónico es requerido";
      error = true;
    }

    setErrors(errorObj);

    if (error) return;
    dispatch(loadingToggleAction(true));

    dispatch(
      updateAction(
        data.authToken,
        data.userDetails.id,
        fullName,
        preferredName,
        email,
        password,
        imageProfile
      )
    );
  }

  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="App" />
      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content">
                <div className="cover-photo"></div>
              </div>
              <div className="profile-info">
                <div className="profile-photo">
                  <img
                    src={`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BACK_END_URL_DEV: ''}${data.userDetails.image_profile}`}
                    className="img-fluid rounded-circle"
                    alt="profile"
                  />
                </div>
                <div className="profile-details">
                  <div className="profile-name px-3 pt-2">
                    <h4 className="text-primary mb-0">
                      {data.userDetails.first_name}
                    </h4>
                    <p>Usuario</p>
                  </div>
                  <div className="profile-email px-2 pt-2">
                    <h4 className="text-muted mb-0">
                      {data.userDetails.email}
                    </h4>
                    <p>Correo electrónico</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-8">
          <div className="card">
            <div className="card-body">
              <div className="profile-tab">
                <div className="custom-tab-1">
                  <ul className="nav nav-tabs">
                    <li
                      className="nav-item"
                      onClick={() => setActiveToggle("aboutMe")}
                    >
                      <Link
                        to="#about-me"
                        data-toggle="tab"
                        className={`nav-link ${
                          activeToggle === "aboutMe" ? "active show" : ""
                        }`}
                      >
                        Sobre mi
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="#profile-settings"
                        data-toggle="tab"
                        onClick={() => setActiveToggle("setting")}
                        className={`nav-link ${
                          activeToggle === "setting" ? "active show" : ""
                        }`}
                      >
                        Editar perfil
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      id="about-me"
                      className={`tab-pane fade ${
                        activeToggle === "aboutMe" ? "active show" : ""
                      }`}
                    >
                      <div className="profile-personal-info">
                        <h4 className="text-primary my-4">
                          Información Personal
                        </h4>
                        <div className="row mb-2">
                          <div className="col-6 col-md-4">
                            <h5 className="f-w-500">
                              {" "}
                              Nombre completo
                              <span className="pull-right">:</span>
                            </h5>
                          </div>
                          <div className="col-6 col-md-8">
                            <span>
                              {data.userDetails.full_name}
                            </span>
                          </div>
                        </div>
												<div className="row mb-2">
                          <div className="col-6 col-md-4">
                            <h5 className="f-w-500">
                              {" "}
                              Nombre preferido
                              <span className="pull-right">:</span>
                            </h5>
                          </div>
                          <div className="col-6 col-md-8">
                            <span>
                              {data.userDetails.preferred_name}
                            </span>
                          </div>
                        </div>												
                        <div className="row mb-2">
                          <div className="col-6 col-md-4">
                            <h5 className="f-w-500">
                              Correo electrónico
                              <span className="pull-right">:</span>
                            </h5>
                          </div>
                          <div className="col-6 col-md-8">
                            <span>{data.userDetails.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="profile-settings"
                      className={`tab-pane fade ${
                        activeToggle === "setting" ? "active show" : ""
                      }`}
                    >
                      <div className="pt-3">
                        <div className="settings-form">
                          <h4 className="text-primary py-2">
                            Configuración del Perfil
                          </h4>
                          <form onSubmit={onUpdateUp}>
                            <div className="form-row">
                              <div className="form-group col-md-6">
                                <label>Nombre completo</label>
                                <input
                                  type="text"
                                  className="form-control mb-1"
                                  value={fullName}
                                  placeholder="nombre completo"
                                  onChange={(e) => setFullName(e.target.value)}
                                />
                                {errors.fullName && (
                                  <div className="text-primary fs-12">
                                    *{errors.fullName}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-md-6">
                                <label>Nombre preferido</label>
                                <input
                                  type="text"
                                  className="form-control mb-1"
                                  value={preferredName}
                                  placeholder="nombre preferido"
                                  onChange={(e) =>
                                    setPreferredName(e.target.value)
                                  }
                                />
                                {errors.preferredName && (
                                  <div className="text-primary fs-12">
                                    *{errors.preferredName}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="form-group col-md-6">
                                <label>Correo electrónico</label>
                                <input
                                  type="email"
                                  className="form-control mb-1"
                                  value={email}
                                  placeholder="correo electrónico"
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && (
                                  <div className="text-primary fs-12">
                                    *{errors.email}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-md-6">
                                <label>Contraseña</label>
                                <input
                                  type="contraseña"
                                  className="form-control mb-1"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  placeholder="contraseña"
                                  autoComplete="off"
                                />
                                {errors.password && (
                                  <div className="text-primary fs-12">
                                    *{errors.password}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="form-group col-12 col-md-5">
                                <label className="mb-1">
                                  Imagen de perfil
                                </label>
                                <label
																	className="d-block mx-auto custom-file-upload p-2 btn btn-primary"
																>
                                  <input
                                    type="file"
                                    name="archivo"
                                    accept="image/*"
                                    id="FileUploaded"
                                    onChange={(e) => {
                                      if (e.target.files.length > 0) {
                                        //console.log(e.target.files[0]);
                                        fileReader.readAsDataURL(
                                          e.target.files[0]
                                        );
                                        if (e.target.files[0].size > 1048576) {
                                          swal(
                                            "Oops! Tamaño de Archivo",
                                            "El limite de subida de archivos es de 1MB, Intenta nuevamente con una imagen diferente",
                                            "error"
                                          );
                                        } else {
                                          fileReader.onloadend = () => {
                                            setImageName(
                                              e.target.files[0].name
                                            );
                                            setImageProfile(fileReader.result);
                                          };
                                        }
                                      }
                                    }}
                                    ref={imageProfileRef}
                                    hidden
                                  />
                                  {imageProfile
                                    ? `Imagen cargada: ${imageName.substr(
                                        0,
                                        20
                                      )}...`
                                    : "Selecciona imagen de perfil"}
                                </label>
                              </div>
                            </div>
                            <button className="btn btn-primary" type="submit">
                              Guardar perfil
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AppProfile;
