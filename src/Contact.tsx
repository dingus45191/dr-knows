import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Contact: React.FC = () => (
  <Container className="main-content">
    <Row className="justify-content-center text-center">
      <Col xs={12} md={10} lg={8}>
        <h1 className="app__title mt-4 mb-3">Contact Us</h1>
        <p className="app__intro lead mb-4">
          Have questions or feedback about Dr. Knows?
        </p>
        <p className="app__desc">
          Reach out to me at <a href="mailto:mubashirhasan716@gmail.com">Mubashir</a> and let me know how I can assist you.
        </p>
      </Col>
    </Row>
  </Container>
);

export default Contact;