import React, { Component } from "react";
import history from "state/history";
import "./NavBarButton.scss";
import CIcon from "Components/client/CIcon";

export default class NavBarButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHover: false,
    };
  }

  handleMouseEnter = () => {
    this.setState({ isHover: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHover: false });
  };

  render() {
    const {
      component: Component,
      floatNumber,
      icon,
      hoverContent,
      href,
    } = this.props;

    const { isHover } = this.state;
    return (
      <div
        onClick={() => href && history.push(href)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={`navbarbutton__container ${href ? "pointer" : ""}`}
      >
        <CIcon color="white" type={icon} />
        {floatNumber && floatNumber !== 0 ? (
          <div className="float__number__wrapper">
            <span className="float__number">{floatNumber}</span>
          </div>
        ) : (
          ""
        )}
        {Component ? (
          <Component
            {...{
              className: `hovercontainer ${
                isHover ? "hovercontainer__display" : "hovercontainer__hidden"
              }`,
            }}
          >
            {hoverContent ? hoverContent : null}
          </Component>
        ) : null}
      </div>
    );
  }
}
