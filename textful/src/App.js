import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Router, Route, Switch } from "react-router-dom";
import history from "./services/History";
import Login from "./components/login/Login";
import Registration from "./components/login/Registration";
import AdminHome from "./components/admin/AdminHome";
import UserProfile from "./components/profile/UserProfile";
import Home from "./components/home/Home";
import "@fortawesome/fontawesome-free/js/all.js";
import ChatWindow from "./components/chat/ChatWindow";

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/admin/:userName" component={AdminHome} />
          <Route exact path="/profile/:userName" component={UserProfile} />
          <Route exact path="/user/chat" component={ChatWindow} />
          <Route path="/user/chat/:userName2" component={ChatWindow} />
        </Switch>
      </Router>
    );
  }
}

export default App;
