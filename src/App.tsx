import React from "react";
//@ts-ignore
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Knows from "./knows.png";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar bg="primary" variant="dark" expand="lg" fixed="top" className="shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img src={Knows} alt="Dr. Knows Logo" className="navbar-logo" />
              Dr. Knows
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <footer className="footer bg-dark text-white text-center py-4 mt-5">
          <Container>
            <p>© 2025 Mohammed Mubashir Hasan. All rights reserved.</p>
            <p>
              Powered by <a href="https://ml5js.org" target="_blank" rel="noopener noreferrer" className="text-white">ml5.js</a>
            </p>
          </Container>
        </footer>
      </div>
    </Router>
  );
};

export default App;