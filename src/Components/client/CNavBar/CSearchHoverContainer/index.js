import React, { Component } from "react";
import "./SearchHoverContainer.scss";
import CIcon from "Components/client/CIcon";
import CInputWithButton from "Components/client/CInputWithButton";

export default class SearchHoverContainer extends Component {
  state = {
    text: "",
  };
  handleSearch = (text) => {
    // eslint-disable-next-line no-console
    console.log(text);
  };
  render() {
    // const { className } = this.props;
    const { text } = this.state;

    return (
      // <div className={`search-hover-container ${className}`}>
      //   <CInputWithButton
      //     placeholder="Tên sản phẩm,..."
      //     handleSearch={this.handleSearch}
      //     icon={{
      //       icon: CIcon,
      //       props: {
      //         type: "search",
      //         className: "button-hover",
      //       },
      //     }}
      //   />
      // </div>
      <div className="header__search-bar-wrapper ">
        <div className="search-bar">
          <div className="search-bar__top">
            <div className="search-bar__input-wrapper">
              <input
                placeholder="Search ..."
                value={text}
                onChange={(e) => this.setState({ text: e.target.value })}
                className="search-bar__input"
              />
            </div>
            <button className="search-bar__submit">
              <i className="fas fa-search" style={{ fontSize: "18px" }} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
