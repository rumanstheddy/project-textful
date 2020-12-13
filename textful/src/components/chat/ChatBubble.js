import React from "react";
import "./ChatBubble.css";
import history from "../../services/History";
import * as sessionMgmt from "../../services/SessionHandler";


class ChatBubble extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const activeClass = this.props.fromUser === sessionMgmt.getUserName() ? " bg-primary text-light " : "bg-light text-dark "
    const activeClassForFloatRight = this.props.fromUser === sessionMgmt.getUserName() ? " float-right ": "";
    return (
      <div class={this.props.isSentMessage ? "outgoing_msg " : "incoming_msg "}>
        <div
          class={
            this.props.isSentMessage
              ? "sent_msg "
              : "received_msg received_withd_msg"+activeClassForFloatRight
          }
        >
          {this.props.fromUser}
          <p class={activeClass}>{this.props.messageContent}</p>
          <span class="time_date"> {this.props.time}</span>
        </div>
      </div>
    );
  }
}

export default ChatBubble;
