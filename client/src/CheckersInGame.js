import React, { Component } from "react";

var delay = 3;

class CheckersInGame extends Component {
constructor(props) {
   super(props)
   this.state = {
     turn: 'black',
     me: null,
     them: null,
     end: false,
     board: [ [ [], [], [], [], [], [], [], [] ], [ [], [], [], [], [], [], [], [] ],
            [ [], [], [], [], [], [], [], [] ], [ [], [], [], [], [], [], [], [] ],
            [ [], [], [], [], [], [], [], [] ], [ [], [], [], [], [], [], [], [] ],
            [ [], [], [], [], [], [], [], [] ], [ [], [], [], [], [], [], [], [] ] ],
    numClick: 0,
    clickedPiece: null
   }
   this.onItemClickCheckers = this.onItemClickCheckers.bind(this);
   this.checkForOpponentCheckers = this.checkForOpponentCheckers.bind(this);
}

componentDidMount() {
  this.props.setGameHeader(true);
  this.checkForOpponentCheckers();
}

componentWillUnmount() {
  this.props.setGameHeader(false);
}

checkForOpponentCheckers() {
  // Poll the server for an opponent
  // BACK END
  console.log('helloo')
  let data = null;
  if (delay === 0) {
    data = {
      me: {
        username: "Sophia",
        winstreak: 21,
        id: 6,
        colour: "black"
      },
      them: {
        username: "Alec",
        winstreak: 14,
        id: 14,
        colour: "red"
      }
    };
  } else {
    delay -= 1;
  }
  if (data) {
    this.setState({me: data.me, them: data.them});
    for (let i = 0; i < 8; i++){
        for (let j = 0; j <= 8; j++){
            if (i === 0 || i === 2) {
                if (j % 2 === 1){
                    this.state.board[i][j] = this.state.them.colour;
                }
            } else if (i === 1) {
                if (j % 2 === 0) {
                    this.state.board[i][j] = this.state.them.colour;
                }
            } else if (i === 5 || i === 7) {
                if (j % 2 === 0) {
                    this.state.board[i][j] = this.state.me.colour;
                }
            } else if (i === 6) {
                if (j % 2 === 1){
                    this.state.board[i][j] = this.state.me.colour;
                }
            }
        }
    }
  }
  else {
    // if the server can't find an opponent, try again in 1 second
    setTimeout(this.checkForOpponentCheckers, 1000);
  }
}

/* TO BE COMPLETED */
onItemClickCheckers(e) {
    e.preventDefault();
    let rowInput = parseInt(e.currentTarget.id[3]);
    let colInput = parseInt(e.currentTarget.id[7]);
    if (this.state.numClick === 0){
        if (this.state.board[rowInput][colInput] === this.state.me.colour) {
            this.setState({clickedPiece: {
                row: rowInput,
                col: colInput
            }, numClick: 1
            });
        }
    } else {
        if (this.state.board[rowInput][colInput] !== this.state.me.colour && this.state.board[rowInput][colInput] !== this.state.them.colour) {
            //  User attempted to take opposing player's piece
            if (Math.abs(rowInput - this.state.clickedPiece[rowInput]) === 2) {
                // User moved left
                if (rowInput - this.state.clickedPiece[rowInput] < 0) {
                    // Check that there existed an opposing piece
                    if (this.state.board[rowInput - 1][colInput - 1]) {

                    }
                // User moved right
                } else {

                }
            }
        }
    }
    return;
 }

  render() {
    if (this.state.them) {
      return (
        <div id="inGame">
        	<div class="inGameHeader">
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

        	<table id="checkersBoard">
        		<tbody>
        			<tr>
        				<td id="row0col0" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[0][0] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[0][0] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row0col1" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[0][1] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[0][1] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row0col2" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[0][2] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[0][2] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row0col3" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[0][3] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[0][3] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row0col4" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[0][4] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[0][4] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row0col5" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[0][5] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[0][5] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row0col6" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[0][6] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[0][6] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row0col7" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[0][7] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[0][7] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>
        			</tr>

        			<tr>
        				<td id="row1col0" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[1][0] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[1][0] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row1col1" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[1][1] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[1][1] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row1col2" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[1][2] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[1][2] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row1col3" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[1][3] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[1][3] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row1col4" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[1][4] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[1][4] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row1col5" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[1][5] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[1][5] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row1col6" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[1][6] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[1][6] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row1col7" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[1][7] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[1][7] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>
        			</tr>

        			<tr>
        				<td id="row2col0" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[2][0] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[2][0] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row2col1" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[2][1] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[2][1] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row2col2" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[2][2] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[2][2] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row2col3" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[2][3] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[2][3] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row2col4" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[2][4] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[2][4] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row2col5" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[2][5] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[2][5] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row2col6" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[2][6] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[2][6] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row2col7" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[2][7] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[2][7] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>
        			</tr>

        			<tr>
        				<td id="row3col0" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[3][0] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[3][0] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row3col1" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[3][1] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[3][1] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row3col2" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[3][2] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[3][2] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row3col3" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[3][3] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[3][3] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row3col4" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[3][4] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[3][4] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row3col5" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[3][5] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[3][5] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row3col6" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[3][6] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[3][6] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row3col7" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[3][7] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[3][7] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>
        			</tr>

        			<tr>
        				<td id="row4col0" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[4][0] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[4][0] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row4col1" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[4][1] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[4][1] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row4col2" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[4][2] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[4][2] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row4col3" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[4][3] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[4][3] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row4col4" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[4][4] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[4][4] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row4col5" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[4][5] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[4][5] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row4col6" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[4][6] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[4][6] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row4col7" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[4][7] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[4][7] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>
        			</tr>

        			<tr>
        				<td id="row5col0" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[5][0] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[5][0] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row5col1" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[5][1] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[5][1] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row5col2" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[5][2] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[5][2] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row5col3" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[5][3] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[5][3] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row5col4" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[5][4] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[5][4] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row5col5" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[5][5] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[5][5] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row5col6" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[5][6] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[5][6] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row5col7" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[5][7] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[5][7] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>
        			</tr>

        			<tr>
        				<td id="row6col0" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[6][0] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[6][0] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row6col1" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[6][1] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[6][1] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row6col2" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[6][2] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[6][2] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row6col3" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[6][3] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[6][3] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row6col4" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[6][4] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[6][4] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row6col5" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[6][5] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[6][5] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row6col6" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[6][6] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[6][6] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row6col7" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[6][7] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[6][7] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>
        			</tr>

        			<tr>
        				<td id="row7col0" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[7][0] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[7][0] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row7col1" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[7][1] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[7][1] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row7col2" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[7][2] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[7][2] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row7col3" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[7][3] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[7][3] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row7col4" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[7][4] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[7][4] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row7col5" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[7][5] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[7][5] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row7col6" className="blackboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[7][6] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[7][6] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
                        }
        				</td>

        				<td id="row7col7" className="redboard" onClick={this.onItemClickCheckers}>
                        {this.state.board[7][7] === 'red' &&
                        <i className="fas fa-circle redcheckerspiece"></i>
                        }
                        {this.state.board[7][7] === 'black' &&
                        <i className="fas fa-circle blackcheckerspiece"></i>
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

export default CheckersInGame;
