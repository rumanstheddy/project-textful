import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useHistory} from "react-router-dom";
import Login from "./components/login/Login";
import Registration from "./components/login/Registration";



class App extends React.Component {
    render() {
        return (
            <Router history={useHistory}>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route path="/register" component={Registration} />
                </Switch>
            </Router>
        );
    }
}

export default App;
