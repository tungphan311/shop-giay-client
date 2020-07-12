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
const CFilterBar = ({
  set_size,
  set_style,
  set_view,
  clear_filter,
  size_title,
  style_title,
  view,
}) => {
  const [size, setSize] = useState(initState);
  const [style, setStyle] = useState(initState);

  useEffect(() => {
    const listOfSize = cGetSizeList().then((res) => JSON.parse(res.data.data));
    const listOfStyle = cGetStyleList().then((res) =>
      JSON.parse(res.data.data)
    );
    Promise.all([listOfSize, listOfStyle])
      .then(([listSize, listStyle]) => {
        if (size.length === 1) {
          setSize(listSize);
        }
        if (style.length === 1) {
          setStyle(listStyle);
        }
      })
      .catch((error) => console.log(error));
  });

  const pageSizeList = [5, 10, 15, 20];

  const clearFilter = () => {
    clear_filter();
  };
  const setSizeFilter = (size) => {
    set_size(size);
  };
  const setViewFilter = (view) => {
    set_view(view);
  };
  const setStyleFilter = (style) => {
    // pass style object to this func
    set_style(style);
  };

  const renderViewFilter = pageSizeList.map((number) => {
    return (
      <NavDropdown.Item key={number} onClick={() => setViewFilter(number)}>
        {number}
      </NavDropdown.Item>
    );
  });

  const renderStyleFilter = style.map((style_item) => {
    return (
      <NavDropdown.Item
        key={style_item}
        onClick={() => setStyleFilter(style_item)}
      >
        {style_item}
      </NavDropdown.Item>
    );
  });

  const renderSizeFilter = size.map((size_item) => {
    return (
      <NavDropdown.Item
        key={size_item}
        onClick={() => setSizeFilter(size_item)}
      >
        {size_item}
      </NavDropdown.Item>
    );
  });
  let renderSizeTitle = "Size";
  if (size_title !== null && size_title !== 0) {
    renderSizeTitle = renderSizeTitle + ": " + size_title;
  }
  let renderViewTitle = "Display";
  if (view !== null) {
    renderViewTitle = renderViewTitle + ": " + view + " per page";
  }
  let renderStyleTitle = "Style";
  if (style_title !== null) {
    renderStyleTitle = renderStyleTitle + ": " + style_title;
  }
  return (
    <div className="FilterBar">
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title={renderViewTitle} id="basic-nav-dropdown">
              {renderViewFilter}
            </NavDropdown>
          </Nav>
          <Form inline>
            <Nav className="mr-auto">
              <NavDropdown title={renderSizeTitle} id="basic-nav-dropdown">
                {renderSizeFilter}
              </NavDropdown>

              <NavDropdown title={renderStyleTitle} id="basic-nav-dropdown">
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
