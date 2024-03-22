import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import '../styles/header.css';


function Header() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>

          <Navbar.Brand href="/">Shopsync</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#welcome">Welcome</Nav.Link>
            <Nav.Link href="lists">Lists</Nav.Link>
            <Nav.Link href="#friends">My Friends</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}


export default Header;

