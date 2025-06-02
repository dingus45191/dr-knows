import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const About: React.FC = () => (
  <Container className="main-content">
    <Row className="justify-content-center text-center">
      <Col xs={12} md={10} lg={8}>
        <h1 className="app__title mt-4 mb-3">About Dr. Knows</h1>
        <p className="app__intro lead mb-4">
          Dr. Knows is an AI-powered image classifier that helps you identify objects in your images.
        </p>
        <p className="app__desc">
          Using state-of-the-art machine learning models, Dr. Knows provides accurate predictions for a wide range of images, from everyday objects to specialized items like martial arts equipment.
        </p>
      </Col>
    </Row>
  </Container>
);

export default About;