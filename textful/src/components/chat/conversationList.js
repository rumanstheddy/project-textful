import React from "react";

const ConversationList = (props) => (
  <div class="bg-light border-right" id="sidebar-wrapper">
    <div class="sidebar-heading">{props.fullName}</div>
    <div class="list-group list-group-flush">
      {console.log(props)}
      {/* {props.contactList.map((userName) => (
        <a href="#" class="list-group-item list-group-item-action bg-light">
          {userName}
        </a>
      ))} */}
    </div>
    <button type="button" class="btn btn-primary rounded-circle" id="newConvoBtn">
      <i class="fas fa-comment-medical"></i>
    </button>
  </div>
);

export default ConversationList;
