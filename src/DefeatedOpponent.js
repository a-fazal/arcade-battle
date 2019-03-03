import React, { Component } from "react";
import { Link } from "react-router-dom";

class DefeatedOpponent extends Component {
  render() {
    const opponent = this.props.opponent
    return (
      <div className="trophy">
        <Link to={"/user/" + opponent.id}>
          <div className="trophy-plaque">
            {opponent.wasChamp
              ? <div className="trophy-crown"></div>
              : <div className="trophy-crown-spacer"></div>
            }
            <div className="trophy-avatar"></div>
          </div>
          <div className="trophy-description">
            <div className="text-center">{opponent.username}<br />{opponent.lastBeaten}<br />{"Beaten in: " + opponent.beatenIn}</div>
          </div>
        </Link>
      </div>
    );
  }
}

export default DefeatedOpponent;
