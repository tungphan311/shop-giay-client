import React from "react";
import "./CFilterBar.scss";
import { Navbar, Nav, Form, NavDropdown } from "react-bootstrap";
const CFilterBar = () => {
  return (
    <div classname="FilterBar">
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Form inline>
            <Nav className="mr-auto">
              <NavDropdown title="Size" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.2">39</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">40</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="View" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.2">5</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">10</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">15</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">20</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default CFilterBar;
