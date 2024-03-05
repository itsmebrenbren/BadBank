import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Menu() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">BadBank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Deposit</Nav.Link>
            <Nav.Link href="#link">Withdraw</Nav.Link>
            <Nav.Link href="#link">All Data</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav.Link href="#link">Login</Nav.Link>
      </Container>
    </Navbar>
  );
}