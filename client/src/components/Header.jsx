import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import '../styles/header.css';
import shopsyncLogo from "../assets/shopsync-logo.png"
import Auth from '../utils/auth';
import { Link } from 'react-router-dom'



function Header() {
  function logOut()
  {
    localStorage.clear();
  }
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
        <img src={shopsyncLogo} />
          <Navbar.Brand href="/">Shopsync</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Welcome</Nav.Link>
            <Nav.Link href="/lists">Lists</Nav.Link>
            <Nav.Link href="/friends">My Friends</Nav.Link>
          </Nav>
          <Button href="/" variant="light" onClick={logOut}>Log Out</Button>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;

