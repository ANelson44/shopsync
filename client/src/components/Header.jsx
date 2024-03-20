import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


function Navbar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="welcome">Shopsync</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#welcome">Welcome</Nav.Link>
            <Nav.Link href="#dashboard">Lists</Nav.Link>
            <Nav.Link href="#friends">My Friends</Nav.Link>
            <Button variant="signup" size="lg" active>
        Sign Up
      </Button>{' '}
      <Button variant="login"  size="lg" active>
        Log In
      </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}


export default Navbar;

