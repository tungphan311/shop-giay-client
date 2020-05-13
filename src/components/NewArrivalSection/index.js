import React, { useState, useEffect } from "react";
import ProductSection from "components/ProductSection";
import "./NewArrivalSection.scss";
import {
  getMenNewArrivals,
  getWomenNewArrivals,
} from "services/productService";

const intialCategories = [
  {
    label: "NAM",
    products: [],
  },
  {
    label: "NỮ",
    products: [],
  },
];

const NewArrivalSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(intialCategories);

  useEffect(() => {
    const men = getMenNewArrivals().then((res) => JSON.parse(res.data.data));
    const women = getWomenNewArrivals().then((res) =>
      JSON.parse(res.data.data)
    );

    Promise.all([men, women])
      .then(([menProducts, womenProducts]) => {
        setCategories((prev) => {
          const mapData = (shoes) => ({
            name: shoes.name,
            type: shoes.styleName,
            price: shoes.price,
            salePrice: shoes.salePrice,
            image: shoes.imagePath,
          });
          let newState = [...prev];
          newState[0].products = menProducts.map(mapData);
          newState[1].products = womenProducts.map(mapData);
          return newState;
        }, setIsLoading(false));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ProductSection
      label="HÀNG MỚI VỀ"
      isLoading={isLoading}
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      className="newArrivalSection"
    />
  );
};

export default NewArrivalSection;
