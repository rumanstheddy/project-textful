import React from "react";
import { Navbar, Nav, NavItem, Form } from "react-bootstrap";
import * as sessionMgmt from "../services/SessionHandler";
import history from "../services/History";
import "./NavBar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let self = this;
    return (
      <div>
        <Navbar
          className="justify-content-between"
          expand="lg"
          bg="light"
        >
          <Navbar.Brand
            onClick={() => history.push("/profile/")}
          >
            {this.props.userName}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav className="flex-row">
            {this.props.showSearch ? (
              <NavItem className="ml-5">
                <Form inline>
                  <Nav.Link
                    onClick={() => {
                      sessionMgmt.logout(self.props.userName);
                      history.push("/login");
                    }}
                  >
                    Sign out <i class="fas fa-sign-out-alt"></i>
                  </Nav.Link>
                </Form>
              </NavItem>
            ) : null}
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
