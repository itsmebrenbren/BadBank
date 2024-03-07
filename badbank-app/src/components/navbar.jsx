import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top">
      <Container className='fluid sticky-top'>
        <Navbar.Brand as={Link} to="/">BadBank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/deposit">Deposit</Nav.Link>
            <Nav.Link as={Link} to="/withdraw">Withdraw</Nav.Link>
            <Nav.Link as={Link} to="/alldata">All Data</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav.Link as={Link} to="/createaccount">Create Account</Nav.Link>
      </Container>
    </Navbar>
  );
}
