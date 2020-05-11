import React, { useState, useEffect } from "react";
import ProductSection from "components/ProductSection";
import { EXAMPLE_PRODUCTS } from "../../constants";

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
    //TODO: FETCH NEW ARRIVALS PRODUCT HERE
    setTimeout(() => {
      setCategories(EXAMPLE_PRODUCTS, setIsLoading(false));
    }, 500);
  }, []);

  return (
    <ProductSection
      label="HÀNG MỚI VỀ"
      isLoading={isLoading}
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  );
};

export default NewArrivalSection;
