import React from "react";
import "./AdminHome.css";

export default class AdminHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: [],
      searchValue: "",
    };
  }

  componentDidMount = () => {
    const userId = this.props.match.params.id;
    this.setState({ userId: userId });
    fetch("https://wbdv-textful-server.herokuapp.com/users", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((users) =>
        users.map((user) => {
          return this.setState({ userList: [...this.state.userList, user] });
        })
      );
  };

  handleChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
    console.log(this.state.searchValue);
  };

  startSearch = () => {
    let username = this.state.searchValue;
    console.log("username:", this.state.searchValue);
    fetch("https://wbdv-textful-server.herokuapp.com/users/" + username, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((user) => {
        this.props.history.push("/profile/" + user._id, user);
      });
  };

  goToProfile = (user) => {
    this.props.history.push("/profile/" + user._id, user);
  };

  renderUserList = () => {
    return this.state.userList.map((user) => (
      <div class="d-flex flex-row border rounded">
        <div class="pl-3 pt-2 pr-2 pb-2 w-75 border-left">
          <h4 class="text-primary">{user.userName}</h4>
          <p class="text-right m-0">
            <button
              class="btn btn-primary"
              onClick={() => this.goToProfile(user)}
            >
              <i class="far fa-user"></i> View Profile
            </button>
          </p>
        </div>
      </div>
    ));
  };

  render() {
    return (
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <form class="card card-sm">
            <div class="card-body row no-gutters align-items-center">
              <div class="col-auto">
                <i class="fas fa-search h4 text-body"></i>
              </div>
              <div class="col">
                <input
                  class="form-control form-control-lg form-control-borderless"
                  type="search"
                  name="text"
                  placeholder="Search"
                  onChange={this.handleChange}
                />
              </div>
              <div class="col-auto">
                <button
                  type="button"
                  class="btn btn-lg btn-success"
                  onClick={this.startSearch}
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-search"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
          <h3>List of usernames to search:</h3>
          {this.renderUserList()}
        </div>
      </div>
    );
  }
}
