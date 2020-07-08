import React, { useState, useEffect } from "react";
import CProductSection from "Components/client/CProductSection";

import { cGetProductListByBrand } from "services/cProductService";
import CMenuBar from "Components/client/CMenuBar/index";
import "./ProductByCategory.scss";
import CLoadingIndicator from "Components/client/CLoadingIndicator/index";
import CItemCard from "Components/client/CItemCard/index";
import CPagination from "Components/client/CPagination/index";
import CFilterBar from "Components/client/CFilterBar/index";

const intialCategories = [
  {
    label: "Danh sách sản phẩm",
    products: [],
  },
];

const CProductByCategory = ({ id, pageNumber }) => {
  if (pageNumber === undefined) {
    pageNumber = 1;
  }

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(intialCategories);

  if (id.id === undefined) {
    id = "Danh sách sản phẩm";
  } else {
    id = id.id;
  }

  console.log(id.id);
  const [label, setLabel] = useState(id);
  const [total, setTotal] = useState(0);
  const [per_page, setPerPage] = useState(5);
  const [current_page, setCurrentPage] = useState(pageNumber - 1);

  const Content = () =>
    categories[selectedCategory].products.map((item, index) => (
      <CItemCard key={index} {...item}></CItemCard>
    ));

  useEffect(() => {
    let perPage = localStorage.getItem("View");
    if (perPage === null) {
      perPage = 4;
    }
    let style = localStorage.getItem("Style");
    let size = localStorage.getItem("Size");
    setPerPage(perPage);
    console.log(perPage);
    const list = cGetProductListByBrand(
      id,
      pageNumber - 1,
      per_page,
      style,
      size
    ).then((res) => JSON.parse(res.data.data));
    const total = cGetProductListByBrand(
      id,
      pageNumber - 1,
      per_page,
      style,
      size
    ).then((res) => JSON.parse(res.data.totalRecords));

    Promise.all([list])
      .then(([listProducts]) => {
        setCategories((prev) => {
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
          let newState = [...prev];
          newState[0].products = listProducts.map(mapData);
          setLabel(id);
          setCurrentPage(pageNumber);

          return newState;
        }, setIsLoading(false));
      })

      .catch((error) => console.log(error));

    Promise.all([total]).then(([totalRecords]) => {
      setTotal(totalRecords);
    });
  }, [current_page, id, pageNumber, per_page]);

  return (
    <>
      <div className="d-flex" id="wrapper">
        <CMenuBar current_label={label} />

        <div className="page-content-wrapper">
          <section className={`homeSection`}>
            {label ? (
              <div
                className={`homeSection__header ${
                  categories.length === 1 && "homeSection__header_only"
                }`}
              >
                <div className="homeSection__header_title">{label}</div>
                {categories.length > 1 && (
                  <div className="homeSection__header_category">
                    <ul>
                      {categories.map((cat, catIndex) => (
                        <li
                          key={cat.label}
                          onClick={() =>
                            setSelectedCategory && setSelectedCategory(catIndex)
                          }
                          className={`${
                            selectedCategory === catIndex ? "active" : ""
                          }`}
                        >
                          {cat.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
            <div className="content">
              <div className="pagination-wrapper">
                <CPagination
                  category={label}
                  total={total}
                  per_page={per_page}
                  current_page={current_page}
                ></CPagination>
              </div>
              <div className="filter-wrapper">
                <CFilterBar
                  size_title={localStorage.getItem("Size")}
                  style_title={localStorage.getItem("Style")}
                  view={per_page}
                ></CFilterBar>
              </div>

              <div className="item-wrapper">
                {!isLoading ? <Content /> : <CLoadingIndicator />}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CProductByCategory;
