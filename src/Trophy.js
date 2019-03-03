import React, { Component } from "react";
import DefeatedOpponent from "./DefeatedOpponent";

class Trophy extends Component {
  render() {
    const data = {
      defeated: [
        {
          username: "MickeyMouse",
          lastBeaten: "01-03-2019",
          wasChamp: true
        },
        {
          username: "BuffyVampireSlayer",
          lastBeaten: "01-03-2019",
          wasChamp: false
        },
        {
          username: "UrMom",
          lastBeaten: "01-03-2019",
          wasChamp: false
        },
        {
          username: "MickeyMouse",
          lastBeaten: "01-03-2019",
          wasChamp: false
        },
        {
          username: "BuffyVampireSlayer",
          lastBeaten: "01-03-2019",
          wasChamp: false
        },
        {
          username: "UrMom",
          lastBeaten: "01-03-2019",
          wasChamp: false
        },
        {
          username: "MickeyMouse",
          lastBeaten: "01-03-2019",
          wasChamp: false
        },
        {
          username: "BuffyVampireSlayer",
          lastBeaten: "01-03-2019",
          wasChamp: false
        },
        {
          username: "UrMom",
          lastBeaten: "01-03-2019",
          wasChamp: false
        },
        {
          username: "MickeyMouse",
          lastBeaten: "01-03-2019",
          wasChamp: false
        },
        {
          username: "BuffyVampireSlayer",
          lastBeaten: "01-03-2019",
          wasChamp: false
        },
        {
          username: "UrMom",
          lastBeaten: "01-03-2019",
          wasChamp: false
        }
      ]
    }
    return (
      <div className="trophies">
        <div className="text-center game-title">
          DEFEATED OPPONENTS
        </div>
        {data.defeated.map(opponent => <DefeatedOpponent opponent={opponent} />)}
      </div>
    );
  }
}

export default Trophy;
