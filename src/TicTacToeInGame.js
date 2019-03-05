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
     board: {'top-left-ttt': {row: 0, col: 0, 'spot': 'empty'},
     'top-center-ttt': {row: 0, col: 1, 'spot': 'empty'},
     'top-right-ttt': {row: 0, col: 2, 'spot': 'empty'},
     'middle-left-ttt': {row: 1, col: 0, 'spot': 'empty'},
     'middle-center-ttt': {row: 1, col: 1, 'spot': 'empty'},
     'middle-right-ttt': {row: 1, col: 2, 'spot': 'empty'},
     'bottom-left-ttt': {row: 2, col: 0, 'spot': 'empty'},
     'bottom-center-ttt': {row: 2, col: 1, 'spot': 'empty'},
     'bottom-right-ttt': {row: 2, col: 2, 'spot': 'empty'}},
     me: null,
     them: null
     //end: 0
   }
   this.checkForOpponent = this.checkForOpponent.bind(this);
   //this.checkForEndGame = this.checkForEndGame.bind(this);

}

componentDidMount() {
  const sidebar = document.querySelector('#sidebarcontainer');
  sidebar.style.display = 'None';
  const main = document.querySelector('#main');
  main.classList.remove('col-sm-9');
  main.classList.add('col-sm-12');
  this.checkForOpponent();
}

componentWillUnmount() {
  const sidebar = document.querySelector('#sidebarcontainer');
  sidebar.style.display = 'block';
  const main = document.querySelector('#main');
  main.classList.remove('col-sm-12');
  main.classList.add('col-sm-9');
}

checkForOpponent() {
  // poll the server for an opponent
  let data = null;
  if (delay === 0) {
    data = {
      me: {
        username: "Sophia",
        winstreak: 21,
        id: 6  
      },
      them: {
        username: "Alec",
        winstreak: 14,
        id: 14        
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
    if (this.state.board[e.currentTarget.id]['spot'] === 'empty'){
      if (this.state.turn === 'o') {
        this.setState({turn:'x'});
        this.state.board[e.currentTarget.id]['spot'] = 'o';
      } else {
        this.setState({turn:'o'});
        this.state.board[e.currentTarget.id]['spot'] = 'x';
      }
      //this.checkForEndGame(this.state.turn);
    }
  }

/*checkForEndGame(turn){
  // Check horizontal
  if (this.state['top-left-ttt'] === turn && 
    this.state['top-center-ttt'] === turn && 
    this.state['top-center-ttt'] === turn) {
      // Display winning message and end game
      this.state.end = 1;
  }
  // Check vertical
  // Check diagonals

  // Check if 
  }
*/


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
              {this.state.board['top-left-ttt']['spot'] === 'o' &&
                <i class="far fa-circle ttt-circle-all"></i>
              }
              {this.state.board['top-left-ttt']['spot'] === 'x' &&
                <i class="fas fa-times ttt-x-all"></i>
              }
              </td>
              <td id="top-center-ttt" onClick={this.onItemClick}>
              {this.state.board['top-center-ttt']['spot'] === 'o' &&
                <i class="far fa-circle ttt-circle-all"></i>
              }
              {this.state.board['top-center-ttt']['spot'] === 'x' &&
                <i class="fas fa-times ttt-x-all"></i>
              }
              </td>
              <td id="top-right-ttt" onClick={this.onItemClick}>
              {this.state.board['top-right-ttt']['spot'] === 'o' &&
                <i class="far fa-circle ttt-circle-all"></i>
              }
              {this.state.board['top-right-ttt']['spot'] === 'x' &&
                <i class="fas fa-times ttt-x-all"></i>
              }
              </td>
            </tr>
            <tr>
              <td id="middle-left-ttt" onClick={this.onItemClick}>
              {this.state.board['middle-left-ttt']['spot'] === 'o' &&
                <i class="far fa-circle ttt-circle-all"></i>
              }
              {this.state.board['middle-left-ttt']['spot'] === 'x' &&
                <i class="fas fa-times ttt-x-all"></i>
              }
              </td>
              <td id="middle-center-ttt" onClick={this.onItemClick}>
              {this.state.board['middle-center-ttt']['spot'] === 'o' &&
                <i class="far fa-circle ttt-circle-all"></i>
              }
              {this.state.board['middle-center-ttt']['spot'] === 'x' &&
                <i class="fas fa-times ttt-x-all"></i>
              }
              </td>
              <td id="middle-right-ttt" onClick={this.onItemClick}>
              {this.state.board['middle-right-ttt']['spot'] === 'o' &&
                <i class="far fa-circle ttt-circle-all"></i>
              }
              {this.state.board['middle-right-ttt']['spot'] === 'x' &&
                <i class="fas fa-times ttt-x-all"></i>
              }
              </td>
            </tr>
            <tr>
              <td id="bottom-left-ttt" onClick={this.onItemClick}>
              {this.state.board['bottom-left-ttt']['spot'] === 'o' &&
                <i class="far fa-circle ttt-circle-all"></i>
              }
              {this.state.board['bottom-left-ttt']['spot'] === 'x' &&
                <i class="fas fa-times ttt-x-all"></i>
              }
              </td>
              <td id="bottom-center-ttt" onClick={this.onItemClick}>
              {this.state.board['bottom-center-ttt']['spot'] === 'o' &&
                <i class="far fa-circle ttt-circle-all"></i>
              }
              {this.state.board['bottom-center-ttt']['spot'] === 'x' &&
                <i class="fas fa-times ttt-x-all"></i>
              }
              </td>
              <td id="bottom-right-ttt" onClick={this.onItemClick}>
              {this.state.board['bottom-right-ttt']['spot'] === 'o' &&
                <i class="far fa-circle ttt-circle-all"></i>
              }
              {this.state.board['bottom-right-ttt']['spot'] === 'x' &&
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
