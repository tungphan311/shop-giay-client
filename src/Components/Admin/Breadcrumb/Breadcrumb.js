import React, { Fragment } from "react";

function ABreadcrumb({ title, list }) {
  return (
    <div className="page-header">
      <h4 className="page-title">{title}</h4>
      <ul className="breadcrumbs">
        <li className="nav-home">
          <a href="/admin">
            <i className="flaticon-home" />
          </a>
        </li>
        {list.map(({ link, name }) => (
          <Fragment key={link}>
            <li className="separator">
              <i className="flaticon-right-arrow"></i>
            </li>
            <li className="nav-item">
              <a href={link}>{name}</a>
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

export default ABreadcrumb;
