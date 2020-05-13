import React, { Component } from "react";
import "./NavBarItem.scss";

class NavBarItem extends Component {
  constructor(props) {
    super(props);

    this.state = { isHover: false };
  }

  handleMouseEnter = () => {
    this.setState({ isHover: true });
  };
  handleMouseLeave = () => {
    this.setState({ isHover: false });
  };
  render() {
    const { label, href = "#", children } = this.props;
    const { isHover } = this.state;
    const contentClassName = `navbaritem__content ${
      isHover ? "navbaritem__content_display" : "navbaritem__content_hidden"
    }`;
    const containerClassName = `navbaritem__container ${
      isHover ? "navbaritem__container_hover" : ""
    }`;
    return (
      <div
        className="navbaritem__wrapper"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <a className={containerClassName} href={href}>
          {label}
        </a>
        <div className={contentClassName}>{children}</div>
      </div>
    );
  }
}
export default NavBarItem;
