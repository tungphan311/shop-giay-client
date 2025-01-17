import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function ABreadcrumb({ title, list }) {
  return (
    <div className="page-header">
      {/* <h4 className="page-title">{title}</h4> */}
      <ul
        className="breadcrumbs"
        style={{ marginLeft: 0, paddingLeft: 0, border: 0 }}
      >
        <li className="nav-home">
          <Link to="/admin">
            <i className="flaticon-home" />
          </Link>
        </li>
        {list.map(({ link, name }) => (
          <Fragment key={link}>
            <li className="separator">
              <i className="flaticon-right-arrow"></i>
            </li>
            <li className="nav-item">
              <a
                href={link}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {name}
              </a>
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

export default ABreadcrumb;
