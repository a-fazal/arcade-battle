import React, { Component } from "react";
import DefeatedOpponent from "./DefeatedOpponent";

class Trophy extends Component {
  constructor(props){
    super(props);
    // BACK END DATA
    this.state = {
      defeated: null
    }

    this.fetchWinners = this.fetchWinners.bind(this);
  }

  componentDidMount() {
    this.fetchWinners();
  }

  fetchWinners() {
    fetch('/currentuser/winner').then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    }).then((json) => {
      console.log(json)
      this.setState({ defeated: json });
    }).catch((err) => {
      alert(err.message)
    });
}

  render() {
    const data = this.state.defeated;
    console.log(data)
    if (!data) {
      return (<div>LOADING</div>);
    }

    return (
      <div className="trophies">
        <div className="text-center trophiesTitle">
          DEFEATED OPPONENTS
        </div>
        <center><h5>These are the players you recently won a match against!</h5></center>
        {data.map(opponent => <DefeatedOpponent opponent={opponent} key={opponent._id} user={this.props.user}/>)}
      </div>
    );
  }
}

export default Trophy;
