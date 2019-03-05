import React, { Component } from "react";
import DefeatedOpponent from "./DefeatedOpponent";

class Trophy extends Component {
  render() {
    // BACK END
    const data = {
      defeated: [
        {
          username: "MickeyMouse",
          lastBeaten: "01-03-2019",
          wasChamp: true,
          id: 1,
          beatenIn: "Checkers"
        },
        {
          username: "BuffyVampireSlayer",
          lastBeaten: "01-03-2019",
          wasChamp: false,
          id: 6,
          beatenIn: "Checkers"
        },
        {
          username: "UrMom",
          lastBeaten: "01-03-2019",
          wasChamp: false,
          id: 17,
          beatenIn: "Checkers"
        }
      ]
    }
    return (
      <div className="trophies">
        <div className="text-center trophiesTitle">
          DEFEATED OPPONENTS
        </div>
        {data.defeated.map(opponent => <DefeatedOpponent opponent={opponent} key={opponent.id} />)}
      </div>
    );
  }
}

export default Trophy;
