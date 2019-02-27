import React, { Component } from "react";
import avatar from "./avatar.jpeg";
import "./App.css";
import UserMain from "./UserMain";
import Home from "./Home";
import Trophy from "./Trophy";
import Login from "./Login";
import TicTacToe from "./TicTacToe";
import Checkers from "./Checkers";
import { BrowserRouter as Router, Route, Link, Switch  } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    }
    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.setState({user:user});
  }

  render() {
    return (
      <div className="App">
        <Router>
        <Switch>
            <Route exact path="/" render={() => <Login setUser={this.setUser} />} />
            <Route exact path="/home" render={() => <Home user={this.state.user} />} />
            <Route exact path="/tictactoe" render={() => <Home user={this.state.user} />} />
            <Route exact path="/trophy" render={() => <Home user={this.state.user} />} />
            <Route exact path="/checkers" render={() => <Home user={this.state.user} />} />
        </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
