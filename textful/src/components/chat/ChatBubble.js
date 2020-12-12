import React from "react";
import "./ChatBubble.css";
import history from "../../services/History";

class ChatBubble extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class={this.props.isSentMessage ? "outgoing_msg " : "incoming_msg "}>
        <div
          class={
            this.props.isSentMessage
              ? "sent_msg "
              : "received_msg received_withd_msg"
          }
        >
          {this.props.userName}
          <p>{this.props.messageBody}</p>
          <span class="time_date"> 11:01 AM | Today</span>
        </div>
      </div>
    );
  }
}

export default ChatBubble;
