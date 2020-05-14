import "./ItemCard.scss";
import React, { useState } from "react";
import { stringTruncate, vietNamCurrency } from "utils";
import history from "state/history";

const CItemCard = ({
  name,
  type,
  price,
  description,
  image,
  salePrice,
  isNew,
  isOnSale,
  href,
}) => {
  const [isHover, setHover] = useState(false);

  const handleMouseEnter = () => setHover(true);

  const handleMouseLeave = () => setHover(false);

  return (
    <div
      className="item-card__container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`item-card__background ${
          isHover ? "item-card__background_hover" : ""
        }`}
      ></div>
      <div className="item-card__content">
        <div className="item-card__image">
          <div onClick={() => history.push(href)}>
            <img src={image} alt={`${name}`}></img>
          </div>
        </div>
        <div className="item-card__info">
          <div className="item-card__info_name">
            <div
              className={`${isHover ? "hover" : ""}`}
              onClick={() => history.push(href)}
            >
              {stringTruncate(name, 30, "...")}
              <br />
              {type}
            </div>
          </div>
          <div className="item-card__info_price">
            {isOnSale ? <span>{vietNamCurrency(salePrice)}</span> : ""}
            <span className={`${isOnSale && "strokeText"}`}>
              {vietNamCurrency(price)}
            </span>
          </div>
        </div>
        <div className={`item-card__add-info ${isHover ? "hover" : ""}`}>
          <div className="description">
            {description && stringTruncate(description, 69, "...")}
          </div>
          <div className="shipping">
            <div className="icon">FREE SHIPPING</div>
            {isNew ? <div className="icon new">HÀNG MỚI</div> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CItemCard;
