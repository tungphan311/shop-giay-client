import React from "react";
import { Link } from "react-router-dom";

function ALogo() {
  return (
    <Link href="/" className="logo">
      <img
        src="/assets/img/logo.svg"
        alt="navbar brand"
        className="navbar-brand"
      />
    </Link>
  );
}

export default ALogo;
