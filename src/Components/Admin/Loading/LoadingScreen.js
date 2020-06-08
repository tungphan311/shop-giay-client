import React from "react";
import "./LoadingScreen.scss";
import Spinner from "react-bootstrap/Spinner";

function LoadingScreen({ show = false }) {
  return (
    <div className={`loading-screen${show ? "" : " d-none"}`}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}

export default LoadingScreen;
