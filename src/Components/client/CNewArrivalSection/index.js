import React, { useState, useEffect } from "react";
import CProductSection from "Components/client/CProductSection";
import "./NewArrivalSection.scss";
import { useDispatch } from "react-redux";
import { clientGetNewArrivalsAction } from "state/actions/index";
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

const CNewArrivalSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(intialCategories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clientGetNewArrivalsAction()).then((res) => {
      const { men, women } = res;
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
        newState[0].products = men.data.map(mapData);
        newState[1].products = women.data.map(mapData);
        return newState;
      });
    }, setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CProductSection
      label="HÀNG MỚI VỀ"
      isLoading={isLoading}
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      className="newArrivalSection"
    />
  );
};

export default CNewArrivalSection;
