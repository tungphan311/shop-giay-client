import React from "react";

function ASubItem({ href, title }) {
  return (
    <li>
      <a href={href}>
        <span className="sub-item">{title}</span>
      </a>
    </li>
  );
}

export default ASubItem;
