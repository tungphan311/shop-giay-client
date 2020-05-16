import React, { useState, useEffect } from "react";
import "./ProductDetail.scss";
import CImageSelector from "Components/client/CImageSelector";
import { vietNamCurrency, stringTruncate } from "utils";
import CButton from "Components/client/CButton";
import { cGetProductDetail } from "services/cProductService";
import { useDispatch } from "react-redux";
import { ACTION_ADD_PRODUCT_TO_CART } from "state/reducers/cCartReducer";

const MAX_STAR_WIDTH = 105;
const MAX_CHAR = 120;
const IntialState = {
  id: 0,
  code: "",
  name: "",
  description: "",
  rating: 0.0,
  styleName: "",
  brandName: "",
  genderName: "",
  price: 0,
  salePrice: 0,
  isOnSale: 0,
  images: [],
  sizes: [],
  reviewCount: 0,
};
const MAX_RATING = 5.0;
const CProductDetail = ({ id }) => {
  const [desExpanded, setDesExpanded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(0);
  const [product, setProduct] = useState(IntialState);
  const {
    code,
    name,
    description,
    rating,
    styleName,
    brandName,
    genderName,
    price,
    salePrice,
    isOnSale,
    images,
    sizes,
    reviewCount,
  } = product;

  useEffect(() => {
    cGetProductDetail(id).then((res) => {
      const data = JSON.parse(res.data.data);
      setProduct(data);
    });
  }, [id]);

  const dispatch = useDispatch();

  const addProductToCard = (id, size) =>
    dispatch({ type: ACTION_ADD_PRODUCT_TO_CART, payload: { id, size } });

  return (
    <div className="detail-display-bg">
      <div className="detail-display-wrapper clearfix responsive-mid">
        <CImageSelector
          imgs={images}
          className="detail-gallery-wrapper"
          imageContainerClassName="image-container"
        ></CImageSelector>
        <div className="detail-display-info-wrapper">
          <div className="detail-display-info-section default">
            <div className="detail-review-rating">
              <div className="detail-rating-star">
                <span
                  style={{
                    width: `${(rating / MAX_RATING) * MAX_STAR_WIDTH}px`,
                  }}
                ></span>
                <div className="detail-rating-review-count">
                  {reviewCount > 0
                    ? `(${reviewCount} review${reviewCount > 1 ? "s" : ""})`
                    : "(no reviews)"}
                </div>
              </div>
            </div>
            <h2 className="detail-title">{name}</h2>
            {price ? (
              <p className="detail-price">
                {isOnSale ? (
                  <span className="price">{vietNamCurrency(salePrice)}</span>
                ) : (
                  ""
                )}
                <span className={`${isOnSale ? "strokeText" : "price"}`}>
                  {vietNamCurrency(price)}
                </span>
              </p>
            ) : (
              ""
            )}
            <ul className="detail-additional-info">
              <li>Hãng: {brandName}</li>
              <li>Giới tính: {genderName}</li>
              <li>Sì tai: {styleName}</li>
              <li>Code: {code}</li>
              {description ? (
                <p className="detail-description excerpt">
                  {!desExpanded
                    ? stringTruncate(description, MAX_CHAR, "...")
                    : description}

                  {description.length > MAX_CHAR - 3 ? (
                    <span
                      onClick={() => setDesExpanded((prev) => !prev)}
                      className="detail-description-readmore read"
                    >
                      {desExpanded ? "Thu nhỏ" : "Đọc thêm"}
                    </span>
                  ) : (
                    ""
                  )}
                </p>
              ) : (
                ""
              )}
            </ul>
          </div>
          <div>
            <div className="detail-display-info-section default sizes">
              <div className="size-selection">
                <p className="detail-section-title">&nbsp;</p>
                <p className="detail-section-show-size">
                  <a href="/#">Size Chart</a>
                </p>
                <ul className="detail-all-size clearfix">
                  {sizes && sizes.length > 0
                    ? sizes.map((size, index) => (
                        <li key={index}>
                          <div
                            onClick={() => setSelectedSize(index)}
                            className={`label actived ${
                              index === selectedSize ? "selected" : ""
                            }`}
                          >
                            <span>{size}</span>
                          </div>
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>
          </div>
          <div className="detail-display-info-section detail-display-bag default">
            <CButton
              onClick={() => addProductToCard(id, sizes[selectedSize])}
              className="button"
              label="THÊM VÀO GIỎ"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CProductDetail;
