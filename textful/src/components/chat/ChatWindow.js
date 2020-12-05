import React from "react";
import ConversationList from "./ConversationList";
import ConversationView from "./ConversationView";
import "./Chat.css";
import { Redirect } from "react-router-dom";
import * as sessionMgmt from "../../services/SessionHandler";

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      contactList: [],
    };
  }

  componentDidMount = () => {
    console.log(this.props);
    const url = "https://wbdv-textful-server.herokuapp.com/users/";
    const userName = sessionMgmt.getUserName();
    fetch(url + userName)
      .then((res) => res.json())
      .then((user) => {
        return this.setState({
          fullName: user.firstName + " " + user.lastName,
        });
      });

    fetch(url)
      .then((res) => res.json())
      .then((users) => {
        users.map((user) => {
          if (user.userName !== userName) {
            return this.setState({
              contactList: [...this.state.contactList, user],
            });
          }
        });
      });
  };

  render() {
    if (!sessionMgmt.anyValidSession()) return <Redirect to="/login" />;
    return (
      <div class="d-flex" id="wrapper">
        <ConversationList
          fullName={this.state.fullName}
          userName={sessionMgmt.getUserName()}
          // contactList={this.state.contactList}
        />
        <ConversationView
          fullName={this.state.fullName}
          userName={sessionMgmt.getUserName()}
          contactList={this.state.contactList}
        />
      </div>
    );
  }
}

export default ChatWindow;
