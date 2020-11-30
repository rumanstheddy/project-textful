import React from "react";
import "./Chat.css";

const ConversationView = () => (
  <div id="page-content-wrapper">
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <button class="btn btn-primary" id="menu-toggle">
        <i class="fas fa-chevron-left"></i>
      </button>

      <a class="navbar-brand" id="contactName" href="#">
        Another user
      </a>

      <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#" id="signoutLink">
            Sign out <i class="fas fa-sign-out-alt"></i>
          </a>
        </li>
      </ul>
    </nav>

    <div class="container-fluid">
      <h1 class="font-weight-normal" id="defaultConvoViewTxt1">
        Welcome {}
      </h1>
      <h5 class="font-weight-normal" id="defaultConvoViewTxt2">
        Click on any of the contact names listed on the left to start chatting!
        <br />
        You can create a new conversation by clicking on the{" "}
        <span id="newConvoInfoTxt">new conversation button</span> located on the bottom left.
      </h5>
    </div>
  </div>
);

export default ConversationView;
