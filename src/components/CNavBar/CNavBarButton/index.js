import React, { Component } from "react";
import "./NavBarButton.scss";

export default class NavBarButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHover: false
    };
  }

  handleMouseEnter = () => {
    this.setState({ isHover: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHover: false });
  };

  render() {
    const { component: Component, children, hoverContent } = this.props;

    const { isHover } = this.state;
    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="navbarbutton__container"
      >
        {children}
        {Component ? (
          <Component
            {...{
              className: `hovercontainer ${
                isHover ? "hovercontainer__display" : "hovercontainer__hidden"
              }`
            }}
          >
            {hoverContent ? hoverContent : null}
          </Component>
        ) : null}
      </div>
    );
  }
}
