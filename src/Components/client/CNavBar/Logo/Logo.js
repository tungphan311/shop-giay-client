import React from "react";
import { Link } from "react-router-dom";
import "./Logo.scss";

function CLogo() {
  return (
    <h1 className="navbar__logo">
      <Link className="navbar__logo--link" to="/" title="logo">
        <img
          className="navbar__logo-image"
          src="/images/white-logo.png"
          srcSet="//cdn.shopify.com/s/files/1/0324/6781/2487/files/SHLogo_Horiz_WHT_300x.png?v=1588809444 1x, //cdn.shopify.com/s/files/1/0324/6781/2487/files/SHLogo_Horiz_WHT_300x@2x.png?v=1588809444 2x"
          alt="SNEAKERHEAD.com"
        ></img>
      </Link>
    </h1>
  );
}

export default CLogo;
