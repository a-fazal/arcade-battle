import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, withRouter }from "react-router-dom";


var delay = 3;

class TicTacToeInGame extends Component {
  constructor(props) {
    super(props);
    this.onItemClick = this.onItemClick.bind(this);
    this.state = {
      turn: "x",
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
      end: false,
      startTime: null
    };
    this.checkForOpponent = this.checkForOpponent.bind(this);
    this.checkForEndGame = this.checkForEndGame.bind(this);
    this.checkForWin = this.checkForWin.bind(this);
    this.gameOverMessage = this.gameOverMessage.bind(this);
    this.checkForGameStateChange = this.checkForGameStateChange.bind(this);
    this.moveCurrenttoComplete = this.moveCurrenttoComplete.bind(this);
    this.componentCleanup = this.componentCleanup.bind(this);
    this.forfeitMatch = this.forfeitMatch.bind(this);
  }

  componentDidMount() {
      this.props.setGameHeader(true);
    if (this.props.user !== "") {
      this.checkForOpponent();
    }
      window.addEventListener('beforeunload', this.forfeitMatch);
      window.addEventListener('beforeunload', this.componentCleanup);

  }

  componentWillUnmount() {
    this.props.setGameHeader(false);
    window.removeEventListener('beforeunload', this.forfeitMatch);
    window.removeEventListener('beforeunload', this.componentCleanup);
  }

  forfeitMatch(e){
    if (this.state.them.username === this.props.user && !this.state.end) {
      let winner = this.state.me.username;
      this.moveCurrenttoCompleteNoDelay(winner);
    } else if (this.state.me.username === this.props.user && !this.state.end) {
      let winner = this.state.them.username;
      this.moveCurrenttoCompleteNoDelay(winner);
    }
  }

  componentCleanup() {
    this.setState({ end: true });
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
            playerOneImage: document.querySelector(".avatar-header").src,
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
            playerTwo: this.props.user,
            playerTwoImage: document.querySelector(".avatar-header").src
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
              image: retrieved.playerOneImage,
              winstreak: 21,
              id: 6,
              symbol: "x"
            },
            them: {
              username: dataSend.playerTwo,
              image: dataSend.playerTwoImage,
              winstreak: 14,
              id: 14,
              symbol: "o"
            }
          };

          this.setState({ me: data.me, them: data.them, _id: json._id,  startTime: new Date()});
          this.checkForGameStateChange();
        } else if (json.playerOne !== "" && json.playerTwo !== "") {
          data = {
            me: {
              username: retrieved.playerOne,
              image: retrieved.playerOneImage,
              winstreak: 21,
              id: 6,
              symbol: "x"
            },
            them: {
              username: retrieved.playerTwo,
              image: retrieved.playerTwoImage,
              winstreak: 14,
              id: 14,
              symbol: "o"
            }
          };

          const url = "/currentgame/" + json._id;
          let dataSend = {
            startOfLastTurn: Date.now(),
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

          this.setState({ me: data.me, them: data.them, _id: json._id, startTime: new Date() });
          this.checkForGameStateChange();
        } else {
          if (!this.state.end) {
            setTimeout(this.checkForOpponent, 1000);

          }
        }
      } else {
        if (!this.state.end) {
          setTimeout(this.checkForOpponent, 1000);
        }
      }
      })
      .catch(error => {
        console.log(error);
      });
  }

  moveCurrenttoComplete(winner) {
    const url = "/completegame";
    // The data we are going to send in our request
    let data = {
      startTime: this.state.startTime,
      playerOne: this.state.me.username,
      playerTwo: this.state.them.username,
      winner: winner,
      game: "Tic-Tac-Toe"
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

      const url_delete = "/currentgame/" + this.state._id;

      const request_delete = new Request(url_delete, {
        method: "delete",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      });

      setTimeout(function () {
      fetch(request_delete)
        .then(function(res) {
          if (winner !== 'tie') {
            alert(winner+ ' wins!')
          } else {
            alert('Game over, Its a tie!')
          }
        })
        .catch(error => {
          console.log(error);
        });
      }, 1000);
  }

  moveCurrenttoCompleteNoDelay(winner) {
    const url_delete = "/currentgame/" + this.state._id;

    const request_delete = new Request(url_delete, {
      method: "delete",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });


    fetch(request_delete)
      .then(function(res) {

      })
      .catch(error => {
        console.log(error);
      });

    const url = "/completegame";
    // The data we are going to send in our request
    let data = {
      startTime: this.state.startTime,
      playerOne: this.state.me.username,
      playerTwo: this.state.them.username,
      winner: winner,
      game: "Tic-Tac-Toe"
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

  checkForGameStateChange() {
    const url = '/currentgamemoves/' + this.state._id;
    fetch(url)
    .then((res) => {
        if (res.status === 200) {
           return res.json();
       } else {
        if (!this.state.end) {

           alert('Other player has forfeited the match, you win!');
         

         this.setState({ end: true });
       }
       }
    })
    .then((json) => {
        if (this.state["top-left-ttt"] !== json['top-left-ttt'] || this.state["top-center-ttt"] !== json['top-center-ttt']
        || this.state["top-right-ttt"] !== json['top-right-ttt'] || this.state["middle-left-ttt"] !== json['middle-left-ttt'] || this.state["middle-center-ttt"] !== json['middle-center-ttt']
        || this.state["middle-right-ttt"] !== json['middle-right-ttt'] || this.state["bottom-left-ttt"] !== json['bottom-left-ttt'] || this.state["bottom-center-ttt"] !== json['bottom-center-ttt']
        || this.state["bottom-right-ttt"] !== json['bottom-right-ttt']) {
          // if ((this.state.turn === "o" && this.state.them.username !== this.props.user) || (this.state.turn === "x" && this.state.me.username !== this.props.user)) {
            delete json['_id'];
            this.setState(json);
            let check = this.checkForEndGame(this.state.turn);
            if (this.state.turn === "o") {
              this.setState({ turn: "x" });
            } else {
              this.setState({ turn: "o" });
            }
          // }
        }

        if (!this.state.end) {
          let timer;
          clearTimeout(timer);
          timer = setTimeout(this.checkForGameStateChange, 500);
        }

    }).catch((error) => {
        console.log(error)
    })


  }

  onItemClick(e) {
    e.preventDefault();
    if (!this.state.end && this.state[e.currentTarget.id] === "empty") {
      if (this.state.turn === "o") {
        if (this.state.them.username === this.props.user) {
        const turn = this.state.turn;
        const event_save = e.currentTarget.id

          this.setState({ [e.currentTarget.id]: "o" }, () => {
            const url = "/currentgamemoves/" + this.state._id;
            const currentPos = event_save
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

            this.checkForEndGame(turn);
          });

          this.setState({ turn: "x" });


      } else {
        alert('Not your turn yet!');
      }
      } else {
        if (this.state.me.username == this.props.user) {
        const turn = this.state.turn;
        const event_save = e.currentTarget.id

          this.setState({ [e.currentTarget.id]: "x" }, () => {
            const url = "/currentgamemoves/" + this.state._id;
            const currentPos = event_save
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

            this.checkForEndGame(turn);
          });

          this.setState({ turn: "o" });

      } else {
        alert('Not your turn yet!')
      }
    }
    }
  }

  gameOverMessage(turn) {
    if (turn === this.state.me.symbol) {

      const me = this.state.me;
      me.winstreak = this.state.me.winstreak + 1;
      console.log(me);
      this.setState({ me: me });
      this.moveCurrenttoComplete(this.state.me.username);


    } else if (turn === this.state.them.symbol) {

      const them = this.state.them;
      them.winstreak = this.state.them.winstreak + 1;
      console.log(them);
      this.setState({ them: them });
      this.moveCurrenttoComplete(this.state.them.username);

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
        return 'gameforfeit';
      }
    }

    this.setState({ end: true });

    this.moveCurrenttoComplete("tie");

  }

  render() {


    if (this.state.them) {
      const  playerOneImageUrl  = {
        backgroundImage: 'url(' + this.state.me.image + ')'
    }

    const  playerTwoImageUrl  = {
      backgroundImage: 'url(' + this.state.them.image + ')'
    }

      return (
        <div id="inGame">
          <div id="inGameHeader">
            <div id="myStats" className="player-stats">
              <div className="player-identity">
                <div className="player-name text-center">
                  {this.state.me.username}
                </div>
                <div className="player-avatar" style={playerOneImageUrl} />
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
                <div className="player-avatar" style={playerTwoImageUrl} />
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

export default withRouter(TicTacToeInGame);
