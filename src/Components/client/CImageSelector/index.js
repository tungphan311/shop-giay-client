import React, { useState } from "react";
import CLoadingIndicator from "Components/client/CLoadingIndicator";
import "./ImageSelector.scss";

const CImageSelector = ({ imgs, className, imageContainerClassName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMouseEnter = (imageIndex) => {
    setSelectedIndex(imageIndex);
  };
  const url = window.location.href;
  return (
    <div className={`image-selector-wrapper ${className}`}>
      <div
        className={`image-container ${
          imageContainerClassName ? imageContainerClassName : ""
        }`}
      >
        {imgs && imgs.length > 0 ? (
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
          {imgs && imgs.length > 0 ? (
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
      <div className="detail-final">
        <div className="facebook-social">
          <a
            // eslint-disable-next-line react/jsx-no-target-blank
            target="_blank"
            href={"https://www.facebook.com/sharer/sharer.php?u=" + url}
          >
            <img alt="fb icon" src="/images/social-facebook-detail.png"></img>
          </a>
        </div>
        <div className="twitter-social">
          <a
            // eslint-disable-next-line react/jsx-no-target-blank
            target="_blank"
            href={"https://twitter.com/intent/tweet?text=" + url}
          >
            <img
              alt="twitter icon"
              src="/images/social-twitter-detail.png"
            ></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CImageSelector;
