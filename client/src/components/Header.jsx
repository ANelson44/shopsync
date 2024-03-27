import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import '../styles/header.css';
import shopsyncLogo from "../assets/shopsync-logo.png"
import AuthService from '../path/to/AuthService';
import { Link } from 'react-router-dom'



function Header() {
  const isLoggedIn = AuthService.loggedIn();

  const handleLogout = () => {
    AuthService.logout(); // Call the logout method from AuthService
  };

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
          {isLoggedIn ? ( // Conditionally render the logout button if logged in
            <Button variant="light" onClick={handleLogout}>
              Log Out
            </Button>
          ) : null}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;

