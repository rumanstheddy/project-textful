import React from "react";
import ConversationList from "./ConversationList";
import ConversationView from "./ConversationView";
import "./Chat.css";
import { Redirect } from "react-router-dom";
import * as sessionMgmt from "../../services/SessionHandler";
import * as socket from "../../services/ChatSocket";
import history from "../../services/History";

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: [],
      chatList: [],
    };

    socket.joinChat();
    socket.registerForEvent("NEW_MESSAGE", this.addMessageToState);
  }

  addMessageToState = () => {
    console.log("chat component");
  };

  componentDidMount = () => {
    let self = this;
    console.log(this.props);
    const url = "https://wbdv-textful-server.herokuapp.com/users/";
    let userName = "";
    try {
      if (sessionMgmt.anyValidSession()) {
        userName = sessionMgmt.getUserName();
        console.log("username: ", userName);
      } else return <Redirect to="/login" />;
    } catch (err) {
      console.log(err);
    }
    
    fetch(url + userName + "/conversations")
      .then((res) => res.json())
      .then((res) => {
        let listOfConv = res.map((convObj) => {
          return {
            chatId: convObj._id,
            chatName: convObj.toUser,
            convoType: convObj.convoType,
            privateChatId: convObj.privateChatId,
          };
        });
        self.setState({ chatList: listOfConv });
      });

    console.log("history", history);
  };

  render() {
    if (!sessionMgmt.anyValidSession()) return <Redirect to="/login" />;
    return (
      <div class="d-flex" id="wrapper">
        <ConversationList
          userName={sessionMgmt.getUserName()}
          chatList={this.state.chatList}
          contactList={this.state.contactList}
        />
        <ConversationView
          userName={sessionMgmt.getUserName()}
          chatList={this.state.chatList}
        />
      </div>
    );
  }
}

export default ChatWindow;
