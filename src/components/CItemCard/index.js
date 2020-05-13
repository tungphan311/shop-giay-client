import "./ItemCard.scss";
import React, { useState } from "react";
import { stringTruncate } from "utils";
import { vietNamCurrency } from "../../utils";

const CItemCard = ({
  name,
  type,
  price,
  description,
  image,
  salePrice,
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
          <a href={href}>
            <img src={image} alt={`${name} image`}></img>
          </a>
        </div>
        <div className="item-card__info">
          <div className="item-card__info_name">
            <a className={`${isHover ? "hover" : ""}`} href="/#">
              {stringTruncate(name, 30, "...")}
              <br />
              {type}
            </a>
          </div>
          <div className="item-card__info_price">
            {salePrice && <span>{vietNamCurrency(salePrice)}</span>}
            <span className={`${salePrice && "strokeText"}`}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CItemCard;
