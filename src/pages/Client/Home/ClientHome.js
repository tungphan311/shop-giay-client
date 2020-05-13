import React from "react";
import CBannerSlider from "components/CBannerSlider";
import CNewArrivalSection from "components/CNewArrivalSection";
import CMenProductSection from "components/CMenProductSection";
import CWomenProductSection from "components/CWomenProductSection";
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
