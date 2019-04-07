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
      login: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.setLogin = this.setLogin.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    // Check if session already has a logged in user
    if (this.state.login) {
      const user = document.querySelector("#userInput").value;
      const pass = document.querySelector("#passwordInput").value;
      let data = {
        username: user,
        password: pass
      }
      // Server call to backend for user/admin authentication
      // Login the user
      fetch('/user/login', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }).then((user) => {
        if (typeof user === 'string') {
          alert(user);
        } else {
          if (user.status === 300) {
            this.props.setUser("admin");
            this.props.history.push("/admin");
          } else if (user.status === 200) {
            this.props.setUser(data.username)
            this.props.history.push("/home");
          }
        }
      }).catch((error) => {
        alert(error);
      })
    } else {
      // Server call to backend to add users for registration
      const user = document.querySelector("#userInput").value;
      const password = document.querySelector("#passwordInput").value;
      const confirmPassword = document.querySelector("#confirmPasswordInput").value;
      let data = {
        username: user,
        password: password
      }
      if (confirmPassword !== password) {
        alert('Passwords must match.')
      } else {
        // Make sure user doesn't already exist
        let userExists = false;
        fetch('/allusers').then((users) => {
          for (let i = 0; i < users.length; i++) {
            if (user === users[i].username) {
              alert('User already exists!');
              userExists = true;
              break;
            }
          }
        }).catch((error) => {
          alert(error);
        })
      if (!userExists) {
        fetch('/user/register', {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        }).catch((error) => {
          alert(error);
        })
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
