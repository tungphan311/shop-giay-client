import React, { useState, useEffect } from "react";
import ProductSection from "components/ProductSection";
import { EXAMPLE_MEN_PRODUCTS } from "../../constants";
import "./MenProductSection.scss";

const intialCategories = [
  {
    label: "NAM",
    products: [],
  },
];

const WomenProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(intialCategories);

  useEffect(() => {
    //TODO: FETCH TRENDING MEN PRODUCT HERE
    setTimeout(() => {
      setCategories(EXAMPLE_MEN_PRODUCTS, setIsLoading(false));
    }, 500);
  }, []);

  return (
    <ProductSection
      label="GIÀY NAM"
      isLoading={isLoading}
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      className="menProductSection"
    />
  );
};

export default WomenProductSection;
