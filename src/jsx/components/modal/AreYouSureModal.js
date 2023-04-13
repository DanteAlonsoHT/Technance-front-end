import { Button, Modal } from "react-bootstrap";

const AreYouSureModal = ({statusModal, closeModal, handleOnSubmit}) => (
  <Modal className="fade bd-example-modal-lg" show={statusModal} size="lg">
    <Modal.Header>
      <Modal.Title>Confirmación de Mensaje</Modal.Title>
      <Button variant="" className="close" onClick={() => closeModal(false)}>
        <span>&times;</span>
      </Button>
    </Modal.Header>
    <Modal.Body>
      Tu mensaje podrá tener una respuesta dentro de 72 horas, este tipo de mensajes son recomendados para:
      {
        <ul className="my-2">
          <li className="m-2">1. Dar retroalimentación acerca de la plataforma</li>
          <li className="m-2">2. Sugerir una nueva funcionalidad al sistema</li>
          <li className="m-2">3. Informar sobre un fallo dentro de la plataforma</li>
        </ul>
      }
    </Modal.Body>
    <Modal.Footer className="py-1">
      <Button variant="success light" onClick={handleOnSubmit}>
        Enviar
      </Button>
      <Button variant="danger light" onClick={() => closeModal(false)}>
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
);

export default AreYouSureModal;
