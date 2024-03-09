import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Popover } from 'react-bootstrap';


export default function Menu() {
  const popoverHome = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Home Page</Popover.Header>
      <Popover.Body>
        Checkout our logo and learn about how terrible we are!
      </Popover.Body>
    </Popover>
  );
  const popoverDeposit = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Deposit Page</Popover.Header>
      <Popover.Body>
        Discover the wonders of being able to actually put money in a bank account!
      </Popover.Body>
    </Popover>
  );
  const popoverWithdraw = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Withdraw Page</Popover.Header>
      <Popover.Body>
        For once, be the jerk who gets to take the money out. No landlord here BUT YOU!
      </Popover.Body>
    </Popover>
  );
  const popoverAllData = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">All Data Page</Popover.Header>
      <Popover.Body>
        View everyone's password like it makes a difference!
      </Popover.Body>
    </Popover>
  );
  const popoverCreateAccount = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Create Account Page</Popover.Header>
      <Popover.Body>
        Make more accounts to stare at in the All Data page!
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top">
      <Container className='fluid sticky-top'>
        <Navbar.Brand as={Link} to="/">BadBank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" variant='underline'>
          <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={popoverHome}
            >
              <Nav.Link as={Link} to="/">Home</Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={popoverDeposit}
            >
              <Nav.Link as={Link} to="/deposit">Deposit</Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={popoverWithdraw}
            >
              <Nav.Link as={Link} to="/withdraw">Withdraw</Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={popoverAllData}
            >
              <Nav.Link as={Link} to="/alldata">All Data</Nav.Link>
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
          <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={popoverCreateAccount}
          >
          <Nav.Link as={Link} to="/createaccount">Create Account</Nav.Link>
        </OverlayTrigger>
      </Container>
    </Navbar>
  );
}
