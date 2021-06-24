import React from "react";

import {Navbar, NavDropdown, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {isAdmin, isRedactor, isUser} from "../../utility/Authorization";

function Header() {

    function logout() {
        localStorage.clear();
        window.location.replace('/');
    }

    return (
        <Navbar bg="light" expand="lg">
            {/*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>

                    {isRedactor() &&
                    <NavDropdown title="Redactor menu" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/newblogentry">Add new blog entry</NavDropdown.Item>
                        <NavDropdown.Item href="/myblogentries">My blog entries </NavDropdown.Item>
                    </NavDropdown>
                    }
                    {isAdmin() &&
                    <NavDropdown title="Admin menu" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/admin/users">Users</NavDropdown.Item>
                        <NavDropdown.Item href="/admin/allentries">Blog entries</NavDropdown.Item>
                    </NavDropdown>
                    }
                    {!isUser() &&
                    <>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </>
                    }
                    {isUser() &&
                    <Nav.Link onSelect={logout} href="/home">Logout</Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;
