import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import history from "../../services/History";
import "./Home.css";
import * as sessionMgmt from "../../services/SessionHandler";
import { Link, Redirect } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [{ userType: "", firstName: "", lastName: "", userName: "" }],
      conversations: [
        { chatId: "", chatName: "", convoType: "", privateChatId: "" },
      ],
    };
  }

  componentDidMount() {
    const url = "https://wbdv-textful-server.herokuapp.com/users/";

    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => {
        let listOfUsers = resp.map((userObj) => {
          return {
            userType: userObj.userType,
            firstName: userObj.firstName,
            lastName: userObj.lastName,
            userName: userObj.userName,
          };
        });

        this.setState({ users: listOfUsers });
      });

    let userName = "";

    if (sessionMgmt.anyValidSession()) {
      userName = sessionMgmt.getUserName();
    }

    fetch(url + userName + "/conversations")
      .then((res) => res.json())
      .then((res) => {
        let listOfConv = res.map((convObj) => {
          return {
            chatId: convObj._id,
            chatName:
              convObj.toUser === sessionMgmt.getUserName()
                ? convObj.fromUser
                : convObj.toUser,
            convoType: convObj.convoType,
            privateChatId: convObj.privateChatId,
          };
        });

        this.setState({ conversations: listOfConv });
      });
  }

  render() {
    return (
      <div className="container">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand onClick={() => history.push("/")}>Textful</Navbar.Brand>

          {!sessionMgmt.anyValidSession() ? (
            <span>
              <Nav className="mr-auto">
                <Nav.Link onClick={() => history.push("/login")}>
                  Login
                </Nav.Link>
                <Nav.Link onClick={() => history.push("/register")}>
                  Register
                </Nav.Link>
              </Nav>
            </span>
          ) : (
            <span>
              {" "}
              <Nav className="mr-auto">
                <Nav.Link onClick={() => history.push("/user/chat")}>
                  Chat
                </Nav.Link>
                <Nav.Link onClick={() => history.push("/profile")}>
                  Profile
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    let userName = sessionMgmt.getUserName();
                    sessionMgmt.logout(userName);
                    history.push("/login");
                  }}
                >
                  Sign Out
                </Nav.Link>
              </Nav>{" "}
            </span>
          )}
        </Navbar>

        <div className="jumbotron">
          {!sessionMgmt.anyValidSession() ? (
            <div>
              <h2 className="display-4"> Welcome to Textful! </h2>
              <p class="lead">
                A simple chat application made by our team:
                <br /> Ayub, Durga and Sumanth
              </p>
              {!this.state.users[this.state.users.length - 1] ? (
                <span>
                  <h2 className="no-users">
                    There does not seem to be any users on this platform at the
                    time. Be the first to Sign Up!
                  </h2>
                </span>
              ) : (
                <h2 className="sub-title">
                  <br />
                  Our Newest User is{" "}
                  <a
                    className="profileLink"
                    onClick={() =>
                      history.push(
                        "/profile/" +
                          this.state.users[this.state.users.length - 1].userName
                      )
                    }
                  >
                    {this.state.users[this.state.users.length - 1].firstName}
                  </a>
                  <br />
                  <br />
                  <p>
                    Click <Link to="/register">here</Link> to register and start
                    chatting!
                  </p>
                  <p>Already a user? click on the button below to login!</p>
                  <a
                    class="btn btn-primary btn-lg"
                    role="button"
                    onClick={() => history.push("/login")}
                  >
                    Login
                  </a>
                </h2>
              )}
            </div>
          ) : (
            <span>
              {" "}
              <h2 className="display-4">
                {" "}
                Welcome, {sessionMgmt.getUserName()}!{" "}
              </h2>
              {!this.state.conversations[
                this.state.conversations.length - 1
              ] ? (
                <span>
                  <h2 className="no-convo">
                    You do not seem to be having a conversation with anyone at
                    the moment. Head over to chat to start one!
                  </h2>
                </span>
              ) : (
                <span>
                  <h2 className="sub-title">
                    {" "}
                    Your Most Recent Conversation was with{" "}
                    <a
                      className="profileLink"
                      onClick={() =>
                        history.push(
                          "/profile/" +
                            this.state.conversations[
                              this.state.conversations.length - 1
                            ].chatName
                        )
                      }
                    >
                      {
                        this.state.conversations[
                          this.state.conversations.length - 1
                        ].chatName
                      }{" "}
                    </a>
                  </h2>
                </span>
              )}
            </span>
          )}

          <h5 className="description"></h5>
        </div>
      </div>
    );
  }
}
