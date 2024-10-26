import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const CustomNavbar = ({ setFilter }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link onClick={() => setFilter('all')}>All</Nav.Link>
                        <Nav.Link onClick={() => setFilter('pending')}>Pending</Nav.Link>
                        <Nav.Link onClick={() => setFilter('completed')}>Completed</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                 
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;