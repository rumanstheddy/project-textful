import React from "react";
import { useParams } from "react-router-dom";
import history from "../../services/History";

class ConversationList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchUserName: "",
      isSearchEnabled: false,
    };
    this.searchRef = React.createRef();
  }

  handleSearch = () => {
    let self = this;
    let shouldSearch = false;
    for (var i = 0; i < this.props.contactList.length; i++) {
      if (this.props.contactList[i].userName === this.searchRef.current.value) {
        shouldSearch = true;
        break;
      }
    }
    if (shouldSearch) {
      this.setState({
        isSearchEnabled: true,
        searchUserName: self.searchRef.current.value,
      });
    } else {
      this.setState({ isSearchEnabled: false, searchUserName: "" });
    }
  };

  render() {
    return (
      <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="sidebar-heading" id="userNameTxt">
            <a onClick={() => {
                history.push("/profile")
            }}>{this.props.userName}</a>
        </div>


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
        {!this.state.isSearchEnabled ? (
          <div class="list-group list-group-flush">
            {console.log(this.props)}
            {this.props.chatList.map((user) => (
              <a
                class="list-group-item list-group-item-action bg-light"
                onClick={() =>
                  history.push({
                    pathname: "/user/chat/" + user.userName,
                    state: {
                      // toUserName: user.userName,
                      userName: this.props.userName,
                    },
                    toUserName: user.userName
                  })
                }
              >
                {user.chatName}
              </a>
            ))}
          </div>
        ) : (
          <div>
            <a
              class="list-group-item list-group-item-action bg-light"
              onClick={() =>
                history.push({
                  pathname: "/user/" + "/chat/" + this.state.searchUserName,
                  state: {
                    toUserName: this.state.searchUserName,
                    userName: this.props.userName,
                  },
                })
              }
            >
              {console.log(this.state.searchUserName)}
              {this.state.searchUserName}
            </a>
          </div>
        )}
        {console.log("came here")}
        <button
          type="button"
          class="btn btn-primary rounded-circle"
          id="createConvoBtn" onClick={() => {
            {console.log("came here too")}
            history.push({
              pathname: "/user/chat/users",
              state: {
                userName: this.props.userName
              }
            })
          }
        }
        >
          <i class="fas fa-comment-medical"></i>
        </button>
      </div>
    );
  }
}

export default ConversationList;
