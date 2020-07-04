import { Dropdown } from "react-bootstrap";
import React, { Component } from "react";
import "./MenuBar.scss";
import { cGetBrandList } from "services/cProductService";
class CMenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandList: [],
    };
  }
  componentDidMount() {
    const list = cGetBrandList().then(
      (res) => JSON.parse(res.data.data),
      this.setState
    );
  }
  render() {
    return (
      <div className="bg-dark" id="sidebar-wrapper">
        <div className="sidebar-heading">BRAND</div>
        <div className="list-group list-group-flush">
          <a
            href="/category/adidas"
            className="list-group-item list-group-item-action bg-dark"
          >
            Adidas
          </a>
          <a
            href="/category/nike"
            className="list-group-item list-group-item-action bg-dark"
          >
            Nike
          </a>
          <a
            href="/category/vans"
            className="list-group-item list-group-item-action bg-dark"
          >
            Vans
          </a>
          <a
            href="/category/converse"
            className="list-group-item list-group-item-action bg-dark"
          >
            Converse
          </a>
        </div>
      </div>
    );
  }
}
export default CMenuBar;
