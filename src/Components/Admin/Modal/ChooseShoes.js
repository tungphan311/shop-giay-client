import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import AProductSelect from "Components/Admin/ProductSelect/Select";

function ChooseShoesModal({
  show,
  handleClose,
  curShoes = null,
  curAmount = 0,
  curStocks = [],
  curStock = null,
  curStockId = 0,
  curPrice = 0,
  options,
  shoesList,
  colors,
  sizes,
  addNewItem,
}) {
  const [shoes, setShoes] = useState(curShoes);
  const [stock, setStock] = useState(curStock);
  const [stocks, setStocks] = useState(curStocks);
  const [stockId, setStockId] = useState(curStockId);
  const [amount, setAmount] = useState(curAmount);
  const [price, setPrice] = useState(curPrice);

  const stockDetail = (stock) => {
    const color = colors.find((c) => c.Id === stock.ColorId).Name;
    const size = sizes.find((s) => s.Id === stock.SizeId).Name;

    return `Màu: ${color}, Size: ${size}`;
  };

  const selectProduct = (selected) => {
    if (selected !== shoes) {
      let s = shoesList.find((x) => x.Id === selected.value).Stocks;
      s = s.map((s) => ({ value: s.Id, label: stockDetail(s) }));

      setShoes(selected);
      setStock(null);
      setStocks(s);
      setStockId(0);
    } else {
      setShoes(selected);
    }
  };

  const selectStock = (selected) => {
    setStock(selected);
    setStockId(selected.value);
  };

  const valid = () => stockId && price && amount;

  const resetForm = () => {
    setShoes(null);
    setStock(null);
    setStocks([]);
    setStockId(0);
    setAmount(0);
    setPrice(0);
  };

  const handleAdd = () => {
    addNewItem({ shoes, amount, stocks, stock, stockId, price });
    resetForm();
  };

  const handleCloseForm = () => {
    handleClose();
    resetForm();
  };

  return (
    <Modal
      show={show}
      onHide={handleCloseForm}
      dialogClassName="choose-shoes-modal"
      centered={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>CHỌN GIÀY</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ width: "100%" }}>
          <AProductSelect
            options={options}
            className="product-select"
            selectedOption={shoes}
            onChange={(selected) => selectProduct(selected)}
            placeholder="Chọn sản phẩm"
          />

          <AProductSelect
            options={stocks}
            className="product-select mt-2"
            selectedOption={stock}
            onChange={(selected) => selectStock(selected)}
            placeholder="Chọn phiên bản"
          />
        </div>
        <div style={{ display: "flex" }}>
          <InputGroup
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            postfix="VNĐ"
            title="Nhập giá tiền"
          />
          <InputGroup
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            name="amount"
            postfix="đôi"
            title="Nhập số lượng"
            classNames="ml-2"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          disabled={!valid()}
          className="btn btn-primary"
          onClick={handleAdd}
        >
          Cập nhật
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChooseShoesModal;

const InputGroup = ({
  value,
  type = "number",
  name,
  postfix,
  title,
  classNames = "",
  onChange,
}) => (
  <div className={`input-group ${classNames}`}>
    <label className="input-title">{title}</label>
    <div className="input-wrapper">
      <input
        type={type}
        name={name}
        className="amount-input"
        value={value}
        onChange={onChange}
      />
      <div className="input-group-append">
        <span className="input-group-text">{postfix}</span>
      </div>
    </div>
  </div>
);
