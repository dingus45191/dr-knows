import React from 'react';
import { Container, Navbar, Nav, Row, Col, Card, Button } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import './App.css';

const App: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 576 });

  return (
    <div className="app">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#home">Dr. Knows</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="main-content">
        <h1 className="text-center my-4">Welcome to Dr. Knows</h1>
        {isMobile ? (
          <div className="text-center">
            <h3>Mobile View</h3>
            <p>This content is optimized for mobile devices.</p>
            {Array.from({ length: 3 }).map((_, idx) => (
              <Card key={idx} className="mb-3">
                <Card.Body>
                  <Card.Title>Mobile Content {idx + 1}</Card.Title>
                  <Card.Text>Simplified for mobile screens.</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Col key={idx}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src="https://via.placeholder.com/150"
                    alt="Sample"
                    className="img-fluid"
                  />
                  <Card.Body>
                    <Card.Title>Content {idx + 1}</Card.Title>
                    <Card.Text>
                      This is a sample card that adjusts to screen size.
                    </Card.Text>
                    <Button variant="primary">Learn More</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <footer className="footer bg-dark text-white text-center py-3">
        <Container>
          <p>&copy; 2025 Dr. Knows. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default App;
