import React from "react";
import history from "../../services/History";
import { Table, Button } from "react-bootstrap";

export default class RenderAllUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUser: "",
      allUserList: [],
      searchUserNameList: [],
      isSearchEnabled: false,
      searchValue: "",
    };
    this.searchRef = React.createRef();
  }

  componentDidMount() {
    let self = this;
    const url = "https://wbdv-textful-server.herokuapp.com/users/";
    fetch(url)
      .then((res) => res.json())
      .then((usersList) => self.setState({ allUserList: usersList }));
  }

  handleChange = (event) => {
    let self = this;
    self.setState({
      searchValue: event.target.value,
    });
  };

  handleSearch = () => {
    let self = this;
    var searchUserName = self.searchRef.current.value;
    const url =
      "https://wbdv-textful-server.herokuapp.com/search/" + searchUserName;
    fetch(url)
      .then((res) => res.json())
      .then((userNamesList) =>
        self.setState({
          searchUserNameList: userNamesList,
          isSearchEnabled: true,
        })
      );
  };

  cancelSearch = () => {
    let self = this;
    self.setState({
      searchValue: "",
      isSearchEnabled: false,
    });
  };

  renderSearchView = () => {
    const userContent = this.state.searchUserNameList.map((userObj) => (
      <tr>
        <td>{userObj.userName}</td>
        <td>{userObj.firstName}</td>
        <td>{userObj.lastName}</td>
        <td>
          <Button variant="primary" onClick={() => console.log("clicked")}>
            chat
          </Button>
        </td>
      </tr>
    ));
    return (
      <div>
        <div class="row" id="searchbox">
          <input
            class="form-control col-9"
            ref={this.searchRef}
            type="search"
            onChange={this.handleChange}
            value={this.state.searchValue}
            placeholder="Search"
          ></input>
          <div class="col-3" onClick={this.handleSearch}>
            <button class="btn btn-primary" type="button">
              <i class="fas fa-search fa-2x" id="searchIcon"></i>
            </button>
            <button
              class="btn btn-danger"
              type="button"
              onClick={this.cancelSearch}
              id="cancelSearchBtn"
            >
              <i class="fas fa-search-minus"></i>
            </button>
          </div>
        </div>
        <Table striped bordered hove>
          <thead>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </thead>
          <tbody>{userContent}</tbody>
        </Table>
      </div>
    );
  };

  renderDefaultView = () => {
    const userContent = this.state.allUserList.map((userObj) => (
      <tr>
        <td>{userObj.userName}</td>
        <td class="d-none d-sm-table-cell">{userObj.firstName}</td>
        <td class="d-none d-sm-table-cell">{userObj.lastName}</td>
        <td>
          <Button variant="primary" onClick={() => console.log("clicked")}>
            chat
          </Button>
        </td>
      </tr>
    ));
    return (
      <div>
        <div class="row" id="searchbox">
          <input
            class="form-control col-9"
            ref={this.searchRef}
            type="search"
            placeholder="Search"
          ></input>
          <div class="col-3" onClick={this.handleSearch}>
            <button class="btn btn-primary" type="button">
              <i class="fas fa-search fa-2x" id="searchIcon"></i>
            </button>
          </div>
        </div>
        <Table striped bordered hove>
          <thead>
            <th>Username</th>
            <th class="d-none d-sm-table-cell">First Name</th>
            <th class="d-none d-sm-table-cell">Last Name</th>
            <th>Actions</th>
          </thead>
          <tbody>{userContent}</tbody>
        </Table>
      </div>
    );
  };

  render() {
    return (
      <div class="container table-striped">
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li>
              <div className="btn-link">
                <a
                  className="btn btn-primary"
                  onClick={() =>
                    history.push({
                      pathname: "/user/chat/",
                      state: {
                        toUserName: "",
                        userName: this.props.userName,
                      },
                    })
                  }
                >
                  Back
                </a>
              </div>
            </li>
            <li class="nav-item" onClick={() => history.push("/login")}>
              <a class="nav-link" id="signoutLink">
                Sign out <i class="fas fa-sign-out-alt"></i>
              </a>
            </li>
          </ul>
        </nav>
        <h3> List of Users </h3>
        {this.state.isSearchEnabled &&
        this.state.searchUserNameList.length !== 0
          ? this.renderSearchView()
          : this.renderDefaultView()}
      </div>
    );
  }
}
