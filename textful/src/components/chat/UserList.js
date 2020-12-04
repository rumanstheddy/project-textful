import React from "react";
import history from "../../services/History";

export default class UserList extends React.Component {
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
                history.push("/profile/" + user._id, user);
            });
    };

    goToProfile = (user) => {
        history.push("/profile/" + user._id, user);
    };

    renderUserList = () => {
        return this.state.userList.map((user) => (
            <div class="d-flex flex-row border rounded">
                <div class="pl-3 pt-2 pr-2 pb-2 w-75 border-left">
                    <p class="text-primary" id="username">
                        {user.userName}
                    </p>
                    <p class="text-right m-0">
                        <button
                            class="btn btn-primary"
                            id="goToProfileBtn"
                            onClick={() => this.goToProfile(user)}
                        >
                            <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 16 16"
                                class="bi bi-person"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                                />
                            </svg>
                            Profile
                        </button>
                    </p>
                </div>
            </div>
        ));
    };

    render() {
        return (
            // <h1>Hi</h1>
            <div class="row justify-content-center">
                <h3>List of usernames to search:</h3>
                {this.renderUserList()}
            </div>
        );
    }
}
