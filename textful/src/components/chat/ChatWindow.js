import React from "react";
import ConversationList from "./ConversationList";
import ConversationView from "./ConversationView";
import "./Chat.css";
import { Redirect } from "react-router-dom";
import * as sessionMgmt from "../../services/SessionHandler";
import * as socket from "../../services/ChatSocket";
import SearchComponent from "../search/searchComponent";

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      contactList: [],
      chatList: []
    };

    socket.joinChat()
    socket.registerForEvent("NEW_MESSAGE", this.addMessageToState);
  }

  addMessageToState = () => {
    console.log("chat component");
  }

  componentDidMount = () => {
    let self = this;
    console.log(this.props);
    const url = "http://localhost:4000/users/";
    let userName = "";
    try {
      if (sessionMgmt.anyValidSession()) {
        userName = sessionMgmt.getUserName();
        console.log("username: ", userName);
      } else return <Redirect to="/login" />;
    } catch (err) {
      console.log(err);
    }
    fetch(url+userName+"/conversations" )
        .then((res) => res.json())
        .then((res) => {
          let listOfConv = res.map((convObj => {
            return {
              chatId: convObj._id,
              chatName: convObj.convoType === "Group" ? convObj.groupName : convObj.toUser === sessionMgmt.getUserName() ? convObj.fromUser : convObj.toUser,
              convoType: convObj.convoType,
              privateChatId: convObj.privateChatId
            }
          }))
        self.setState({chatList: listOfConv})


    // fetch(url)
    //   .then((res) => res.json())
    //   .then((users) => {
    //     users.map((user) => {
    //       if (user.userName !== userName) {
    //         return this.setState({
    //           contactList: [...this.state.contactList, user],
    //         });
    //       }
    //     });
      });
  };

  render() {
    if (!sessionMgmt.anyValidSession()) return <Redirect to="/login" />;
    return (
      <div class="d-flex" id="wrapper">
        {console.log("chatwindow:", this.state.contactList)}
        <ConversationList
          fullName={this.state.fullName}
          userName={sessionMgmt.getUserName()}
          chatList={this.state.chatList}
          contactList={this.state.contactList}
        />
        <ConversationView
          fullName={this.state.fullName}
          userName={sessionMgmt.getUserName()}
          chatList={this.state.chatList}
        />
      </div>
    );
  }
}

export default ChatWindow;
