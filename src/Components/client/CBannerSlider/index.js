import React, { useState, useEffect } from "react";
import "./BannerSlider.scss";
import { useInterval } from "utils";
import CLoadingIndicator from "Components/client/CLoadingIndicator";
import { BANNERS } from "constants/index.js";

const CBannerSlider = () => {
  const [buttonShow, setButtonShow] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    //TODO: fetch banner data here

    setTimeout(() => {
      setBanners(BANNERS);
    }, 5000);
  }, []);

  const handleTimeOut = () => {
    setSelectedIndex((selectedIndex + 1) % BANNERS.length);
  };

  useInterval(handleTimeOut, 10000);

  const handleMouseEnter = () => {
    setButtonShow(true);
  };

  const handleMouseLeave = () => {
    setButtonShow(false);
  };

  const handleNext = () =>
    selectedIndex < banners.length - 1 && setSelectedIndex(selectedIndex + 1);

  const handlePrev = () =>
    selectedIndex > 0 && setSelectedIndex(selectedIndex - 1);

  const handleClick = (index) => setSelectedIndex(index);

  return (
    <>
      <ul
        className="bannerSlider"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {banners.length === 0 && <CLoadingIndicator />}
        {banners.map((banner, index) => (
          <li
            key={index}
            className={`bannerSlider__item ${
              index === selectedIndex
                ? "bannerSlider__item_display"
                : "bannerSlider__item_hidden"
            }`}
          >
            <a href={banner.href}>
              <img className="bannerSlider__image" alt="" src={banner.url} />
            </a>
          </li>
        ))}
        <button
          onClick={handlePrev}
          className={`bannerSlider__button bannerSlider__button_prev ${
            buttonShow && selectedIndex > 0
              ? "bannerSlider__button_display"
              : "bannerSlider__button_hidden"
          }`}
        ></button>
        <button
          onClick={handleNext}
          className={`bannerSlider__button bannerSlider__button_next ${
            buttonShow &&
            BANNERS.length !== 0 &&
            selectedIndex < banners.length - 1
              ? "bannerSlider__button_display"
              : "bannerSlider__button_hidden"
          }`}
        ></button>
        <div className="bannerSlider__processBar_container">
          {banners.map((_, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`bannerSlider__processBar_item ${
                index === selectedIndex
                  ? "bannerSlider__processBar_item_active"
                  : ""
              }`}
            ></div>
          ))}
        </div>
      </ul>
    </>
  );
};

export default CBannerSlider;
