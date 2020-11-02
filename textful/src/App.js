import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Login from "./components/login/Login";
import Registration from "./components/login/Registration";
import AdminHome from "./components/admin/AdminHome";
import UserProfile from "./components/UserProfile";

class App extends React.Component {
  render() {
    return (
      <Router history={useHistory}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/admin/:id" component={AdminHome} />
          <Route exact path="/profile/:id" component={UserProfile} />
        </Switch>
      </Router>
    );
  }
}

export default App;
