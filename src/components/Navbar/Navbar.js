import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

import "./Navbar.scss"

const SiteNavbar = props => {
 
    return (
        <Navbar bg="light" variant="light" className="shadow">
            <Navbar.Brand href="/">Zenitsu</Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link>Library</Nav.Link>
                <Nav.Link as={NavLink} to="/sign-in">Sign In</Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default SiteNavbar;