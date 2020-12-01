import React from "react";
import history from "../../services/History";
import "./Chat.css";

export default class ConversationView extends React.Component {
  constructor(props) {
    super(props);
  }

  renderChatView = () => {
    return (
      <div class="row col-11 ml-4 p-0 shadow-lg" id="chatInputFld">
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
    );
  };

  renderDefaultView = () => {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <button class="btn btn-primary" id="menu-toggle">
            <i class="fas fa-chevron-left"></i>
          </button>

          <a class="navbar-brand" id="contactName">
            Another user
          </a>

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
    return <div id="page-content-wrapper">{this.renderChatView()}</div>;
  }
}
