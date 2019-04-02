import React, { Component } from "react";
import "./App.css";
import Home from "./Home";
import Admin from "./Admin";
import Login from "./Login";
import Profile from "./Profile";
import UserProfile from "./UserProfile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    }
    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.setState({ user: user });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Login setUser={this.setUser} />} />
            <Route exact path="/home" render={() => <Home user={this.state.user} />} />
            <Route exact path="/tictactoe" render={() => <Home user={this.state.user} />} />
            <Route exact path="/tictactoeingame" render={() => <Home user={this.state.user} />} />
            <Route exact path="/trophy" render={() => <Home user={this.state.user} />} />
            <Route exact path="/checkers" render={() => <Home user={this.state.user} />} />
            <Route exact path="/checkersingame" render={() => <Home user={this.state.user} />} />
            <Route exact path="/profile/:id" render={(props) => <Profile user={this.props.user} {...props} />} />
            <Route exact path="/admin" render={(props) => <Admin user={this.state.user} {...props} />} />
            <Route exact path="/user/:id" render={(props) => <UserProfile user={this.state.user} {...props}/>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
