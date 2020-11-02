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
      <li class="list-group-item" onClick={() => this.goToProfile(user)}>
        {user.userName}
      </li>
    ));
  };

  render() {
    return (
      <div>
        <input
          name="text"
          type="text"
          placeholder="Search"
          onChange={this.handleChange}
        />
        <button onClick={this.startSearch}>Search</button>
        <h3>List of usernames to search...</h3>
        <ul class="list-group">{this.renderUserList()}</ul>
      </div>
    );
  }
}
