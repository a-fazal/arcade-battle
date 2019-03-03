import React, { Component } from "react";

class DefeatedOpponent extends Component {
  render() {
    const opponent = this.props.opponent
    return (
      <div className="trophy">
        <div className="trophy-plaque">
          {opponent.wasChamp
            ? <div className="trophy-crown"></div>
            : <div className="trophy-crown-spacer"></div>
          }
          <div className="trophy-avatar"></div>
        </div>
        <div className="trophy-description">
          <div className="text-center">{opponent.username}<br />{opponent.lastBeaten}</div>
        </div>
      </div>
    );
  }
}

export default DefeatedOpponent;
