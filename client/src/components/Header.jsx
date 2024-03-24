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
        <img src="client/public/images/ShopSync-Logo.png" alt="Shopsync Logo" />
          <Navbar.Brand href="/">Shopsync</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href='/Lists'>Lists</Nav.Link>
            <Nav.Link href='/Friends'>My Friends</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}


export default Header;

