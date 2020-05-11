import React from "react";
import BannerSlider from "components/BannerSlider";
import NewArrivalSection from "components/NewArrivalSection";
import "./ClientHome.scss";

function ClientHome() {
  return (
    <>
      <BannerSlider />
      <NewArrivalSection />
    </>
  );
}

export default ClientHome;
