import React from "react";
import BannerSlider from "components/BannerSlider";
import NewArrivalSection from "components/NewArrivalSection";
import MenProductSection from "components/MenProductSection";
import WomenProductSection from "components/WomenProductSection";
import "./ClientHome.scss";

function ClientHome() {
  return (
    <>
      <BannerSlider />
      <NewArrivalSection />
      <MenProductSection />
      <WomenProductSection />
    </>
  );
}

export default ClientHome;
