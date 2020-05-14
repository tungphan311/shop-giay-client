import React from "react";
import "./HoverContainer.scss";

const HoverContainer = ({ children, className }) => (
  <div className={`hover-container ${className}`}>{children}</div>
);

export default HoverContainer;
