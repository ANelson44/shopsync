import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Dashboard = () => {

  return (
    <Container fluid className="bg-dark text-white d-flex vw-100 vh-100 p-2">
      <Row className="mb-4">
        <Col>
          <Button variant="outline-light">New List</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Container for shopping lists */}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
