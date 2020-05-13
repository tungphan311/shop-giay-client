import React from "react";
import { getPathname } from "../../../utils/utils";
import ASubItem from "./SubItem";

function ASidebarItem({ item, roleid }) {
  const { id, icon, title, href, sub } = item;

  const pathname = getPathname(window.location.pathname);

  return (
    <li className={`nav-item${pathname === href ? " active" : ""}`}>
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
