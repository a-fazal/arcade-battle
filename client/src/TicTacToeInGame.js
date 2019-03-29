import React, { Component } from "react";

// TODO: remove after phase 1
// simulated delay to find an opponent.
var delay = 3;

class TicTacToeInGame extends Component {
  constructor(props) {
    super(props);
    this.onItemClick = this.onItemClick.bind(this);
    this.state = {
      turn: "o",
      "top-left-ttt": "empty",
      "top-center-ttt": "empty",
      "top-right-ttt": "empty",
      "middle-left-ttt": "empty",
      "middle-center-ttt": "empty",
      "middle-right-ttt": "empty",
      "bottom-left-ttt": "empty",
      "bottom-center-ttt": "empty",
      "bottom-right-ttt": "empty",
      me: null,
      them: null,
      _id: null,
      end: false
    };
    this.checkForOpponent = this.checkForOpponent.bind(this);
    this.checkForEndGame = this.checkForEndGame.bind(this);
    this.checkForWin = this.checkForWin.bind(this);
    this.gameOverMessage = this.gameOverMessage.bind(this);
    this.checkForGameStateChange = this.checkForGameStateChange.bind(this);
  }

  componentDidMount() {
    this.props.setGameHeader(true);
    this.checkForOpponent();
  }

  componentWillUnmount() {
    this.props.setGameHeader(false);
  }

  checkForOpponent() {
    // Poll the server for an opponent
    // BACK END
    const url = "/getopponent/tictactoe";
    let complete = false;
    let retrieved = "";
    let data = null;
    fetch(url)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          //Create new CurrentGame
          const url = "/currentgame";
          // The data we are going to send in our request
          let data = {
            playerOne: this.props.user,
            game: "tictactoe"
          };
          // Create our request constructor with all the parameters we need
          const request = new Request(url, {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
            }
          });

          fetch(request)
            .then(function(res) {

            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .then(json => {
        retrieved = json;
        //playerone not itself
        if (typeof retrieved !== "undefined") {
        if (json.playerOne !== this.props.user && json.playerTwo === "") {
          const url = "/currentgame/" + json._id;
          let dataSend = {
            playerTwo: this.props.user
          };
          const request = new Request(url, {
            method: "PATCH",
            body: JSON.stringify(dataSend),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
            }
          });

          fetch(request)
            .then(function(res) {

            })
            .catch(error => {
              console.log(error);
            });

          data = {
            me: {
              username: retrieved.playerOne,
              winstreak: 21,
              id: 6,
              symbol: "x"
            },
            them: {
              username: dataSend.playerTwo,
              winstreak: 14,
              id: 14,
              symbol: "o"
            }
          };
          this.setState({ me: data.me, them: data.them, _id: json._id });
          this.checkForGameStateChange();
        } else if (json.playerOne !== "" && json.playerTwo !== "") {
          data = {
            me: {
              username: retrieved.playerOne,
              winstreak: 21,
              id: 6,
              symbol: "x"
            },
            them: {
              username: retrieved.playerTwo,
              winstreak: 14,
              id: 14,
              symbol: "o"
            }
          };
          this.setState({ me: data.me, them: data.them, _id: json._id });
          this.checkForGameStateChange();
        } else {
          setTimeout(this.checkForOpponent, 1000);
        }
      } else {
          setTimeout(this.checkForOpponent, 1000);
      }
      })
      .catch(error => {
        console.log(error);
      });
  }

  checkForGameStateChange() {
    const url = '/currentgamemoves/' + this.state._id;
    fetch(url)
    .then((res) => {
        if (res.status === 200) {
           return res.json()
       } else {
            alert('Error')
       }
    })
    .then((json) => {
        delete json['_id'];
        this.setState(json);
    }).catch((error) => {
        console.log(error)
    })

    setTimeout(this.checkForGameStateChange, 500);

  }

  onItemClick(e) {
    e.preventDefault();
    if (!this.state.end && this.state[e.currentTarget.id] === "empty") {
      if (this.state.turn === "o") {
        const turn = this.state.turn;

        const url = "/currentgamemoves/" + this.state._id;
        const currentPos = e.currentTarget.id
        let dataSend = {

        };
        dataSend[currentPos] = "o"
        const request = new Request(url, {
          method: "PATCH",
          body: JSON.stringify(dataSend),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          }
        });

        fetch(request)
          .then(function(res) {

          })
          .catch(error => {
            console.log(error);
          });

        this.setState({ [e.currentTarget.id]: "o" }, () => {
          this.checkForEndGame(turn);
        });

        this.setState({ turn: "x" });
      } else {
        const turn = this.state.turn;

        const url = "/currentgamemoves/" + this.state._id;
        const currentPos = e.currentTarget.id
        let dataSend = {

        };
        dataSend[currentPos] = "x"
        const request = new Request(url, {
          method: "PATCH",
          body: JSON.stringify(dataSend),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          }
        });

        fetch(request)
          .then(function(res) {

          })
          .catch(error => {
            console.log(error);
          });

        this.setState({ [e.currentTarget.id]: "x" }, () => {
          this.checkForEndGame(turn);
        });

        this.setState({ turn: "o" });
      }
    }
  }

  gameOverMessage(turn) {
    if (turn === this.state.me.symbol) {
      alert(this.state.me.username + " wins!");
      const me = this.state.me;
      me.winstreak = this.state.me.winstreak + 1;
      console.log(me);
      this.setState({ me: me });
    } else if (turn === this.state.them.symbol) {
      alert(this.state.them.username + " wins!");
      const them = this.state.them;
      them.winstreak = this.state.them.winstreak + 1;
      console.log(them);
      this.setState({ them: them });
    }
  }

  checkForWin(spotsToCheck, turn, diagonal) {
    if (!diagonal) {
      const spots = Object.keys(this.state);
      const spotsResult = spots.filter(function(spot) {
        return spot.includes(spotsToCheck);
      });
      let i;
      for (i = 0; i < 3; i++) {
        if (this.state[spotsResult[i]] !== turn) {
          return false;
        }
      }
    } else {
      if (
        (this.state["top-left-ttt"] !== turn ||
          this.state["middle-center-ttt"] !== turn ||
          this.state["bottom-right-ttt"] !== turn) &&
        (this.state["bottom-left-ttt"] !== turn ||
          this.state["middle-center-ttt"] !== turn ||
          this.state["top-right-ttt"] !== turn)
      ) {
        return false;
      }
    }
    return true;
  }

  checkForEndGame(turn) {
    // Check horizontal
    if (
      this.checkForWin("top", turn, false) ||
      this.checkForWin("middle", turn, false) ||
      this.checkForWin("bottom", turn, false)
    ) {
      this.setState({ end: true });
      this.gameOverMessage(turn);
      return;
    }

    // Check vertical
    if (
      this.checkForWin("left", turn, false) ||
      this.checkForWin("right", turn, false) ||
      this.checkForWin("center", turn, false)
    ) {
      this.setState({ end: true });
      this.gameOverMessage(turn);
      return;
    }

    // Check diagonals
    if (this.checkForWin("", turn, true)) {
      this.setState({ end: true });
      this.gameOverMessage(turn);
      return;
    }

    // Check if no more possible moves
    const spots = Object.keys(this.state);
    let i;
    for (i = 0; i < 9; i++) {
      if (this.state[spots[i]] === "empty") {
        this.setState({ end: false });
        return;
      }
    }
    alert("Game over, it's a tie!");
    this.setState({ end: true });
  }

  render() {
    if (this.state.them) {
      return (
        <div id="inGame">
          <div id="inGameHeader">
            <div id="myStats" className="player-stats">
              <div className="player-identity">
                <div className="player-name text-center">
                  {this.state.me.username}
                </div>
                <div className="player-avatar" />
              </div>
            </div>

            <div id="winstreaks">
              <div className="winstreak-label text-center">WINSTREAKS</div>
              <div className="winstreaks-amount text-center">
                {this.state.me.winstreak}:{this.state.them.winstreak}
              </div>
            </div>

            <div id="theirStats" className="player-stats">
              <div className="player-identity">
                <div className="player-name text-center">
                  {this.state.them.username}
                </div>
                <div className="player-avatar" />
              </div>
            </div>
          </div>
          <table id="tictactoeboard">
            <tbody>
              <tr>
                <td id="top-left-ttt" onClick={this.onItemClick}>
                  {this.state["top-left-ttt"] === "o" && (
                    <i className="far fa-circle ttt-circle-all" />
                  )}
                  {this.state["top-left-ttt"] === "x" && (
                    <i className="fas fa-times ttt-x-all" />
                  )}
                </td>
                <td id="top-center-ttt" onClick={this.onItemClick}>
                  {this.state["top-center-ttt"] === "o" && (
                    <i className="far fa-circle ttt-circle-all" />
                  )}
                  {this.state["top-center-ttt"] === "x" && (
                    <i className="fas fa-times ttt-x-all" />
                  )}
                </td>
                <td id="top-right-ttt" onClick={this.onItemClick}>
                  {this.state["top-right-ttt"] === "o" && (
                    <i className="far fa-circle ttt-circle-all" />
                  )}
                  {this.state["top-right-ttt"] === "x" && (
                    <i className="fas fa-times ttt-x-all" />
                  )}
                </td>
              </tr>
              <tr>
                <td id="middle-left-ttt" onClick={this.onItemClick}>
                  {this.state["middle-left-ttt"] === "o" && (
                    <i className="far fa-circle ttt-circle-all" />
                  )}
                  {this.state["middle-left-ttt"] === "x" && (
                    <i className="fas fa-times ttt-x-all" />
                  )}
                </td>
                <td id="middle-center-ttt" onClick={this.onItemClick}>
                  {this.state["middle-center-ttt"] === "o" && (
                    <i className="far fa-circle ttt-circle-all" />
                  )}
                  {this.state["middle-center-ttt"] === "x" && (
                    <i className="fas fa-times ttt-x-all" />
                  )}
                </td>
                <td id="middle-right-ttt" onClick={this.onItemClick}>
                  {this.state["middle-right-ttt"] === "o" && (
                    <i className="far fa-circle ttt-circle-all" />
                  )}
                  {this.state["middle-right-ttt"] === "x" && (
                    <i className="fas fa-times ttt-x-all" />
                  )}
                </td>
              </tr>
              <tr>
                <td id="bottom-left-ttt" onClick={this.onItemClick}>
                  {this.state["bottom-left-ttt"] === "o" && (
                    <i className="far fa-circle ttt-circle-all" />
                  )}
                  {this.state["bottom-left-ttt"] === "x" && (
                    <i className="fas fa-times ttt-x-all" />
                  )}
                </td>
                <td id="bottom-center-ttt" onClick={this.onItemClick}>
                  {this.state["bottom-center-ttt"] === "o" && (
                    <i className="far fa-circle ttt-circle-all" />
                  )}
                  {this.state["bottom-center-ttt"] === "x" && (
                    <i className="fas fa-times ttt-x-all" />
                  )}
                </td>
                <td id="bottom-right-ttt" onClick={this.onItemClick}>
                  {this.state["bottom-right-ttt"] === "o" && (
                    <i className="far fa-circle ttt-circle-all" />
                  )}
                  {this.state["bottom-right-ttt"] === "x" && (
                    <i className="fas fa-times ttt-x-all" />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="text-center waiting-message">
          Waiting for an opponent...
        </div>
      );
    }
  }
}

export default TicTacToeInGame;
