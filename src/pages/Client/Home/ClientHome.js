import React from "react";
import CBannerSlider from "Components/client/CBannerSlider";
import CNewArrivalSection from "Components/client/CNewArrivalSection";
import CMenProductSection from "Components/client/CMenProductSection";
import CWomenProductSection from "Components/client/CWomenProductSection";
import "./ClientHome.scss";

function ClientHome() {
  return (
    <>
      <CBannerSlider />
      <CNewArrivalSection />
      <CMenProductSection />
      <CWomenProductSection />
    </>
  );
}

export default ClientHome;
