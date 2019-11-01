import React, { useEffect } from "react";
import '../../utils/axiosWithAuth';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

import "./Navbar.scss"
import axiosWithAuth from "../../utils/axiosWithAuth";

const SiteNavbar = props => {
    const token = localStorage.getItem("token");

    const signout = () => {
        localStorage.clear();
        props.history.push('/');
    }

    useEffect(() => {
        axiosWithAuth()
            .get('https://kitsu.io/api/edge/users?filter[self]=true')
            .then(res => {
                localStorage.setItem('name', res.data.data[0].attributes.name)
            })
            .catch(err => console.log(err));
    });

    const username = localStorage.getItem("name");

    return (
        <Navbar bg="light" variant="light" className="px-5 shadow">
            <Navbar.Brand href="/">
                Zenitsu
            </Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link>Library</Nav.Link>
                <Nav.Link>{username}</Nav.Link>
                {token ? (
                   <Nav.Link onClick={signout}>Sign Out</Nav.Link>
                   ) : <Nav.Link as={NavLink} to="/sign-in">Sign In</Nav.Link>
                }
            </Nav>
        </Navbar>
    );
};

export default SiteNavbar;