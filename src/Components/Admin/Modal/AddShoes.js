import React from "react";
import { Modal } from "react-bootstrap";
import MultipleForm from "Components/Admin/Form/MultipleForm/MultipleForm";

function AAddShoesModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>THÊM MỚI GIÀY</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MultipleForm />
      </Modal.Body>
    </Modal>
  );
}

export default AAddShoesModal;
