import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Login from "./components/login/Login";
import Registration from "./components/login/Registration";
import AdminHome from "./components/admin/AdminHome";
import UserProfile from "./components/profile/UserProfile";
import Home from "./components/home/Home";
import chatWindow from "./components/chat/chatWindow";

class App extends React.Component {
  render() {
    return (
      <Router history={useHistory}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/admin/:id" component={AdminHome} />
          <Route exact path="/profile/:id" component={UserProfile} />
          <Route exact path="/user/:id/chat" component={chatWindow} />
        </Switch>
      </Router>
    );
  }
}

export default App;
