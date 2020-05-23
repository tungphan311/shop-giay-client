import React from "react";
import { getPathname } from "../../../utils/utils";
import ASubItem from "./SubItem";

function ASidebarItem({ item, roleid }) {
  const { id, icon, title, href, sub } = item;

  const pathname = window.location.pathname;

  const active = sub ? href.includes(pathname) : href === pathname;

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
        <a href={href}>
          <i className={icon}></i>
          <p>{title}</p>
        </a>
      )}
    </li>
  );
}

export default ASidebarItem;
