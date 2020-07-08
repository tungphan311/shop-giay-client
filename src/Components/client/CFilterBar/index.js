import React, { useState, useEffect } from "react";
import "./CFilterBar.scss";
import { Navbar, Nav, Form, NavDropdown, Button } from "react-bootstrap";
import { cGetSizeList, cGetStyleList } from "services/cProductService";
const initState = [
  {
    sizes: [],
    style: [],
  },
];
const CFilterBar = () => {
  const [size, setSize] = useState(initState);
  const [style, setStyle] = useState(initState);
  useEffect(() => {
    const listOfSize = cGetSizeList().then((res) => JSON.parse(res.data.data));
    Promise.all([listOfSize]).then(([listSize]) => {
      setSize((prev) => {
        const mapData = (size) => ({
          name: size,
        });
        setSize(listSize.map(mapData));
      });
    });
    const listOfStyle = cGetStyleList().then((res) =>
      JSON.parse(res.data.data)
    );
    Promise.all([listOfStyle]).then(([listStyle]) => {
      setStyle((prev) => {
        const mapData = (style) => ({
          name: style,
        });
        setStyle(listStyle.map(mapData));
      });
    });
  });

  const pageSizeList = [5, 10, 15, 20];

  const clearFilter = () => {
    localStorage.removeItem("View");
    localStorage.removeItem("Size");
    console.log("cleared");
  };
  const setSizeFilter = (size) => {
    localStorage.setItem("Size", size);
  };
  const setViewFilter = (view) => {
    localStorage.setItem("View", view);
  };
  const setStyleFilter = (style) => {
    localStorage.setItem("Style", style);
  };

  const renderViewFilter = pageSizeList.map((number) => {
    return (
      <NavDropdown.Item onClick={() => setViewFilter(number)}>
        {number}
      </NavDropdown.Item>
    );
  });

  const renderStyleFilter = style.map((style_item) => {
    return (
      <NavDropdown.Item onClick={() => setStyleFilter(style_item.name)}>
        {style_item.name}
      </NavDropdown.Item>
    );
  });

  const renderSizeFilter = size.map((size_item) => {
    return (
      <NavDropdown.Item onClick={() => setSizeFilter(size_item.name)}>
        {size_item.name}
      </NavDropdown.Item>
    );
  });

  return (
    <div className="FilterBar">
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Form inline>
            <Nav className="mr-auto">
              <NavDropdown title="Size" id="basic-nav-dropdown">
                {renderSizeFilter}
              </NavDropdown>
              <NavDropdown title="View" id="basic-nav-dropdown">
                {renderViewFilter}
              </NavDropdown>
              <NavDropdown title="Style" id="basic-nav-dropdown">
                {renderStyleFilter}
              </NavDropdown>
              <Button variant="light" onClick={() => clearFilter()}>
                Clear filters
              </Button>
            </Nav>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default CFilterBar;
