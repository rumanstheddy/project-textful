import React from "react";
import history from "../../services/History";
import "./Chat.css";

export default class ConversationView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="page-content-wrapper">
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
  }
}
