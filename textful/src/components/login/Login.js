import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import history from "../../services/History";
import "./Login.css";
import {Alert} from "react-bootstrap";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      username: "",
      password: "",
      currentUser: {},
      showAlert: false
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
    var self = this;
    console.log("reached handle click method")
    if (this.state.username != null || this.state.password != null) {
      this.state.currentUser.username = this.state.username;
      this.state.currentUser.password = this.state.password;

      fetch("https://wbdv-textful-server.herokuapp.com/users")
        .then((resp) => resp.json())
        .then((resp) => {
          for (let i = 0; i < resp.length; i++) {
            if (
              resp[i].userName === self.state.currentUser.username &&
              resp[i].password === self.state.currentUser.password
            ) {
              if (resp[i].userType === "Admin") {
                return history.push("/admin/" + resp[i]._id);
              } else {
                return history.push("/user/" + resp[i].userName + "/chat");
              }
            }
            else {
              self.setState({showAlert: true});
            }
          }
          
        })
    }
    // else {
    //   this.setState({showAlert: true});
    // }
  }

  render() {
    
    let self = this;
    return (
      <div className="container">
        {console.log(this.state.showAlert)}
        {
          this.state.showAlert ? <Alert variant="danger" onClose={() => self.setState({showAlert: false})} dismissible>
                                <Alert.Heading>Invalid Username and password</Alert.Heading>
                                  </Alert> : null
        }
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
          {console.log("reached login")}
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
