import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import history from "../../services/History";
import "./Login.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      username: "",
      password: "",
      currentUser: {},
    };
  }

  setUsername = (event) =>
    this.setState({
      username: event.target.value,
    });

  setPassword = (event) =>
    this.setState({
      password: event.target.value,
    });

  handleClick() {
    if (this.state.username != null || this.state.password != null) {
      this.state.currentUser.username = this.state.username;
      this.state.currentUser.password = this.state.password;

      fetch("https://wbdv-textful-server.herokuapp.com/users")
        .then((resp) => resp.json())
        .then((resp) => {
          for (let i = 0; i < resp.length; i++) {
            if (
              resp[i].userName === this.state.currentUser.username &&
              resp[i].password === this.state.currentUser.password
            ) {
              if (resp[i].userType === "Admin") {
                return history.push("/admin/" + resp[i]._id);
              } else {
                return history.push("/user/" + resp[i].userName + "/chat");
              }
            }
          }
          console.log("User Does Not Exist!");
        });
    }
  }

  render() {
    return (
      <div className="container">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand onClick={() => history.push("/")}>Textful</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => history.push("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => history.push("/register")}>
              Register
            </Nav.Link>
          </Nav>
        </Navbar>

        <div className="form-group mt-4">
          <h3>Log In </h3>
        </div>
        <div className="form-group">
          <label for="username" className="control-label">
            Username
          </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fa fa-user" />
              </div>
            </div>
            <input
              className="form-control"
              onChange={this.setUsername}
              type="text"
              id="username"
              placeholder="Username"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label for="password" className="control-label">
            Password
          </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fa fa-key" />
              </div>
            </div>
            <input
              className="form-control"
              onChange={this.setPassword}
              type="password"
              id="password"
              placeholder="*****"
              required
            />
          </div>
        </div>

        <div className="btn-link">
          <a className="btn btn-primary" onClick={() => this.handleClick()}>
            Log In
          </a>
        </div>

        <div className="row form-group justify-content-between">
          <div className="col">
            <button
              className="btn btn-primary"
              id="cancelBtn"
              onClick={() => history.push("/")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}
