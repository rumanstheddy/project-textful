import React from "react";
import {
    Navbar,
    Nav,
    NavItem,
    Form,
    FormControl,
    Button,
  } from "react-bootstrap";
import history from "../services/History";


class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    var self = this;
    return (
      <div>
        <Navbar
          className="justify-content-between"
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <Navbar.Brand
            onClick={() => history.push("/profile/" + self.props.userName)}
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
                        history.push("/adminHome");
                      }}
                    >
                      Admin Home
                    </Nav.Link>

                  <Nav.Link
                    onClick={() => {
                      history.push("/");
                    }}
                  >
                    Logout
                  </Nav.Link>
                  <FormControl
                    ref={this.inputRef}
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                  />
                  <Button
                    className="btn btn-primary"
                    variant="primary"
                    onClick={() =>
                      history.push("/search/" + this.inputRef.current.value)
                    }
                  >
                    Search
                  </Button>
                </Form>
              </NavItem>
            ) : null}
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default TopBar;
