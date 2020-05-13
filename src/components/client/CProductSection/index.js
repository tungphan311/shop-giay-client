import React from "react";
import CLoadingIndicator from "components/client/CLoadingIndicator";
import CItemCard from "components/client/CItemCard";
import "./ProductSection.scss";

const CProductSection = ({
  label,
  categories,
  setSelectedCategory,
  selectedCategory = 0,
  isLoading,
  className,
}) => {
  const Content = () =>
    categories[selectedCategory].products.map((item, index) => (
      <CItemCard key={index} {...item}></CItemCard>
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
          {!isLoading ? <Content /> : <CLoadingIndicator />}
        </div>
      </div>
    </section>
  );
};

export default CProductSection;
