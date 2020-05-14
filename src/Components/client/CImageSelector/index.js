import React, { useState } from "react";
import CLoadingIndicator from "components/client/CLoadingIndicator";
import "./ImageSelector.scss";

const CImageSelector = ({ imgs, className, imageContainerClassName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMouseEnter = (imageIndex) => {
    setSelectedIndex(imageIndex);
  };

  return (
    <div className={`image-selector-wrapper ${className}`}>
      <div
        className={`image-container ${
          imageContainerClassName ? imageContainerClassName : ""
        }`}
      >
        {imgs ? (
          <img
            className="primary-img"
            alt="name"
            src={imgs[selectedIndex]}
          ></img>
        ) : (
          <CLoadingIndicator />
        )}
      </div>
      <div className="selector-container">
        <ul>
          {imgs ? (
            imgs.map((img, index) => (
              <li
                className={`visible ${
                  selectedIndex === index ? "selected" : ""
                }`}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <img alt={`shoes ${index}`} src={img}></img>
              </li>
            ))
          ) : (
            <li className="visible"></li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CImageSelector;
