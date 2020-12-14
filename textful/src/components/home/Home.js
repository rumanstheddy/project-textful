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

        <div class="jumbotron">
          <h2 class="display-4">
            Welcome to <b>Textful</b>!
          </h2>
          <p class="lead">
            A simple chat application made by our team:
            <br /> Ayub, Durga and Sumanth
          </p>
          <hr class="my-4" />
          <p id="centerTxt">
            Click on the button to register and start chatting!
          </p>
          <a
            class="btn btn-primary btn-lg"
            id="registerBtn"
            onClick={() => history.push("/register")}
            role="button"
          >
            Get Started
          </a>
        </div>
      </div>
    );
  }
}
