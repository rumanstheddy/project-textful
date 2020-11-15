import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./Home.css";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Textful</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Navbar>

        <div className="header">
          <h1 className="title">Welcome to Textful!</h1>
          <h5 className="description">
            Textful is the premier chat service in the industry.
          </h5>
        </div>
      </div>
    );
  }
}
