import React from "react";
import "./ChatBubble.css";
import history from "../../services/History";
import * as sessionMgmt from "../../services/SessionHandler";


class ChatBubble extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditable : false
    };

    this.editMsgRef = React.createRef();
  }

  handleEditMessage = () => {
      this.setState({isEditable: true});
  }

  updateMessage = () => {
    var newMsg = this.editMsgRef.current.value;
    console.log(newMsg);
    const newMsgObj = {
      fromUser: sessionMgmt.getUserName(),
      content: newMsg,
      time:new Date(),
      conversationId: this.props.conversationId
    }

    console.log(newMsgObj);
    this.props.handleUpdateMessage(this.props.messageId, newMsgObj);
    this.setState({isEditable: false})
  }

  handleCancelEdit = () => {
    this.setState({isEditable: false})
  }

  render() {
    const activeClass = this.props.fromUser === sessionMgmt.getUserName() ? " bg-primary text-light " : "bg-light text-dark "
    const activeClassForFloatRight = this.props.fromUser === sessionMgmt.getUserName() ? " float-right ": "";
    return (
      <div class={this.props.isSentMessage ? "outgoing_msg " : "incoming_msg "}>
        <div
          class={
            "received_msg received_withd_msg"+activeClassForFloatRight
          }
        >
          {this.props.fromUser}
          {this.props.loggedInUserSentMessage && this.state.isEditable?
          <div class="float-right d-flex">
            
            <div class="update_icon" onClick={() => this.updateMessage()}><i class="fas fa-check" ></i></div>
            <div class="close_edit_icon" onClick={() => this.handleCancelEdit()}><i class="fas fa-times" ></i></div>
            </div> :
            null
          }
          {this.props.loggedInUserSentMessage && !this.state.isEditable?
          <div class="float-right d-flex">
            
          <div class="edit_icon" onClick={() => this.handleEditMessage()}><i class="fas fa-pencil-alt" ></i></div>
          </div> :
          null
          }

        {this.props.loggedInUserSentMessage ?
        <div class="float-right d-flex">
            <div class="delete_icon" onClick= {() => this.props.handleDeleteMessage(this.props.messageId, this.props.conversationId)}>
              <i class="fas fa-trash "></i></div> 
          </div> : null }
          {this.state.isEditable ?
          <input
            type="text"
            class="form-control"
            placeholder={this.props.messageContent}
            ref = {this.editMsgRef}
          />
            :
            <p class={activeClass}>{this.props.messageContent}</p>
            }
          
          <span class="time_date"> {this.props.time}</span>
        </div>
      </div>
    );
  }
}

export default ChatBubble;
