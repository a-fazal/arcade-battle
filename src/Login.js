import React, { Component } from "react";
import avatar from "./avatar.jpeg";
import "./App.css";
import UserMain from "./UserMain";
import User from "./User";
import Trophy from "./Trophy";
import TicTacToe from "./TicTacToe";
import { BrowserRouter as Router, Route, Link, Switch, withRouter  } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      registerlogin: 'login',
      registeredUsers: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.registerForm = this.registerForm.bind(this);
    this.state.registeredUsers.push(new User('user', 'user'));
    this.state.registeredUsers.push(new User('admin', 'admin'));

  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.registerlogin == 'login') {
      const user = document.querySelector('#userInput').value;
      const password = document.querySelector('#passwordInput').value;
      let authenticated = false;
      for (let i = 0; i < this.state.registeredUsers.length; i++) {
        if (user === this.state.registeredUsers[i].user && password === this.state.registeredUsers[i].password) {
          this.setState({user:user});
          authenticated = true;
          this.props.setUser(user);
          this.props.history.push('/home');
        }
      }
      if (!authenticated) {
        alert('Wrong password or username.')
      }
    } else {
      const user = document.querySelector('#userInput').value;
      const password = document.querySelector('#passwordInput').value;
      this.state.registeredUsers.push(new User(user, password));
      alert('Successfuly Registered! Please login.')
      this.setState({registerlogin: 'login'});

      const buttonText = document.querySelector('#loginText');
      const button = document.querySelector('#loginButton');
      button.removeChild(buttonText);

      const loginButtonSpan = document.createElement("span");
      const loginText = document.createTextNode("Login");
      loginButtonSpan.setAttribute('id', 'loginText');
      loginButtonSpan.appendChild(loginText);

      button.appendChild(loginButtonSpan);

      const form = document.querySelector('#loginRegisterForm');
      form.removeChild(form.children[2]);

      const userInput = document.querySelector('#userInput');
      userInput.value = '';

      const passwordInput = document.querySelector('#passwordInput');
      passwordInput.value = '';

    }
  }


  registerForm(e) {
    e.preventDefault();
    this.setState({registerlogin: 'register'});
    const login = document.querySelector('#loginContainer');
    const registerSpan = document.querySelector('#registerSpan');
    login.removeChild(registerSpan);


    const formgroup = document.createElement("div");
    formgroup.classList.add('form-group');

    const label = document.createElement("label");
    label.setAttribute('htmlFor', 'confirmPasswordInput');
    const confirmPasswordText = document.createTextNode("Confirm Password");
    label.appendChild(confirmPasswordText)

    const confirmPasswordInput = document.createElement("input");
    confirmPasswordInput.setAttribute('type', 'password');
    confirmPasswordInput.setAttribute('id', 'confirmPasswordInput');
    confirmPasswordInput.setAttribute('placeholder', 'Confirm Password');
    confirmPasswordInput.classList.add('form-control');

    formgroup.appendChild(label);
    formgroup.appendChild(confirmPasswordInput);

    const form = document.querySelector('#loginRegisterForm');
    form.appendChild(formgroup);

    const buttonText = document.querySelector('#loginText');
    const button = document.querySelector('#loginButton');
    button.removeChild(buttonText);

    const registerButtonSpan = document.createElement("span");
    const registerText = document.createTextNode("Register");
    registerButtonSpan.setAttribute('id', 'loginText');
    registerButtonSpan.appendChild(registerText)

    button.appendChild(registerButtonSpan);

  }

  render() {
    return (
      <div className="Login">
      <div id="loginContainer">
      <div className="navbar-brand-transparent">
        ARCADE<i className="fas fa-gamepad icon-gradient" />BATTLE
      </div>
      <div id="login">
      <form id="loginRegisterForm">
      <div className="form-group">
        <label htmlFor="userInput">Username</label>
        <input type="text" className="form-control" id="userInput" placeholder="Enter username" />
      </div>
      <div className="form-group">
        <label htmlFor="passwordInput">Password</label>
        <input type="password" className="form-control" id="passwordInput" placeholder="Enter password" />
      </div>
      </form>
      <button type="button" className="btn btn-primary" id="loginButton" onClick={this.handleClick}><span id="loginText">Login</span></button>

      </div>
      <span id="registerSpan">New? <a href="" onClick={this.registerForm}>Register Now!</a></span>
      </div>

      </div>


    );
  }
}

export default withRouter(Login);
