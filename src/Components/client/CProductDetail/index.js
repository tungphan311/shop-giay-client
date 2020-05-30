import React, { useState, useEffect } from "react";
import "./ProductDetail.scss";
import CImageSelector from "Components/client/CImageSelector";
import { vietNamCurrency, stringTruncate } from "utils";
import CButton from "Components/client/CButton";
import { cGetProductDetail } from "services/cProductService";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_ADD_PRODUCT_TO_CART } from "state/reducers/cCartReducer";
import history from "state/history";
import { toastErr } from "utils";
import { ACTION_GET_PRODUCT_DETAIL } from "../../../state/reducers/cProductReducer";
const MAX_STAR_WIDTH = 105;
const MAX_CHAR = 120;
const MAX_RATING = 5.0;
const CProductDetail = ({ id }) => {
  const [desExpanded, setDesExpanded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(0);
  const product = useSelector((state) => state.cproduct);
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
    ratingCount,
  } = product;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ACTION_GET_PRODUCT_DETAIL, payload: { id } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const addProductToCart = (id, size, stockId) =>
    dispatch({
      type: ACTION_ADD_PRODUCT_TO_CART,
      payload: { id, size, stockId },
    });

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
                  {ratingCount > 0
                    ? `(${ratingCount} review${ratingCount > 1 ? "s" : ""})`
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
          {sizes && sizes.length > 0 ? (
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
                              <span>{size.sizeName}</span>
                            </div>
                          </li>
                        ))
                      : ""}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="detail-display-info-section detail-display-bag default">
            {sizes && sizes.length > 0 ? (
              <CButton
                onClick={() =>
                  addProductToCart(
                    id,
                    sizes[selectedSize].sizeName,
                    sizes[selectedSize].stockId
                  )
                }
                className="button"
                label="THÊM VÀO GIỎ"
              />
            ) : (
              <div className="soldout">HẾT HÀNG</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CProductDetail;
