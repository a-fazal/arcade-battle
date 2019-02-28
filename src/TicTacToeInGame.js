import React, { Component } from "react";

class TicTacToeInGame extends Component {
constructor(props) {
   super(props)
   this.onItemClick = this.onItemClick.bind(this);
   this.state = {
     turn: 'o',
   }

}

componentDidMount() {
  const sidebar = document.querySelector('#sidebarcontainer');
  sidebar.style.display = 'None';
  const main = document.querySelector('#main');
  main.classList.remove('col-sm-9');
  main.classList.add('col-sm-12');
  this.onItemClick = this.onItemClick.bind(this);
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
      const circle = document.createElement("i");
      circle.classList.add('far');
      circle.classList.add('fa-circle');
      circle.classList.add('ttt-circle-all');
      e.currentTarget.appendChild(circle);
      this.setState({turn:'x'});
  } else {
    const circle = document.createElement("i");
    circle.classList.add('fas');
    circle.classList.add('fa-times');
    circle.classList.add('ttt-x-all');
    e.currentTarget.appendChild(circle);
    this.setState({turn:'o'});
  }

}


  render() {
    return (
      <table id="tictactoeboard">
      <tbody>
        <tr>
          <td id="top-left-ttt" onClick={this.onItemClick}>

          </td>
          <td id="top-center-ttt" onClick={this.onItemClick}>

          </td>
          <td id="top-right-ttt" onClick={this.onItemClick}>

          </td>
        </tr>
        <tr>
          <td id="middle-left-ttt" onClick={this.onItemClick}>

          </td>
          <td id="middle-center-ttt" onClick={this.onItemClick}>

          </td>
          <td id="middle-right-ttt" onClick={this.onItemClick}>

          </td>
        </tr>
        <tr>
          <td id="bottom-left-ttt" onClick={this.onItemClick}>

          </td>
          <td id="bottom-center-ttt" onClick={this.onItemClick}>

          </td>
          <td id="bottom-right-ttt" onClick={this.onItemClick}>

          </td>
        </tr>
        </tbody>
      </table>
    );
  }
}

export default TicTacToeInGame;
