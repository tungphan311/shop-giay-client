import React from "react";
import { Modal } from "react-bootstrap";

const RadioInput = ({ id, name, checked, title }) => (
  <div className="mb-2">
    <input type="radio" id={id} name={name} defaultChecked={checked} />
    <label htmlFor={id} style={{ paddingLeft: "20px" }}>
      {title}
    </label>
  </div>
);

function ExportFileModal({ show, handleClose, title, handleExport }) {
  const data = [
    { id: "current", title: "Trang hiện tại", checked: true },
    { id: "all", title: "Tất cả sản phẩm", checked: false },
    // { id: "current", title: "Trang hiện tại", checked: true },
  ];

  const type = [
    {
      id: "csv",
      title: "Xuất file .csv (Comma Seperated Values)",
      checked: true,
    },
    { id: "excel", title: "Xuất file .xlsx (Excel)", checked: false },
  ];

  const getCheckedRadio = (arr) => {
    let res = "";
    arr.forEach((s) => {
      if (s.checked) {
        res = s.id;
      }
    });

    return res;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const source = getCheckedRadio(e.target.source);
    const type = getCheckedRadio(e.target.type);

    handleExport(source, type);
  };

  return (
    <Modal show={show} onHide={handleClose} size="md">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="export" onSubmit={handleSubmit}>
          {data.map(({ id, title, checked }) => (
            <RadioInput key={id} id={id} title={title} checked={checked} name="source" />
          ))}

          <p>Chọn định dạng file xuất</p>
          {type.map(({ id, title, checked }) => (
            <RadioInput key={id} id={id} title={title} checked={checked} name="type" />
          ))}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <button className="btn btn-primary btn-border" onClick={handleClose}>
            Huỷ
          </button>
          <button className="btn btn-primary" type="submit" form="export">
            Xuất dữ liệu
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ExportFileModal;
