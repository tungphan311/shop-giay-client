import React from "react";
import ASubItem from "./SubItem";
import history from "state/history";
import { Link } from "react-router-dom";

function ASidebarItem({ item, roleid }) {
  const { id, icon, title, href, sub } = item;

  const pathname = window.location.pathname;

  const active =
    sub || typeof href === "object"
      ? href.includes(pathname)
      : href === pathname;

  return (
    <li className={`nav-item${active ? " active" : ""}`}>
      {sub ? (
        <>
          <a data-toggle="collapse" href={`#${id}`}>
            <i className={icon}></i>
            <p>{title}</p>
            <span className="caret"></span>
          </a>
          <div className="collapse" id={id}>
            <ul className="nav nav-collapse">
              {sub.map(({ href, title }) => (
                <ASubItem key={href} href={href} title={title} />
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Link
          to={href}
          onClick={(e) => {
            e.preventDefault();
            history.push(href);
          }}
        >
          <i className={icon}></i>
          <p>{title}</p>
        </Link>
      )}
    </li>
  );
}

export default ASidebarItem;
