import React, { Component } from "react";
import avatar from "./avatar.jpeg";
import "./App.css";
import UserMain from "./UserMain";
import Trophy from "./Trophy";
import TicTacToe from "./TicTacToe";
import { BrowserRouter as Router, Route, Link, Switch  } from "react-router-dom";

class Home extends Component {

  render() {
    return (
      <div className="App">
        <Router>
        <div>
        <nav className="navbar navbar-expand-lg">
        <Link to="/home">
          <div className="navbar-brand">
            ARCADE<i className="fas fa-gamepad icon-gradient" />BATTLE
          </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto" />
            {this.props.user === 'admin' &&
                <i className="fas fa-toolbox icon-header" />
            }

            <Link to="/trophy"><i className="fas fa-trophy icon-header" /></Link>

            <img className="avatar-header" src={avatar} />
            <span>
              {this.props.user}<i className="fas fa-chevron-down" />
            </span>
          </div>
        </nav>

        <div className="row" id="sidebarcontent">
          <div className="col-sm-3" id="sidebarcontainer">
            <div id="sidebar">
              <h3>GAMES</h3>
              <br />
              <div className="sidebaritem">
              <Link to="/tictactoe">
                <i className="far fa-times-circle tictactoe-icon" />
                <div>
                  Tic Tac Toe
                  <br />
                  <span className="subtitle">
                    Play the classic 2 player game!
                  </span>
                </div>
                </Link>
              </div>
              <div className="sidebaritem">
                <i className="fas fa-chess-board checkers-icon" />
                <div>
                  Checkers
                  <br />
                  <span className="subtitle">Timeless strategy fun.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-9" id="main">

            <div>
            <Route exact path="/home" render={() => <UserMain user={this.props.user} />} />
            <Route exact path="/trophy" render={() => <Trophy user={this.props.user} />} />
            <Route exact path="/tictactoe" render={() => <TicTacToe user={this.props.user} />} />
            </div>

          </div>
        </div>
        </div>
        </Router>
      </div>
    );
  };


}

export default Home;
