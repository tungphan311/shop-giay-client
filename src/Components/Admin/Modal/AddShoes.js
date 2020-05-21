import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AddShoesForm from "Components/Admin/Modal/AddShoesForm";

function AAddShoesModal({ show, handleClose, handleAdd, handleAddAndClose }) {
  // an placeholder state
  // TODO: update shoes object with exact key
  const [shoes] = useState({ title: "Shoes", year: "2020" });

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>THÊM MỚI GIÀY</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddShoesForm />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Trở về
        </Button>
        <Button variant="info" onClick={() => handleAddAndClose(shoes)}>
          Thêm và đóng
        </Button>
        <Button variant="primary" onClick={() => handleAdd(shoes)}>
          Thêm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AAddShoesModal;
