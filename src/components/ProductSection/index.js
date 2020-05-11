import React from "react";
import LoadingIndicator from "components/LoadingIndicator";
import ItemCard from "components/ItemCard";
import "./ProductSection.scss";

const ProductSection = ({
  label,
  categories,
  setSelectedCatogory,
  selectedCatogory = 0,
  isLoading,
}) => {
  const Content = () =>
    categories[selectedCatogory].products.map((item) => (
      <ItemCard key={item.name} {...item}></ItemCard>
    ));

  return (
    <section className="homeSection">
      <div
        className={`homeSection__header ${
          categories.length === 1 && "homeSection__header_only"
        }`}
      >
        <div className="homeSection__header_title">{label}</div>
        {categories.length > 1 && (
          <div className="homeSection__header_category">
            <ul>
              {categories.map((cat, catIndex) => (
                <li
                  key={cat.label}
                  onClick={() =>
                    setSelectedCatogory && setSelectedCatogory(catIndex)
                  }
                  className={`${selectedCatogory === catIndex ? "active" : ""}`}
                >
                  {cat.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="content">
        <div className="item-wrapper">
          {isLoading ? <Content /> : <LoadingIndicator />}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
