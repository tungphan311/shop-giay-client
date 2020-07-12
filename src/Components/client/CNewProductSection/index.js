import React, { useState, useEffect } from "react";
import "./CNewProductSection.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clientGetProductAction } from "state/actions/index";
import { vietNamCurrency } from "utils/index";
import CLoadingIndicator from "../CLoadingIndicator/index";

const CNewProductSection = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clientGetProductAction({ isNew: 1, pageSize: 12 }))
      .then((res) => {
        const data = JSON.parse(res.data);
        setProductList((prev) => {
          const mapData = (shoes) => ({
            name: shoes.name,
            type: shoes.styleName,
            price: shoes.price,
            salePrice: shoes.salePrice,
            image: shoes.imagePath,
            description: shoes.description,
            isNew: shoes.isNew,
            isOnSale: shoes.isOnSale,
            href: "/products/" + shoes.id,
          });
          let newState = data.map(mapData);
          return [...newState];
        }, setIsLoading(false));
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="new-product-section__container">
      <div className="client-default-container">
        <header className="section__header">
          <div class="section__header-stack">
            <h2 class="section__title heading h3">WHAT'S HOT!</h2>
          </div>
          <Link to={"/category"} class="section__action-link link">
            Xem tất cả{" "}
            <svg
              class="icon icon--tail-right"
              viewBox="0 0 24 24"
              role="presentation"
            >
              <path
                fill="currentColor"
                d="M22.707 11.293L15 3.586 13.586 5l6 6H2c-.553 0-1 .448-1 1s.447 1 1 1h17.586l-6 6L15 20.414l7.707-7.707c.391-.391.391-1.023 0-1.414z"
              ></path>
            </svg>
          </Link>
        </header>

        <div
          className={`product-list product-list--horizontal ${
            isLoading ? "loading" : ""
          }`}
        >
          {isLoading ? (
            <CLoadingIndicator />
          ) : (
            productList.map((item, index) => (
              <div
                key={index}
                className="product-item product-item--horizontal  1/2--tablet 1/3--lap-and-up"
              >
                <Link
                  to={item.href}
                  className="product-item__image-wrapper product-item__image-wrapper--with-secondary"
                >
                  <div className="aspect-ratio aspect-ratio--square">
                    <img
                      alt="shoes__image"
                      class="product-item__primary-image image--blur-up lazyautosizes ls-is-cached lazyloaded"
                      src={item.image}
                    ></img>
                  </div>
                </Link>
                <div class="product-item__info">
                  <div class="product-item__info-inner">
                    <Link
                      to={item.href}
                      class="product-item__title text--strong link"
                    >
                      {item.name}
                      <br></br>
                      {item.type}
                    </Link>
                    <div class="product-item__price-list price-list">
                      {item.isOnSale ? (
                        <>
                          <span class="price price--highlight">
                            {vietNamCurrency(item.salePrice)}
                          </span>
                          <span class="price price--compare">
                            {vietNamCurrency(item.price)}
                          </span>
                        </>
                      ) : (
                        <span class="price">{vietNamCurrency(item.price)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CNewProductSection;
