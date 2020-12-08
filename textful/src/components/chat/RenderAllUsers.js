import React from "react";
import history from "../../services/History";


export default class RenderAllUsers extends React.Component {
    constructor(props){
        super(props);

    this.state={
        selectedUser: "",
        allUserList: [],
        searchUserNameList: [],
        isSearchEnabled: false
    }
    this.searchRef = React.createRef();
    }

    componentDidMount() {
        let self = this;
        const url = "https://wbdv-textful-server.herokuapp.com/users/";
        fetch(url)
        .then((res) => res.json())
        .then((usersList) => self.setState({allUserList: usersList}))    
    }

    handleSearch = () => {
        let self = this;
        var searchUserName = self.searchRef.current.value;
        const url = "https://wbdv-textful-server.herokuapp.com/search/"+searchUserName;
        fetch(url)
        .then((res) => res.json())
        .then((userNamesList) => self.setState({searchUserNameList: userNamesList, isSearchEnabled:true}))
    }


    renderSearchView = () => {
        return(
            <div class="container table-striped">
            <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                <li>
                    <div className="btn-link">
                    <a className="btn btn-primary" onClick={() => history.push({pathname: "/user/chat/",
                    state: {
                      toUserName: "",
                      userName: this.props.userName,
                    },
                    })}>
                    Back to Chat Screen
                    </a>
                    </div>
                </li>
                <li class="nav-item" onClick={() => history.push("/login")}>
                  <a class="nav-link" id="signoutLink">
                    Sign out <i class="fas fa-sign-out-alt"></i>
                  </a>
                </li>
              </ul>
              </nav>
            <h3> LIST OF USERS </h3>
            <div class="row" id="searchbox">
              <input
                class="form-control col-9"
                ref={this.searchRef}
                type="search"
                placeholder="Search"
              ></input>
              <div class="col-3" onClick={this.handleSearch}>
                <button class="btn btn-primary" type="button">
                  <i class="fas fa-search fa-2x" id="searchIcon"></i>
                </button>
              </div>
            </div> 
            <div class="bg-light" id="sidebar-wrapper">
              <div class="list-group list-group-flush">
                <ul class="list-group-item list-group-item-action bg-light list-unstyled border">
                    {this.state.searchUserNameList.map((user) => 
                    <li class="h4 bg-light"key={user} onClick={() => 
                    history.push({pathname: "/user/chat/" + user,
                    state: {
                      toUserName: user,
                      userName: this.props.userName,
                    },
                    })}>
                    {user}
                    </li>
                    )}
                </ul>
                  </div>
                </div>


            </div>

        )
    }
    

    renderDefaultView = () => {
        return (
        <div class="container table-striped">
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li>
            <div className="btn-link">
                <a className="btn btn-primary" onClick={() => history.push({pathname: "/user/chat/",
                    
                })}>
                Back to Chat Screen
                </a>
                </div>
            </li>
            <li class="nav-item" onClick={() => history.push("/login")}>
              <a class="nav-link" id="signoutLink">
                Sign out <i class="fas fa-sign-out-alt"></i>
              </a>
            </li>
          </ul>
          </nav>
        <h3> LIST OF USERS </h3>
        <div class="row" id="searchbox">
          <input
            class="form-control col-9"
            ref={this.searchRef}
            type="search"
            placeholder="Search"
          ></input>
          <div class="col-3" onClick={this.handleSearch}>
            <button class="btn btn-primary" type="button">
              <i class="fas fa-search fa-2x" id="searchIcon"></i>
            </button>
          </div>
        </div> 
        <div class="bg-light" id="sidebar-wrapper">
          <div class="list-group list-group-flush">
            {this.state.allUserList.map((user) => (
              <a
                class="list-group-item list-group-item-action bg-light"
                onClick={() =>
                  history.push({
                    pathname: "/user/chat/" + user.userName,
                  })
                }
                >
                {user.userName}
              </a>
            ))}
              </div>
            </div>
            </div>
        )
    }
    
    render() {
        return this.state.isSearchEnabled && this.state.searchUserNameList.length !== 0 ?
            this.renderSearchView():
            this.renderDefaultView()
        }
        
        
}