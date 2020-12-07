import React from "react";
import history from "../../services/History";
import "./Chat.css";
import ChatBubble from "./ChatBubble";
import * as sessionMgmt from "../../services/SessionHandler";

export default class ConversationView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toUsernameExists: false,
      toUserName: "",
      conversation: [],
      messageText: "",
    };
  }

  componentDidMount = () => {
    this.unlisten = history.listen((location) => {
      console.log("Route changed");
      this.handleUrlChange();
    });
  };

  componentWillUnmount = () => {
    this.unlisten();
  }

  handleUrlChange = () => {
    try {
      let toUserName = history.location.state.toUserName;
      this.setState({
        toUsernameExists: true,
        toUserName: toUserName,
        conversation: [
          {
            userName: this.props.userName,
            isSentMessage: true,
            messageBody:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            userName: toUserName,
            isSentMessage: false,
            messageBody:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            userName: toUserName,
            isSentMessage: false,
            messageBody:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleSignOut = () => {
    if (sessionMgmt.isLoggedIn(this.props.userName)) {
      sessionMgmt.logout(this.props.userName);
      history.push("/login");
    }
  };

  handleChange = (event) => {
    console.log("EVENT: ", event);
    this.setState({ messageText: event.target.value });
    console.log(this.state.messageText);
  };

  sendMessage = () => {
    let message = {
      userName: this.props.userName,
      isSentMessage: true,
      messageBody: this.state.messageText,
    };

    this.setState({
      conversation: [...this.state.conversation, message],
      messageText: ""
    });
  };

  renderChatView = () => {
    let conversation = this.state.conversation;
    return (
      <div id="page-content-wrapper">
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          {/* <button class="btn btn-primary" id="menu-toggle">
            <i class="fas fa-chevron-left"></i>
          </button> */}

          <a class="navbar-brand" id="contactName">
            {this.state.toUserName}
          </a>

          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item" onClick={() => history.push("/login")}>
              <a class="nav-link" id="signoutLink">
                Sign out <i class="fas fa-sign-out-alt"></i>
              </a>
            </li>
          </ul>
        </nav>
        <div id="scrollableContent">
          <span>
            {/* compare username from conversation json and this username to display sender and receiver */}
            {conversation.map((chat) => (
              <ChatBubble
                userName={chat.userName}
                isSentMessage={chat.isSentMessage}
                messageBody={chat.messageBody}
              />
            ))}
          </span>
        </div>
        <div class="row col-9 ml-4 p-0 shadow-lg" id="chatInputFld">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Send a message"
              onChange={this.handleChange}
              value={this.state.messageText}
            />
            <div class="input-group-append">
              <button
                class="btn btn-primary"
                type="button"
                onClick={this.sendMessage}
              >
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderDefaultView = () => {
    console.log(history);
    return (
      <div id="page-content-wrapper">
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          {/* <button class="btn btn-primary" id="menu-toggle">
            <i class="fas fa-chevron-left"></i>
          </button> */}

          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item" onClick={() => this.handleSignOut()}>
              <a class="nav-link" id="signoutLink">
                Sign out <i class="fas fa-sign-out-alt"></i>
              </a>
            </li>
          </ul>
        </nav>

        <div class="container" id="defaultConvoViewTxt">
          <h2 class="font-weight-normal">
            Welcome <b>{this.props.fullName}</b>!
          </h2>
          <h5 class="font-weight-normal">
            Click on any of the contact names listed on the left to start
            chatting!
            <br />
            You can also start a new conversation with someone by clicking{" "}
            <i class="fas fa-comment-medical" id="newConvoInfoTxt"></i> located
            on the bottom left.
          </h5>
        </div>
      </div>
    );
  };

  render() {
    return this.state.toUsernameExists
      ? this.renderChatView()
      : this.renderDefaultView();
  }
}
