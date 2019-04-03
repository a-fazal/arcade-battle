import React, { Component } from "react";
import "./App.css";
import User from "./User";
import {
  withRouter
} from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    // BACK END
    this.state = {
      user: "",
      login: true,
      registeredUsers: [],
      registeredAdmins: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.setLogin = this.setLogin.bind(this);
    this.fetchInfo = this.fetchInfo.bind(this);
    this.state.registeredUsers.push(new User("user", "user"));
    this.state.registeredUsers.push(new User("user2", "user2"));
    this.state.registeredAdmins.push(new User("admin", "admin"));
  }

  componentDidMount(){
    this.fetchInfo();
  }

  fetchInfo() {
    // Get registered users
    fetch('/allusers').then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    }).then((json) => {
      this.setState({registeredUsers: json})
    }).catch((error) => {
      alert(error.message);
    })

    // Get all admins
    fetch('/alladmins').then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    }).then((json) => {
      this.setState({registeredAdmins: json})
    }).catch((error) => {
      alert(error.message);
    })
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.login) {
      /*
      fetch('/user/login').then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      }).catch((err) => {
        alert("Invalid username or password.")
      })
      */
      const user = document.querySelector("#userInput").value;
      const password = document.querySelector("#passwordInput").value;
      let authenticated = false;
      // Server call to backend for user/admin authentication
      for (let i = 0; i < this.state.registeredUsers.length; i++) {
        if (
          user === this.state.registeredUsers[i].user &&
          password === this.state.registeredUsers[i].password
        ) {
          this.setState({ user: user });
          authenticated = true;
          this.props.setUser(user);
          this.props.history.push("/home");
        }
      }
      for (let i = 0; i < this.state.registeredAdmins.length; i++) {
        // Server call to backend for user/admin authentication
        if (
          user === this.state.registeredAdmins[i].user &&
          password === this.state.registeredAdmins[i].password
        ) {
          this.setState({ user: user });
          authenticated = true;
          this.props.setUser(user);
          this.props.history.push("/admin");
        }
      }
      if (!authenticated) {
        alert("Wrong password or username.");
      }
    } else {
      // Server call to backend to add users for registration
      const user = document.querySelector("#userInput").value;
      const password = document.querySelector("#passwordInput").value;
      const confirmPassword = document.querySelector("#confirmPasswordInput").value;
      if (confirmPassword !== password) {
        alert('Passwords must match.')
      } else {
        let userExists = false;
        for (let i = 0; i < this.state.registeredUsers.length; i++) {
          if (
            user === this.state.registeredUsers[i].user
          ) {
            alert('User already exists!');
            userExists = true;
            break;
          }
        }
      if (!userExists) {
        this.state.registeredUsers.push(new User(user, password));
        alert("Successfuly Registered! Please login.");
        this.setState({ login: true });
      }
    }
  }
}

  setLogin(e) {
    e.preventDefault();
    this.setState({ login: !this.state.login });
  }

  render() {
    return (
      <div className="Login">
        <div id="loginContainer">
          <div className="navbar-brand-transparent">
            ARCADE
            <i className="fas fa-gamepad icon-gradient" />
            BATTLE
          </div>
          <div id="login">
            <form id="loginRegisterForm">
              <div className="form-group">
                <label htmlFor="userInput">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="userInput"
                  placeholder="Enter username"
                  name="username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="passwordInput">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput"
                  placeholder="Enter password"
                  name="password"
                />
              </div>
              {!this.state.login ? (
                <div className="form-group">
                  <label htmlFor="confirmPasswordInput">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPasswordInput"
                    placeholder="Enter password"
                  />
                </div>
              ) : (
                ""
              )}
            </form>
            <button
              type="button"
              className="btn btn-primary"
              id="loginButton"
              onClick={this.handleClick}
            >
              <span id="loginText">
                {this.state.login ? "Login" : "Register"}
              </span>
            </button>
          </div>
          {this.state.login ? (
            <span id="registerSpan">
              New? <a href="_blank" onClick={this.setLogin}>
                Register Now!
              </a>
            </span>
          ) : (
            <a href="_blank" onClick={this.setLogin}> Back to Login </a>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
