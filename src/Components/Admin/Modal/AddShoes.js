import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import MultipleForm from "Components/Admin/Form/MultipleForm/MultipleForm";

function AAddShoesModal({ show, handleClose, handleAdd, handleAddAndClose }) {
  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>THÊM MỚI GIÀY</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
    </Modal>
  );
}

export default AAddShoesModal;
