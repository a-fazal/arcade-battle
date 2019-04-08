import React, { Component } from "react";
import { Link } from "react-router-dom";

class DefeatedOpponent extends Component {
  render() {
    const opponent = this.props.opponent
    return (
      <div className="trophy">
        <Link to={"/user/" + opponent.opponentId}>
          <div className="trophy-plaque">
            {opponent.wasChamp
              ? <div className="trophy-crown"></div>
              : <div className="trophy-crown-spacer"></div>
            }
            <div className="trophy-avatar" style={{ backgroundImage: 'url(' + '/avatars/staravatar.jpg' + ')' }}></div>
          </div>
          <div className="trophy-description">
            <div className="text-center">{opponent.playerOne == this.props.user && opponent.playerTwo} {opponent.playerTwo == this.props.user && opponent.playerOne}
      <br />{opponent.endTime}<br />{"Beaten in: " + opponent.game}</div>
          </div>
        </Link>
      </div>
    );
  }
}

export default DefeatedOpponent;
