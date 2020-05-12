import "./InputWithButton.scss";
import React, { Component } from "react";

class InputWithButton extends Component {
  constructor(props) {
    super(props);

    this.state = { value: "" };
  }

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.props.handleSearch(e.target.value);
    }
  };

  render() {
    const { icon, handleSearch, placeholder } = this.props;
    const { value } = this.state;
    icon.props = { ...icon.props, handleClick: () => handleSearch(value) };
    return (
      <div className="inputwithbutton__container">
        <input
          placeholder={placeholder}
          value={value}
          onChange={e => this.setState({ value: e.target.value })}
          onKeyPress={this.handleKeyPress}
          className="inputwithbutton__textinput"
        ></input>
        {icon ? <icon.icon {...icon.props} /> : null}
      </div>
    );
  }
}

export default InputWithButton;
