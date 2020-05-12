import React, { Component } from "react";
import "./SearchHoverContainer.scss";
import Icon from "../../Icon";
import InputWithButton from "../../InputWithButton";

export default class SearchHoverContainer extends Component {
  handleSearch = (text) => {
    // eslint-disable-next-line no-console
    console.log(text);
  };
  render() {
    const { className } = this.props;
    return (
      <div className={`search-hover-container ${className}`}>
        <InputWithButton
          placeholder="Tên sản phẩm,..."
          handleSearch={this.handleSearch}
          icon={{
            icon: Icon,
            props: {
              type: "search",
              className: "button-hover",
            },
          }}
        />
      </div>
    );
  }
}
