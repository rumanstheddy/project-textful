import React from "react";
import ConversationList from "./ConversationList";
import ConversationView from "./ConversationView";
import "./Chat.css";

export default class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="d-flex" id="wrapper">
        <ConversationList />
        <ConversationView />
      </div>
    );
  }
}
