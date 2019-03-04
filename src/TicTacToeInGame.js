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
     them: null
   }
   this.checkForOpponent = this.checkForOpponent.bind(this);

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
    if (this.state[e.currentTarget.id] == 'empty'){
      if (this.state.turn === 'o') {
        this.setState({turn:'x', [e.currentTarget.id]: 'o'});
      } else {
        this.setState({turn:'o', [e.currentTarget.id]: 'x'});
      }
    }
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
