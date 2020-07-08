import React, { useState, useEffect } from "react";
import CProductSection from "Components/client/CProductSection";
import "./WomenProductSection.scss";
import { clientGetProductAction } from "state/actions/index";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clientGetProductAction({ gender: "nữ", pageSize: 6 }))
      .then((res) => {
        const data = JSON.parse(res.data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
