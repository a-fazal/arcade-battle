import React, { Component } from "react";
import avatar from "./avatar.jpeg";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import UserMain from "./UserMain";
import Trophy from "./Trophy";
import { BrowserRouter as Router, Route, Link, HashRouter, Switch  } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
        <div>
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand" href="#">
            ARCADE<i className="fas fa-gamepad icon-gradient" />BATTLE
          </a>
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

            <Link to="/trophy"><i className="fas fa-trophy icon-header" /></Link>

            <img className="avatar-header" src={avatar} />
            <span>
              Sophia77<i className="fas fa-chevron-down" />
            </span>
          </div>
        </nav>

        <div className="row" id="sidebarcontent">
          <div className="col-sm-3" id="sidebarcontainer">
            <div id="sidebar">
              <h3>GAMES</h3>
              <br />
              <div className="sidebaritem">
                <i className="far fa-times-circle tictactoe-icon" />
                <div>
                  Tic Tac Toe
                  <br />
                  <span className="subtitle">
                    Play the classic 2 player game!
                  </span>
                </div>
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
            <Route exact path="/" component={UserMain} />
            <Route exact path="/trophy" component={Trophy} />
            </div>

          </div>
        </div>
        </div>
        </Router>
      </div>
    );
  }
}

export default App;
