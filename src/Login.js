import React, { Component } from "react";
import avatar from "./avatar.jpeg";
import "./App.css";
import UserMain from "./UserMain";
import Trophy from "./Trophy";
import TicTacToe from "./TicTacToe";
import { BrowserRouter as Router, Route, Link, Switch, withRouter  } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    let authenticated = false;
    const user = document.querySelector('#userInput').value;
    const password = document.querySelector('#passwordInput').value;
    if (user === 'user' && password === 'user' || user === 'admin' && password === 'admin') {
      this.setState({user:user});
      this.props.setUser(user);
      this.props.history.push('/home');
    } else {
      alert('Wrong password or username.')
    }
  }

  render() {
    return (

      <div id="loginContainer">
      <div className="navbar-brand-transparent">
        ARCADE<i className="fas fa-gamepad icon-gradient" />BATTLE
      </div>
      <div id="login">
      <form>
      <div className="form-group">
        <label htmlFor="userInput">Username</label>
        <input type="text" className="form-control" id="userInput" placeholder="Enter username" />
      </div>
      <div className="form-group">
        <label htmlFor="passwordInput">Password</label>
        <input type="password" className="form-control" id="passwordInput" placeholder="Enter password" />
      </div>
      </form>
      <button type="button" class="btn btn-primary" id="loginButton" onClick={this.handleClick}>Login</button>

      </div>
      </div>

    );
  }
}

export default withRouter(Login);
