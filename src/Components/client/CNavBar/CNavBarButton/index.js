import React, { Component } from "react";
import history from "state/history";
import "./NavBarButton.scss";

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
    const { component: Component, children, hoverContent, href } = this.props;

    const { isHover } = this.state;
    return (
      <div
        onClick={() => history.push(href)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="navbarbutton__container"
      >
        {children}
        {Component ? (
          <Component
            {...{
              className: `hovercontainer ${
                isHover && hoverContent
                  ? "hovercontainer__display"
                  : "hovercontainer__hidden"
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
