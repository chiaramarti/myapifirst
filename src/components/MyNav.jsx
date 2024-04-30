import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import logo from "../rollermo-high-resolution-logo-white-transparent-squared.png";

function MyNav() {
  return (
    <Navbar expand="lg" className="bg-dark">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="RollerMo logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Link to="/" className="text-white">Home</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;