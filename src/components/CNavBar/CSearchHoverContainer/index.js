import React, { Component } from "react";
import "./SearchHoverContainer.scss";
import CIcon from "components/CIcon";
import CInputWithButton from "components/CInputWithButton";

export default class SearchHoverContainer extends Component {
  handleSearch = (text) => {
    // eslint-disable-next-line no-console
    console.log(text);
  };
  render() {
    const { className } = this.props;
    return (
      <div className={`search-hover-container ${className}`}>
        <CInputWithButton
          placeholder="Tên sản phẩm,..."
          handleSearch={this.handleSearch}
          icon={{
            icon: CIcon,
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
