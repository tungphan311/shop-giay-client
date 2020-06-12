import React, { Component } from "react";

class OutsideClickWrapper extends Component {
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (e) => {
    const { onClickOutside, isShowing } = this.props;

    if (!isShowing) {
      return;
    }

    if (this.wrapperRef && this.wrapperRef.contains(e.target)) {
      return;
    }

    onClickOutside && onClickOutside();
  };
  render() {
    const { children, className } = this.props;
    return (
      <div
        className={`detect-outside-click ${className}`}
        ref={(node) => (this.wrapperRef = node)}
      >
        {children}
      </div>
    );
  }
}

export default OutsideClickWrapper;
