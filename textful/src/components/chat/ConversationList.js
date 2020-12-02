import React from "react";
import history from "../../services/History";

class ConversationList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="sidebar-heading" id="userNameTxt">
          {this.props.fullName}
        </div>
        <div class="list-group list-group-flush">
          {console.log(this.props)}
          {this.props.contactList.map((user) => (
            <a
              class="list-group-item list-group-item-action bg-light"
              onClick={() =>
                history.push({
                  pathname:
                    "/user/" + this.props.userName + "/chat/" + user.userName,
                  state: { toUserName: user.userName, userName: this.props.userName },
                })
              }
            >
              {user.userName}
            </a>
          ))}
        </div>
        <button
          type="button"
          class="btn btn-primary rounded-circle"
          id="createConvoBtn"
        >
          <i class="fas fa-comment-medical"></i>
        </button>
      </div>
    );
  }
}

export default ConversationList;
