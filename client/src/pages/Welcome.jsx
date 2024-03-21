import React from 'react';
import { Container, Button } from 'react-bootstrap';

const Welcome = () => {
  return (
    <Container className="p-5 bg-dark-subtle rounded-3">
      <Container fluid className="py-5">
        <h1 className="display-5 fw-bold">Welcome to Shopsync!</h1>
        <p className="col-md-8 fs-4">
          Your smart shopping list partner. Create and manage your shopping lists with ease.
        </p>
        <Button variant="primary" size="lg">
          Sign Up Now
        </Button>
        {' '}
        <Button variant="secondary" size="lg">
          Log In
        </Button>
      </Container>
    </Container>
  );
};

export default Welcome;
