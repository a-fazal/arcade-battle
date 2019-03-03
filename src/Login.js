import React, { Component } from "react";
import avatar from "./avatar.jpeg";
import "./App.css";
import UserMain from "./UserMain";
import User from "./User";
import Trophy from "./Trophy";
import TicTacToe from "./TicTacToe";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      login: true,
      registeredUsers: [],
      registeredAdmins: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.registerForm = this.registerForm.bind(this);
    this.state.registeredUsers.push(new User("user", "user"));
    this.state.registeredAdmins.push(new User("admin", "admin"));
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.login) {
      const user = document.querySelector("#userInput").value;
      const password = document.querySelector("#passwordInput").value;
      let authenticated = false;
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
      const user = document.querySelector("#userInput").value;
      const password = document.querySelector("#passwordInput").value;
      this.state.registeredUsers.push(new User(user, password));
      alert("Successfuly Registered! Please login.");
      this.setState({ login: true });
    }
  }

  registerForm(e) {
    e.preventDefault();
    this.setState({ login: false });
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="passwordInput">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput"
                  placeholder="Enter password"
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
              New?{" "}
              <a href="" onClick={this.registerForm}>
                Register Now!
              </a>
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
