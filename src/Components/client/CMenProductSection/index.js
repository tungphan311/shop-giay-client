import React, { useState, useEffect } from "react";
import CProductSection from "Components/client/CProductSection";
import "./MenProductSection.scss";
import { getMenProducts } from "../../../services/productService";

const intialCategories = [
  {
    label: "NAM",
    products: [],
  },
];

const CMenProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(intialCategories);

  useEffect(() => {
    getMenProducts()
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
            isNew: shoes.isNew,
            isOnSale: shoes.isOnSale,
            href: "/products/" + shoes.id,
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
      label="GIÀY NAM"
      isLoading={isLoading}
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      className="menProductSection"
    />
  );
};

export default CMenProductSection;
