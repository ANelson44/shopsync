import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Container className="p-5 bg-dark-subtle rounded-3">
      <Container fluid className="py-5">
        <h1 className="display-5 fw-bold">Welcome to Shopsync!</h1>
        <p className="col-md-8 fs-4">
          Your smart shopping list partner. Create and manage your shopping lists with ease.
        </p>
        <Button variant="primary" size="lg" onClick={() => navigate('/signup')}>
          Sign Up Now
        </Button>
        {' '}
        <Button variant="secondary" size="lg" onClick={() => navigate('/login')}>
          Log In
        </Button>
      </Container>
    </Container>
  );
};

export default Welcome;
