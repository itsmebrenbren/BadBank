import React from 'react';
import { Container, Nav, Navbar, OverlayTrigger, Popover, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from './atoms/userAtom';
import { useAuth } from './hooks/useAuth';

interface MenuProps {
  isAuthenticated: boolean;
}

export default function Menu({ isAuthenticated }: MenuProps) {
  const [user, setUser] = useAtom(userAtom);
  const { logout } = useAuth();
  const navigate = useNavigate();


  const popoverHome = (
    <Popover id="popover-basic" className='title'>
      <Popover.Header as="h3">Home Page</Popover.Header>
      <Popover.Body>
        Checkout our logo and learn about how terrible we are!
      </Popover.Body>
    </Popover>
  );
  const popoverDeposit = (
    <Popover id="popover-basic" className='title'>
      <Popover.Header as="h3">Deposit Page</Popover.Header>
      <Popover.Body>
        Discover the wonders of being able to actually put money in a bank account!
      </Popover.Body>
    </Popover>
  );
  const popoverWithdraw = (
    <Popover id="popover-basic" className='title'>
      <Popover.Header as="h3">Withdraw Page</Popover.Header>
      <Popover.Body>
        For once, be the jerk who gets to take the money out. No landlord here BUT YOU!
      </Popover.Body>
    </Popover>
  );
  const popoverCreateAccount = (
    <Popover id="popover-basic" className='title'>
      <Popover.Header as="h3">Create Account Page</Popover.Header>
      <Popover.Body>
        Make accounts to get free fake money that you can't use anywhere!
      </Popover.Body>
    </Popover>
  );
  const popoverLogin = (
    <Popover id="popover-basic" className='title'>
      <Popover.Header as="h3">Login</Popover.Header>
      <Popover.Body>
        Want to do anything on this site? try logging in!
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top title">
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
          </Nav>
       {isAuthenticated && user ? (
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {user.userName}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <>
            <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={popoverLogin}>
              <Nav.Link as={Link} to="/login" className='nav-link-space'>login</Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={popoverCreateAccount}>
              <Nav.Link as={Link} to="/createaccount" className='nav-link-space'>Create Account</Nav.Link>
            </OverlayTrigger>
          </>
        )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

