import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import history from "../../services/History";
import * as sessionMgmt from "../../services/SessionHandler";
import { Alert } from "react-bootstrap";
import {Redirect} from "react-router-dom";

export default class EditUserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user : {},
            userType: "User",
            showAlert: false,
        };

        this.firstNameRef = React.createRef();
        this.lastNameRef =  React.createRef();
        this.passwordRef =  React.createRef();

    }

    componentDidMount() {
        const url = "https://wbdv-textful-server.herokuapp.com/users/";
        let userName = "";
        try {
            if (sessionMgmt.anyValidSession()) {
                userName = sessionMgmt.getUserName();
                console.log("username: ", userName);
            } else return <Redirect to="/login" />;
        } catch (err) {
            console.log(err);
        }


        fetch(url + userName)
            .then(resp => resp.json())
            .then(resp => {this.setState({user: resp})})

    }

    handleClickToSaveUser = () => {

        console.log(this.firstNameRef.current.value)

        let editedUser = {};

        if (this.firstNameRef.current.value != '') {
            editedUser.firstName = this.firstNameRef.current.value;
        } else {
            editedUser.firstName = this.state.user.firstName;
        }

        if (this.lastNameRef.current.value != '') {
            editedUser.lastName = this.lastNameRef.current.value;
        } else {
            editedUser.lastName = this.state.user.lastName;
        }

        if (this.passwordRef.current.value != '') {
            editedUser.password = this.passwordRef.current.value;
        } else {
            editedUser.password = this.state.user.password;
        }




        fetch("https://wbdv-textful-server.herokuapp.com/users/" + this.state.user.userName, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedUser),
        })
            .then(() => history.push("/profile"))


    };


    render() {
        return (
            <div className="container">
                {/*{this.state.showAlert ? (*/}
                {/*    <Alert*/}
                {/*        variant="danger"*/}
                {/*        onClose={() => this.setState({ showAlert: false })}*/}
                {/*        dismissible*/}
                {/*    >*/}
                {/*        <Alert.Heading>Unable to Edit. Please try again.</Alert.Heading>*/}
                {/*    </Alert>*/}
                {/*) : null}*/}
                {/*<Navbar bg="light" expand="lg">*/}
                {/*    <Navbar.Brand onClick={() => history.push("/")}>Textful</Navbar.Brand>*/}
                {/*    <Nav className="mr-auto">*/}
                {/*        <Nav.Link onClick={() => history.push("/")}>Home</Nav.Link>*/}
                {/*        <Nav.Link onClick={() => history.push("/login")}>login</Nav.Link>*/}
                {/*    </Nav>*/}
                {/*</Navbar>*/}

                <Navbar bg="light" expand="lg">
                    <Navbar.Brand onClick={() => history.push("/")}>Textful</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => history.push("/")}>Home</Nav.Link>
                        <Nav.Link onClick={() => history.push("/login")}>Login</Nav.Link>
                    </Nav>
                </Navbar>

                <div className="form-group">
                    <h1>Edit Profile</h1>
                </div>
                <div className="row form-group">
                    <div className="col">
                        <label htmlFor="fname" className="control-label">
                            First Name
                        </label>
                    </div>
                    <div className="col-10">
                        <input
                            type="text"
                            className="form-control"
                            ref={this.firstNameRef}
                            id="firstName"
                            placeholder={this.state.user.firstName}
                            required
                        />
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col">
                        <label htmlFor="lname" className="control-label">
                            Last Name
                        </label>
                    </div>
                    <div className="col-10">
                        <input
                            type="text"
                            className="form-control"
                            ref={this.lastNameRef}
                            id="lastName"
                            placeholder={this.state.user.lastName}
                            required
                        />
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col">
                        <label htmlFor="username" className="control-label">
                            Username
                        </label>
                    </div>
                    <div className="col-10">
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder={this.state.user.userName}
                            readOnly={true}
                        />
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col">
                        <label htmlFor="password" className="control-label">
                            Password
                        </label>
                    </div>
                    <div className="col-10">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            ref={this.passwordRef}
                            placeholder={this.state.user.password}
                            required
                        />
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col">
                        <label htmlFor="fname" className="control-label">
                            Select Type of User
                        </label>
                    </div>
                    <div className="col-10">
                        <select>
                            <option aria-readonly={true}>{this.state.user.userType}</option>
                        </select>
                    </div>
                </div>

                <div className="btn-link">
                    <a
                        className="btn btn-success"
                        onClick={() => this.handleClickToSaveUser()}
                    >
                        Save
                    </a>
                </div>

                <div className="row form-group justify-content-between">
                    <div className="col">
                        <button
                            className="btn btn-danger"
                            id="cancelBtn"
                            onClick={() => history.goBack()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
