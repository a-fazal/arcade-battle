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
     board: []
   }
   this.onItemClick = this.onItemClick.bind(this);
   this.checkForOpponent = this.checkForOpponent.bind(this);
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
  }
  else {
    // if the server can't find an opponent, try again in 1 second
    setTimeout(this.checkForOpponent, 1000);
  }
}

/* TO BE COMPLETED */
onItemClick(e) {
    e.preventDefault();
    return;
 }

/* TO BE COMPLETED */
gameOverMessage(turn) {
	return;
 }

  render() {
    if (this.state.them) {
      return (
        <div id=inGame>
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
        				<td id="row1col1" className="redboard">
        				</td>

        				<td id="row1col2" className="blackboard">
        				</td>

        				<td id="row1col3" className="redboard">
        				</td>

        				<td id="row1col4" className="blackboard">
        				</td>

        				<td id="row1col5" className="redboard">
        				</td>

        				<td id="row1col6" className="blackboard">
        				</td>

        				<td id="row1col7" className="redboard">
        				</td>

        				<td id="row1col8" className="blackboard">
        				</td>
        			</tr>

        			<tr>
        				<td id="row2col1" className="blackboard">
        				</td>

        				<td id="row2col2" className="redboard">
        				</td>

        				<td id="row2col3" className="blackboard">
        				</td>

        				<td id="row2col4" className="redboard">
        				</td>

        				<td id="row2col5" className="blackboard">
        				</td>

        				<td id="row2col6" className="redboard">
        				</td>

        				<td id="row2col7" className="blackboard">
        				</td>

        				<td id="row2col8" className="redboard">
        				</td>
        			</tr>

        			<tr>
        				<td id="row3col1" className="redboard">
        				</td>

        				<td id="row3col2" className="blackboard">
        				</td>

        				<td id="row3col3" className="redboard">
        				</td>

        				<td id="row3col4" className="blackboard"> 
        				</td>

        				<td id="row3col5" className="redboard">
        				</td>

        				<td id="row3col6" className="blackboard">
        				</td>

        				<td id="row3col7" className="redboard">
        				</td>

        				<td id="row3col8" className="blackboard">
        				</td>
        			</tr>

        			<tr>
        				<td id="row4col1" className="blackboard">
        				</td>

        				<td id="row4col2" className="redboard">
        				</td>

        				<td id="row4col3" className="blackboard">
        				</td>

        				<td id="row4col4" className="redboard">
        				</td>

        				<td id="row4col5" className="blackboard">
        				</td>

        				<td id="row4col6" className="redboard">
        				</td>

        				<td id="row4col7" className="blackboard">
        				</td>

        				<td id="row4col8" className="redboard">
        				</td>
        			</tr>

        			<tr>
        				<td id="row5col1" className="redboard">
        				</td>

        				<td id="row5col2" className="blackboard">
        				</td>

        				<td id="row5col3" className="redboard">
        				</td>

        				<td id="row5col4" className="blackboard"> 
        				</td>

        				<td id="row5col5" className="redboard">
        				</td>

        				<td id="row5col6" className="blackboard">
        				</td>

        				<td id="row5col7" className="redboard">
        				</td>

        				<td id="row5col8" className="blackboard">
        				</td>
        			</tr>

        			<tr>
        				<td id="row6col1" className="blackboard">
        				</td>

        				<td id="row6col2" className="redboard">
        				</td>

        				<td id="row6col3" className="blackboard">
        				</td>

        				<td id="row6col4" className="redboard">
        				</td>

        				<td id="row6col5" className="blackboard">
        				</td>

        				<td id="row6col6" className="redboard">
        				</td>

        				<td id="row6col7" className="blackboard">
        				</td>

        				<td id="row6col8" className="redboard">
        				</td>
        			</tr>

        			<tr>
        				<td id="row7col1" className="redboard">
        				</td>

        				<td id="row7col2" className="blackboard">
        				</td>

        				<td id="row7col3" className="redboard">
        				</td>

        				<td id="row7col4" className="blackboard"> 
        				</td>

        				<td id="row7col5" className="redboard">
        				</td>

        				<td id="row7col6" className="blackboard">
        				</td>

        				<td id="row7col7" className="redboard">
        				</td>

        				<td id="row7col8" className="blackboard">
        				</td>
        			</tr>

        			<tr>
        				<td id="row8col1" className="blackboard">
        				</td>

        				<td id="row8col2" className="redboard">
        				</td>

        				<td id="row8col3" className="blackboard">
        				</td>

        				<td id="row8col4" className="redboard">
        				</td>

        				<td id="row8col5" className="blackboard">
        				</td>

        				<td id="row8col6" className="redboard">
        				</td>

        				<td id="row8col7" className="blackboard">
        				</td>

        				<td id="row8col8" className="redboard">
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