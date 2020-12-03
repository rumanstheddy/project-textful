import React from "react";
import history from "../../services/History";
import "./Chat.css";
import ChatBubble from "./ChatBubble";

export default class ConversationView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toUsernameExists: false,
      toUserName: "",
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    this.handleUrlChange();
  };

  handleUrlChange = () => {
    try {
      let toUserName = history.location.state.toUserName;
      this.setState({ toUsernameExists: true, toUserName: toUserName });
    } catch (err) {
      console.log(err);
    }
  };

  renderChatView = () => {
    console.log("history:", history);
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
            <ChatBubble
              userName={this.props.userName}
              isSentMessage={true}
              messageBody={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              }
            />
            <ChatBubble
              userName={this.props.userName}
              isSentMessage={false}
              messageBody={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              }
            />
            <ChatBubble
              userName={this.props.userName}
              isSentMessage={false}
              messageBody={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              }
            />
          </span>
        </div>
        <div class="row col-9 ml-4 p-0 shadow-lg" id="chatInputFld">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Send a message"
            />
            <div class="input-group-append">
              <button class="btn btn-primary" type="button">
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderDefaultView = () => {
    return (
      <div id="page-content-wrapper">
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          {/* <button class="btn btn-primary" id="menu-toggle">
            <i class="fas fa-chevron-left"></i>
          </button> */}

          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item" onClick={() => history.push("/login")}>
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
