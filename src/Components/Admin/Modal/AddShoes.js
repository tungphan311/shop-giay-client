import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import MultipleForm from "Components/Admin/Form/MultipleForm/MultipleForm";

function AAddShoesModal({ show, handleClose, handleAdd, handleAddAndClose }) {
  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>THÊM MỚI GIÀY</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MultipleForm />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Trở về
        </Button>
        <Button variant="info" onClick={() => handleAddAndClose(shoes)}>
          Thêm và đóng
        </Button>
        <Button variant="primary" onClick={() => handleAdd(shoes)}>
          Thêm
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default AAddShoesModal;
