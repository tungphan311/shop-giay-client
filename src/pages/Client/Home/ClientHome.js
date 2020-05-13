import React from "react";
import CBannerSlider from "components/client/CBannerSlider";
import CNewArrivalSection from "components/client/CNewArrivalSection";
import CMenProductSection from "components/client/CMenProductSection";
import CWomenProductSection from "components/client/CWomenProductSection";
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
