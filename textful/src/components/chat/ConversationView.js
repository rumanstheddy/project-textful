import React from "react";
import history from "../../services/History";
import "./Chat.css";
import ChatBubble from "./ChatBubble";
import * as sessionMgmt from "../../services/SessionHandler";
import { Redirect } from "react-router-dom";

export default class ConversationView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toUsernameExists: false,
      toUserName: "",
      messageSent: false,
    };
    this.msgRef = React.createRef();
  }

  componentDidMount = () => {
    console.log(history);
    this.unlisten = history.listen((location) => {
      console.log("Route changed");
      this.handleUrlChange();
    });
  };

  componentWillUnmount = () => {
    this.unlisten();
  };

  handleUrlChange = () => {
    if (history.location.state === undefined) return;

    if (history.location.state.toUserName === undefined) return;

    let toUserName = history.location.state.toUserName;
    this.setState({
      toUsernameExists: true,
      toUserName: toUserName,
    });
  };

  handleSignOut = () => {
    if (sessionMgmt.isLoggedIn(this.props.userName)) {
      sessionMgmt.logout(this.props.userName);
      history.push("/login");
    }
  };

  sendMessage = (type) => {
    let self = this;
    let message = {};
    const url = "https://wbdv-textful-server.herokuapp.com";
    let userName = "";
    if (type === "message") {
      try {
        if (sessionMgmt.anyValidSession()) {
          userName = sessionMgmt.getUserName();
          console.log("username: ", userName);
        } else return <Redirect to="/login" />;
      } catch (err) {
        console.log(err);
      }
      message = {
        text: this.msgRef.current.value,
        fromUser: sessionMgmt.getUserName(),
        time: new Date(),
        messageContent: this.state.messageText,
        conversationId: this.props.conversationId,
      };
      fetch(url + "/conversations/" + this.props.conversationId + "/messages", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      }).then(() => this.fetchMessages());
    } else {
      let jokeapiUrl =
        "https://sv443.net/jokeapi/v2/joke/Programming?type=single";
      fetch(jokeapiUrl)
        .then((res) => res.json())
        .then((jokeObj) => {
          console.log(jokeObj);
          let joke = jokeObj.joke;
          message = {
            text: joke,
            fromUser: sessionMgmt.getUserName(),
            time: new Date(),
            conversationId: this.props.conversationId,
          };
          fetch(
            url + "/conversations/" + this.props.conversationId + "/messages",
            {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ message: message }),
            }
          ).then(() => this.fetchMessages());
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
          updatedMessageList: res,
          conversationId: history.location.state.conversationId,
          getUpdatedMessages: true,
          toUsernameExists: true,
          toUserName: history.location.state.toUserName,
        });
      });
  };

  renderChatView = () => {
    // {console.log(history)}
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
            {this.props.messageList.map((msg) => (
              <ChatBubble
                fromUser={msg.fromUser}
                messageContent={msg.text}
                toUserName={history.location.state.toUserName}
                time={msg.time}
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
              ref={this.msgRef}
            />
            <div class="input-group-append">
              <button
                class="btn btn-warning"
                type="button"
                onClick={() => this.sendMessage("joke")}
              >
                Send a joke
              </button>
            </div>
            <div class="input-group-append">
              <button
                class="btn btn-primary"
                type="button"
                onClick={() => this.sendMessage("message")}
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
    // console.log(history);
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
            Welcome <b>{this.props.userName}</b>!
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

  rerenderChatView = () => {
    {
      console.log(history);
    }
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
            {this.state.updatedMessageList.map((msg) => (
              <ChatBubble
                fromUser={msg.fromUser}
                messageContent={msg.text}
                toUserName={history.location.state.toUserName}
                time={msg.time}
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
              ref={this.msgRef}
            />
            <div class="input-group-append">
              <button
                class="btn btn-warning"
                type="button"
                onClick={() => this.sendMessage("joke")}
              >
                Send a joke
              </button>
            </div>
            <div class="input-group-append">
              <button
                class="btn btn-primary"
                type="button"
                onClick={() => this.sendMessage("message")}
              >
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.state.toUsernameExists
      ? this.state.getUpdatedMessages
        ? this.rerenderChatView()
        : this.renderChatView()
      : this.renderDefaultView();
  }
}
