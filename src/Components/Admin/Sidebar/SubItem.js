import React, { useEffect } from "react";
import history from "state/history";

function ASubItem({ href, title }) {
  return (
    <li>
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          history.push(href);
        }}
      >
        <span className="sub-item">{title}</span>
      </a>
    </li>
  );
}

export default ASubItem;
