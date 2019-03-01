import React, { Component } from "react";

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
   }

}

componentDidMount() {
  const sidebar = document.querySelector('#sidebarcontainer');
  sidebar.style.display = 'None';
  const main = document.querySelector('#main');
  main.classList.remove('col-sm-9');
  main.classList.add('col-sm-12');
}

componentWillUnmount() {
  const sidebar = document.querySelector('#sidebarcontainer');
  sidebar.style.display = 'block';
  const main = document.querySelector('#main');
  main.classList.remove('col-sm-12');
  main.classList.add('col-sm-9');
}


onItemClick(e) {
    e.preventDefault();
    if (this.state.turn === 'o') {
      this.setState({turn:'x', [e.currentTarget.id]: 'o'});
  } else {
      this.setState({turn:'o', [e.currentTarget.id]: 'x'});
  }
}


  render() {
    return (
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
    );
  }
}

export default TicTacToeInGame;
