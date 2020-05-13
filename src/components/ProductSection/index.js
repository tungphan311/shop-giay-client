import React from "react";
import LoadingIndicator from "components/LoadingIndicator";
import ItemCard from "components/ItemCard";
import "./ProductSection.scss";

const ProductSection = ({
  label,
  categories,
  setSelectedCategory,
  selectedCategory = 0,
  isLoading,
  className,
}) => {
  const Content = () =>
    categories[selectedCategory].products.map((item, index) => (
      <ItemCard key={index} {...item}></ItemCard>
    ));

  return (
    <section className={`homeSection ${className && className}`}>
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
                    setSelectedCategory && setSelectedCategory(catIndex)
                  }
                  className={`${selectedCategory === catIndex ? "active" : ""}`}
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
          {!isLoading ? <Content /> : <LoadingIndicator />}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
