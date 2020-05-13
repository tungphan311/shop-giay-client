import React, { useState, useEffect } from "react";
import CProductSection from "components/CProductSection";
import "./WomenProductSection.scss";
import { getWomenProducts } from "services/productService";

const intialCategories = [
  {
    label: "NỮ",
    products: [],
  },
];

const CWomenProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(intialCategories);

  useEffect(() => {
    getWomenProducts()
      .then((res) => {
        const data = JSON.parse(res.data.data);
        console.log(data);
        setCategories((prev) => {
          const mapData = (shoes) => ({
            name: shoes.name,
            type: shoes.styleName,
            price: shoes.price,
            salePrice: shoes.salePrice,
            image: shoes.imagePath,
            description: shoes.description,
          });
          let newState = [...prev];
          newState[0].products = data.map(mapData);
          return newState;
        }, setIsLoading(false));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <CProductSection
      label="GIÀY NỮ"
      isLoading={isLoading}
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      className="womenProductSection"
    />
  );
};

export default CWomenProductSection;
