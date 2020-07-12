import React, { useState, useEffect } from "react";
import CLoadingIndicator from "Components/client/CLoadingIndicator";
import CItemCard from "Components/client/CItemCard";

import { cGetProductListByBrand } from "services/cProductService";
import CMenuBar from "Components/client/CMenuBar/index";
import "./ProductByCategory.scss";
import CPagination from "Components/client/CPagination/index";
import CFilterBar from "Components/client/CFilterBar/index";
import { NoDataComponent } from "utils/utils";

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
  if (id === undefined) {
    id = "Danh sách sản phẩm";
  }
  const [label, setLabel] = useState(id);
  const [total, setTotal] = useState(0);
  const [per_page, setPerPage] = useState(12);
  const [current_page, setCurrentPage] = useState(pageNumber - 1);
  const [size, setSize] = useState(0);
  const [style, setStyle] = useState("");

  const clearFilter = () => {
    setSize(0);
    setStyle("");
    setPerPage(12);
  };

  const updateSize = (selected_size) => {
    setSize(selected_size);
  };

  const updateStyle = (selected_style) => {
    setStyle(selected_style);
  };
  const updatePerPage = (selected_perpage) => {
    setPerPage(selected_perpage);
  };

  const Content = () =>
    categories[selectedCategory].products.map((item, index) => (
      <CItemCard key={index} {...item}></CItemCard>
    ));

  useEffect(() => {
    const list = cGetProductListByBrand(
      id,
      pageNumber,
      per_page,
      style,
      size
    ).then((res) => JSON.parse(res.data.data));
    const total = cGetProductListByBrand(
      id,
      pageNumber,
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
  }, [current_page, id, pageNumber, per_page, size, style]);

  return (
    <div className="layout">
      <div className="body-container">
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
                              setSelectedCategory &&
                              setSelectedCategory(catIndex)
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
                <div className="filter-wrapper">
                  <CFilterBar
                    set_style={updateStyle}
                    set_size={updateSize}
                    set_view={updatePerPage}
                    clear_filter={clearFilter}
                    size_title={size}
                    style_title={style}
                    view={per_page}
                  ></CFilterBar>
                </div>

                <div className="item-wrapper">
                  {isLoading ? (
                    <CLoadingIndicator />
                  ) : total !== 0 ? (
                    <Content />
                  ) : (
                    <NoDataComponent title="sản phẩm" />
                  )}
                </div>
              </div>
              <CPagination
                category={label}
                total={total}
                per_page={per_page}
                current_page={current_page}
              ></CPagination>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CProductByCategory;
