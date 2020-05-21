import React, { useState, useEffect } from "react";
import CProductSection from "Components/client/CProductSection";
import { cGetRelatedProducts } from "services/cProductService";

const intialCategories = [
  {
    label: "NAM",
    products: [],
  },
];

const CRelatedProductSection = ({ id }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(intialCategories);

  useEffect(() => {
    cGetRelatedProducts(id)
      .then((res) => {
        const data = JSON.parse(res.data.data).slice(0, 6);
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
  }, [id]);

  return (
    <CProductSection
      label="Sản phẩm tương tự"
      isLoading={isLoading}
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  );
};

export default CRelatedProductSection;
