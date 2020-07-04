import React, { useState, useEffect } from "react";
import CProductSection from "Components/client/CProductSection";

import { cGetProductListByBrand } from "services/cProductService";
import CMenuBar from "Components/client/CMenuBar/index";
import "./ProductByCategory.scss";

const intialCategories = [
  {
    label: "Danh sách sản phẩm",
    products: [],
  },
];

const CProductByCategory = (id) => {
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

  useEffect(() => {
    const list = cGetProductListByBrand(id).then((res) =>
      JSON.parse(res.data.data)
    );

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
          newState[0].label = id;
          return newState;
        }, setIsLoading(false));
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <>
      <div className="d-flex" id="wrapper">
        <CMenuBar />

        <div className="page-content-wrapper">
          <CProductSection
            label={label}
            isLoading={isLoading}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            className="newArrivalSection"
          />
        </div>
      </div>
    </>
  );
};

export default CProductByCategory;
