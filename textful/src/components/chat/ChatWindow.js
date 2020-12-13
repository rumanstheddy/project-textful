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
      messageList: [],
      conversationId: "",
    };

    socket.joinChat();
    socket.registerForEvent("NEW_MESSAGE", this.addMessageToState);
  }

  addMessageToState = () => {
    console.log("chat component");
  };

  componentDidMount = () => {
    let self = this;
    const url = "https://wbdv-textful-server.herokuapp.com";
    let userName = "";
    try {
      if (sessionMgmt.anyValidSession()) {
        userName = sessionMgmt.getUserName();
        console.log("username: ", userName);
      } else return <Redirect to="/login" />;
    } catch (err) {
      console.log(err);
    }

    //   console.log(history.location.state);
    if (history.location.state !== undefined) {
      if (history.location.state.canRenderMessages) {
        this.fetchMessages();
      }
    } else {
      fetch(url + "/users/" + userName + "/conversations")
        .then((res) => res.json())
        .then((res) => {
          let listOfConv = res.map((convObj) => {
            return {
              chatId: convObj._id,
              chatName:
                convObj.toUser === sessionMgmt.getUserName()
                  ? convObj.fromUser
                  : convObj.toUser,
              convoType: convObj.convoType,
              privateChatId: convObj.privateChatId,
            };
          });
          self.setState({ chatList: listOfConv });
        });
    }
  };

  fetchMessages = () => {
    let self = this;
    console.log(this.props);
    const url = "https://wbdv-textful-server.herokuapp.com/conversations/";
    let userName = "";
    try {
      if (sessionMgmt.anyValidSession()) {
        userName = sessionMgmt.getUserName();
        console.log("username: ", userName);
      } else return <Redirect to="/login" />;
    } catch (err) {
      console.log(err);
    }
    fetch(url + history.location.state.conversationId + "/messages")
      .then((res) => res.json())
      .then((res) => {
        self.setState({
          messageList: res,
          conversationId: history.location.state.conversationId,
        });
      });
  };

  render() {
    if (!sessionMgmt.anyValidSession()) return <Redirect to="/login" />;
    return (
      <div class="d-flex" id="wrapper">
        {console.log(history)}
        <ConversationList
          userName={sessionMgmt.getUserName()}
          chatList={this.state.chatList}
          fetchMessage={this.fetchMessages}
        />
        <ConversationView
          userName={sessionMgmt.getUserName()}
          chatList={this.state.chatList}
          messageList={this.state.messageList}
          conversationId={this.state.conversationId}
        />
      </div>
    );
  }
}

export default ChatWindow;
