import React from "react";
import { Link } from "react-router-dom";

function ANotification() {
  return (
    <li className="nav-item dropdown hidden-caret">
      <button
        className="nav-link dropdown-toggle"
        id="notifDropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fa fa-bell"></i>
        <span className="notification">4</span>
      </button>
      <ul
        className="dropdown-menu notif-box animated fadeIn"
        aria-labelledby="notifDropdown"
      >
        <li>
          <div className="dropdown-title">You have 4 new notification</div>
        </li>
        <li>
          <div className="notif-scroll scrollbar-outer">
            <div className="notif-center">
              <Link to="/">
                <div className="notif-icon notif-primary">
                  {" "}
                  <i className="fa fa-user-plus"></i>{" "}
                </div>
                <div className="notif-content">
                  <span className="block">New user registered</span>
                  <span className="time">5 minutes ago</span>
                </div>
              </Link>
              <Link to="/">
                <div className="notif-icon notif-success">
                  {" "}
                  <i className="fa fa-comment"></i>{" "}
                </div>
                <div className="notif-content">
                  <span className="block">Rahmad commented on Admin</span>
                  <span className="time">12 minutes ago</span>
                </div>
              </Link>
              <Link to="/">
                <div className="notif-img">
                  <img src="/assets/img/profile2.jpg" alt="Img Profile" />
                </div>
                <div className="notif-content">
                  <span className="block">Reza send messages to you</span>
                  <span className="time">12 minutes ago</span>
                </div>
              </Link>
              <Link to="/">
                <div className="notif-icon notif-danger">
                  {" "}
                  <i className="fa fa-heart"></i>{" "}
                </div>
                <div className="notif-content">
                  <span className="block">Farrah liked Admin</span>
                  <span className="time">17 minutes ago</span>
                </div>
              </Link>
            </div>
          </div>
        </li>
        <li>
          <Link className="see-all" to="/notifications">
            See all notifications
            <i className="fa fa-angle-right"></i>{" "}
          </Link>
        </li>
      </ul>
    </li>
  );
}

export default ANotification;
