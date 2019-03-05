import React, { Component } from "react";

// TODO: remove after phase 1
// simulated delay to find an opponent.
var delay = 3;

class TicTacToeInGame extends Component {
constructor(props) {
   super(props)
   this.onItemClick = this.onItemClick.bind(this);
   this.state = {
     turn: 'o',
     'top-left-ttt': 'empty',
     'top-center-ttt': 'empty',
     'top-right-ttt': 'empty',
     'middle-left-ttt': 'empty',
     'middle-center-ttt': 'empty',
     'middle-right-ttt': 'empty',
     'bottom-left-ttt': 'empty',
     'bottom-center-ttt': 'empty',
     'bottom-right-ttt': 'empty',
     me: null,
     them: null,
     end: false
   }
   this.checkForOpponent = this.checkForOpponent.bind(this);
   this.checkForEndGame = this.checkForEndGame.bind(this);
   this.checkForWin = this.checkForWin.bind(this);
   this.gameOverMessage = this.gameOverMessage.bind(this);
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
  let data = null;
  if (delay === 0) {
    data = {
      me: {
        username: "Sophia",
        winstreak: 21,
        id: 6,
        symbol: 'x'
      },
      them: {
        username: "Alec",
        winstreak: 14,
        id: 14,
        symbol: 'o'
      }
    };
  } else {
    delay -= 1;
  }
  if (data) {
    this.setState({me: data.me, them: data.them});
  }
  else {
    // if the server can't find an opponent, try again in 1 second
    setTimeout(this.checkForOpponent, 1000);
  }
}

onItemClick(e) {
    e.preventDefault();
    if (!this.state.end && this.state[e.currentTarget.id] === 'empty'){
      if (this.state.turn === 'o') {
        this.setState({[e.currentTarget.id]: 'o'});
        this.checkForEndGame(this.state.turn);
        this.setState({turn:'x'});
      } else {
        this.setState({[e.currentTarget.id]: 'x'});
        this.checkForEndGame(this.state.turn);
        this.setState({turn: 'o'});
      }
    }
  }

gameOverMessage(turn) {
  if (turn === this.state.me.symbol) {
    alert(this.state.me.username + " wins!");
    this.state.me.winstreak++;
  } else if (turn === this.state.them.symbol) {
    alert(this.state.them.username + " wins!");
    this.state.them.winstreak++;
  }
}

  checkForWin(spotsToCheck, turn, diagonal) {
  if (!diagonal) {
    const spots = Object.keys(this.state);
    const spotsResult = spots.filter(function (spot) { return spot.includes(spotsToCheck); });
    let i;
    for (i = 0; i < 3; i++){
      if (this.state[spotsResult[i]] !== turn) {
        return false;
      }
    }
  } else {
    if ((this.state['top-left-ttt'] !== turn || this.state['middle-center-ttt'] !== turn || this.state['bottom-right-ttt'] !== turn)
      && (this.state['bottom-left-ttt'] !== turn || this.state['middle-center-ttt'] !== turn || this.state['top-right-ttt'] !== turn)) {
      return false;
    }
  }
  return true;
  }

checkForEndGame(turn){
  // Check horizontal
  if (this.checkForWin('top', turn, false) || this.checkForWin('middle', turn, false) || this.checkForWin('bottom', turn, false)) {
    this.setState({end: true});
    this.gameOverMessage(turn);
    return;
  }

  // Check vertical
  if (this.checkForWin('left', turn, false) || this.checkForWin('right', turn, false) || this.checkForWin('center', turn, false)) {
    this.setState({end: true});
    this.gameOverMessage(turn);
    return;
  }

  // Check diagonals
  if (this.checkForWin('', turn, true)) {
    this.setState({end: true});
    this.gameOverMessage(turn);
    return;
  }

  // Check if no more possible moves
  const spots = Object.keys(this.state);
  let i;
  for (i = 0; i < 9; i++){
    if (this.state[spots[i]] === 'empty') {
      this.setState({end: false});
      return;
    }
  }
  alert("Game over, it's a tie!");
  this.setState({end: true});
}

  render() {
    if (this.state.them) {
      return (
        <div id="inGame">
          <div id="inGameHeader">
            <div id="myStats" className="player-stats">
              <div className="player-identity">
                <div className="player-name text-center">{this.state.me.username}</div>
                <div className="player-avatar"></div>
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
                <div className="player-name text-center">{this.state.them.username}</div>
                <div className="player-avatar"></div>
              </div>
            </div>
          </div>
          <table id="tictactoeboard">
          <tbody>
            <tr>
              <td id="top-left-ttt" onClick={this.onItemClick}>
              {this.state['top-left-ttt'] === 'o' &&
                <i class="far fa-circle ttt-circle-all"></i>
              }
              {this.state['top-left-ttt'] === 'x' &&
                <i class="fas fa-times ttt-x-all"></i>
              }
              </td>
              <td id="top-center-ttt" onClick={this.onItemClick}>
              {this.state['top-center-ttt'] === 'o' &&
                <i class="far fa-circle ttt-circle-all"></i>
              }
              {this.state['top-center-ttt'] === 'x' &&
                <i class="fas fa-times ttt-x-all"></i>
              }
              </td>
              <td id="top-right-ttt" onClick={this.onItemClick}>
              {this.state['top-right-ttt'] === 'o' &&
                <i class="far fa-circle ttt-circle-all"></i>
              }
              {this.state['top-right-ttt'] === 'x' &&
                <i class="fas fa-times ttt-x-all"></i>
              }
              </td>
            </tr>
            <tr>
              <td id="middle-left-ttt" onClick={this.onItemClick}>
              {this.state['middle-left-ttt'] === 'o' &&
                <i class="far fa-circle ttt-circle-all"></i>
              }
              {this.state['middle-left-ttt'] === 'x' &&
                <i class="fas fa-times ttt-x-all"></i>
              }
              </td>
              <td id="middle-center-ttt" onClick={this.onItemClick}>
              {this.state['middle-center-ttt'] === 'o' &&
                <i class="far fa-circle ttt-circle-all"></i>
              }
              {this.state['middle-center-ttt'] === 'x' &&
                <i class="fas fa-times ttt-x-all"></i>
              }
              </td>
              <td id="middle-right-ttt" onClick={this.onItemClick}>
              {this.state['middle-right-ttt'] === 'o' &&
                <i class="far fa-circle ttt-circle-all"></i>
              }
              {this.state['middle-right-ttt'] === 'x' &&
                <i class="fas fa-times ttt-x-all"></i>
              }
              </td>
            </tr>
            <tr>
              <td id="bottom-left-ttt" onClick={this.onItemClick}>
              {this.state['bottom-left-ttt'] === 'o' &&
                <i class="far fa-circle ttt-circle-all"></i>
              }
              {this.state['bottom-left-ttt'] === 'x' &&
                <i class="fas fa-times ttt-x-all"></i>
              }
              </td>
              <td id="bottom-center-ttt" onClick={this.onItemClick}>
              {this.state['bottom-center-ttt'] === 'o' &&
                <i class="far fa-circle ttt-circle-all"></i>
              }
              {this.state['bottom-center-ttt'] === 'x' &&
                <i class="fas fa-times ttt-x-all"></i>
              }
              </td>
              <td id="bottom-right-ttt" onClick={this.onItemClick}>
              {this.state['bottom-right-ttt'] === 'o' &&
                <i class="far fa-circle ttt-circle-all"></i>
              }
              {this.state['bottom-right-ttt'] === 'x' &&
                <i class="fas fa-times ttt-x-all"></i>
              }
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      );
    }
    else {
      return (
        <div className="text-center waiting-message">Waiting for an opponent...</div>
      );
    }
  }
}

export default TicTacToeInGame;
