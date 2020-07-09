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
const CFilterBar = ({ size_title, style_title, view }) => {
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

    // Promise.all([listOfStyle]).then(([listStyle]) => {
    //   setStyle((prev) => {
    //     const mapData = (style) => ({
    //       name: style,
    //     });
    //     setStyle(listStyle.map(mapData));
    //   });
    // });
  });

  const pageSizeList = [5, 10, 15, 20];

  const clearFilter = () => {
    localStorage.removeItem("View");
    localStorage.removeItem("Size");
    localStorage.removeItem("Style");
    window.location.reload(false);
  };
  const setSizeFilter = (size) => {
    localStorage.setItem("Size", size);
    window.location.reload(false);
  };
  const setViewFilter = (view) => {
    localStorage.setItem("View", view);
    window.location.reload(false);
  };
  const setStyleFilter = (style) => {
    localStorage.setItem("Style", style);
    window.location.reload(false);
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
  if (size_title !== null) {
    renderSizeTitle = renderSizeTitle + ": " + size_title;
  }
  let renderViewTitle = "View";
  if (view !== null) {
    renderViewTitle = renderViewTitle + ": " + view;
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
          <Nav className="mr-auto"></Nav>
          <Form inline>
            <Nav className="mr-auto">
              <NavDropdown title={renderSizeTitle} id="basic-nav-dropdown">
                {renderSizeFilter}
              </NavDropdown>
              <NavDropdown title={renderViewTitle} id="basic-nav-dropdown">
                {renderViewFilter}
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
