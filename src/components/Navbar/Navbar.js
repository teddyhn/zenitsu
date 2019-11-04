import React from "react";
import '../../utils/axiosWithAuth';
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/Lightning.svg";
import { User } from 'react-feather';

import "./Navbar.scss"

const SiteNavbar = props => {
    const token = localStorage.getItem("token");

    const signout = () => {
        localStorage.clear();
        props.history.push('/library');
    }
    
    const username = localStorage.getItem('username');

    return (
        <Navbar bg="light" variant="light" className="font-weight-bold shadow">
            <Navbar.Brand as={NavLink} to="/">
                <Logo height={32} />
            </Navbar.Brand>
            <Nav className="mr-auto d-inline-flex align-items-center">
                <Form className="nav-search">
                    <Form.Control type="text" placeholder="Search anime and manga..." className="mr-sm-2" size="sm" />
                </Form>
                <Nav.Link as={NavLink} to="/library">Library</Nav.Link>
            </Nav>
            
            <Nav className="ml-auto">
                {token ? (
                <Dropdown>
                    <Dropdown.Toggle as={Nav.Link}><User height={18} /></Dropdown.Toggle>
                    <Dropdown.Menu alignRight>
                        <Dropdown.Item as={Nav.Link}>Signed in as <b>{username}</b></Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as={Nav.Link} onClick={signout}>Settings</Dropdown.Item>
                        <Dropdown.Item as={Nav.Link} onClick={signout}>Sign out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                ) : <Nav.Link as={NavLink} to="/sign-in">Sign in</Nav.Link>}
            </Nav>
        </Navbar>
    );
};

export default SiteNavbar;