import React, { useState } from "react";
//import DropFile from "./DropFile";
import swal from "sweetalert";
import { Card } from "react-bootstrap";
import PageTitle from "../../../layouts/PageTitle";
import AreYouSureModal from "../../modal/AreYouSureModal";

const contactData = [
  {
    sede: "Universidad Tecnológica de León",
    name: "Dante Hernández",
    email: "dantealonsoht@gmail.com",
    linkedin: "https://www.linkedin.com/in/dante-alonso/",
  },
];

const ContactUs = ({ userDetails, token }) => {
  const [statusModal, setStatusModal] = useState(false);
  const [dataForm, setDataForm] = useState({
    title: "",
    message: "",
    //files: null,
  });

  const handleSubmitContactUs = () => {
    setStatusModal(!statusModal);
    fetch(
      `${
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_BACK_END_URL_DEV
          : process.env.REACT_APP_BACK_END_URL_PROD
      }/api/notifications/contact_information/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ ...dataForm, email: userDetails.email }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!!data?.detail)
          throw new Error("No estás autorizado para usar esta función.");
        if (!!data?.error) throw new Error("Error en la información llenada.");
        swal(
          "Mensaje fue enviado exitosamente!",
          "Gracias por tu participación en mejorar nuestra plataforma",
          "success"
        );
      })
      .catch((error) => {
        swal(
          "Oops",
          `Hubo un error en el servidor para mandar el correo, más información: .${error}`,
          "error",
          {
            button: "!Intentar de Nuevo!",
          }
        );
      });
  };

  const ContactCard = ({ sede, name, email, linkedin }) => (
    <Card className="">
      <Card.Header className="pb-0">
        <Card.Title>Sede: {sede}</Card.Title>
      </Card.Header>
      <Card.Body className="p-4">
        <h5 className="mb-4">Nombre: {name}</h5>
        <ul>
          <li className="mb-4">
            <i class="bx bxs-envelope mr-2"></i>Correo electrónico: {email}
          </li>
          <li className="mb-4">
          <i class='bx bxl-linkedin-square mr-2'></i>Linkedin URL: {<a href={linkedin} target="_blank" rel="noreferrer">Click Aquí</a>}
          </li>
        </ul>
      </Card.Body>
      <Card.Footer className="border-0 pt-0 d-flex justify-content-around">
        <a
          href={"mailto:" + email}
          className="btn btn-outline-primary"
          target="_blank"
          rel="noreferrer"
        >
          Enviar correo
        </a>
      </Card.Footer>
    </Card>
  );

  return (
    <div>
      <PageTitle pageHeading="" activeMenu="Contact us" motherMenu="Email" />
      <div className="row">
        {contactData.map(({ sede, name, email, linkedin }) => (
          <div className="col-12 col-lg-6">
            <ContactCard
              sede={sede}
              name={name}
              email={email}
              linkedin={linkedin}
            />
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h3>Contáctanos si quieres ayudarnos a mejorar nuestra aplicación!</h3>
            </div>
            <div className="card-body">
              <div className="pt-2">
                <div className="compose-content">
                  <form action="#" onSubmit={handleSubmitContactUs}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg-transparent"
                        placeholder="support@technance.com.mx"
                        disabled="true"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg-transparent"
                        placeholder=" Asunto:"
                        value={dataForm.title}
                        onChange={(e) => {
                          //console.log(dataForm);
                          setDataForm({
                            ...dataForm,
                            title: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        id="email-compose-editor"
                        className="textarea_editor form-control bg-transparent"
                        rows="5"
                        placeholder=" Escribe tu mensaje aquí ..."
                        value={dataForm.message}
                        onChange={(e) =>
                          setDataForm({
                            ...dataForm,
                            message: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                  </form>
                  {/*
                    <h5 className="mb-4">
                    <i className="fa fa-paperclip"></i> Añadir archivo
                  </h5>
                  <DropFile />
                      */}
                </div>
                <div className="text-left mt-4 mb-5">
                  <button
                    className="btn btn-primary btn-sl-sm mr-2"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!dataForm?.title || !dataForm?.message)
                        return swal(
                          "Oops",
                          "Información incompleta, checa si todos los campos han sido llenados correctamente.",
                          "error",
                          {
                            button: "Try again!",
                          }
                        );
                      setStatusModal(!statusModal);
                    }}
                  >
                    <span className="mr-2">
                      <i className="fa fa-paper-plane"></i>
                    </span>
                    Enviar
                  </button>
                  <button
                    className="btn btn-danger light btn-sl-sm"
                    type="button"
                    onClick={() =>
                      setDataForm({
                        title: "",
                        message: "",
                        //files: null,
                      })
                    }
                  >
                    <span className="mr-2">
                      <i className="fa fa-times" aria-hidden="true"></i>
                    </span>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          <AreYouSureModal
            statusModal={statusModal}
            closeModal={setStatusModal}
            handleOnSubmit={handleSubmitContactUs}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
