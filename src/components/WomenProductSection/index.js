import React, { useState, useEffect } from "react";
import ProductSection from "components/ProductSection";
import { EXAMPLE_WOMEN_PRODUCTS } from "../../constants";
import "./WomenProductSection.scss";

const intialCategories = [
  {
    label: "NỮ",
    products: [],
  },
];

const MenProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(intialCategories);

  useEffect(() => {
    //TODO: FETCH TRENDING WOMEN PRODUCT HERE
    setTimeout(() => {
      setCategories(EXAMPLE_WOMEN_PRODUCTS, setIsLoading(false));
    }, 500);
  }, []);

  return (
    <ProductSection
      label="GIÀY NỮ"
      isLoading={isLoading}
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      className="womenProductSection"
    />
  );
};

export default MenProductSection;
