import React from "react";
import { Modal, Button } from "react-bootstrap";

function AddShoesModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>THÊM MỚI GIÀY</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Trở về
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Thêm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddShoesModal;
