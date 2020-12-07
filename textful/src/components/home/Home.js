import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import history from "../../services/History";
import "./Home.css";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand onClick={() => history.push("/")}>Textful</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => history.push("/login")}>Login</Nav.Link>
            <Nav.Link onClick={() => history.push("/register")}>
              Register
            </Nav.Link>
          </Nav>
        </Navbar>

        <div className="header">
          <h1 className="title">Welcome to Textful!</h1>
          <h5 className="description">
          </h5>
        </div>
      </div>
    );
  }
}
