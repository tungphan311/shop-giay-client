import React from "react";
import CBannerSlider from "Components/client/CBannerSlider";
import "./ClientHome.scss";
import CNewProductSection from "Components/client/CNewProductSection/index";

function ClientHome() {
  return (
    <>
      <CBannerSlider />
      <CNewProductSection />
    </>
  );
}

export default ClientHome;
