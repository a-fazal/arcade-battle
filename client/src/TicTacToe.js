import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";


class TicTacToe extends Component {
  constructor(props){
    super(props);
    // BACK END DATA
    this.state = {
      userData: null
    }

    this.fetchUserInfo = this.fetchUserInfo.bind(this);
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  fetchUserInfo() {
      // BACKEND CALL
      fetch(`/currentuser/stats`).then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      }).then((json) => {
        const data = {
          username: json.username,
          winstreak: json.winStreak["Overall"],
          hoursPlayed: Math.round((json.timePlayed["Tic-Tac-Toe"] + json.timePlayed["Checkers"]) / (60 * 60 * 1000)),
          gamesPlayed: json.gamesPlayed["Tic-Tac-Toe"] + json.gamesPlayed["Checkers"],
          checkersStats: {
            hoursPlayed: json.timePlayed["Checkers"] / (60 * 60 * 1000),
            gamesPlayed: json.gamesPlayed["Checkers"],
            winPercent: json.winPercent["Checkers"].map(elem => (elem * 100).toFixed(1))
          },
          tictactoeStats: {
            hoursPlayed: Math.round(json.timePlayed["Tic-Tac-Toe"] / (60 * 60 * 1000)),
            gamesPlayed: json.gamesPlayed["Tic-Tac-Toe"],
            winPercent: json.winPercent["Tic-Tac-Toe"].map(elem => (elem * 100).toFixed(1))
          }
        }
        this.setState({ userData: data });
      }).catch((err) => {
        alert(err.message)
      });
  }

  render() {
    const data = this.state.userData;

    if (!data) {
      return (<div>LOADING</div>);
    }

    const lineDataTicTacToe = {
      labels: [
        '4 Games Ago', '3 Games Ago',
        '2 Games Ago', '1 Game Ago',
        'Current'
      ],
      datasets: [
        {
          label: 'Win Percent',
          data: data.tictactoeStats.winPercent,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)"
        }
      ]
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              display: false
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              display: false //this will remove only the label
            }
          }
        ]
      },
      legend: {
        display: false
      },
      responsive: true, maintainAspectRatio: false
    };

    return (
      <div className="row">
        <div className="col-sm-12 text-center">
          <div className="game-title">
			TIC TAC TOE
          </div>
        </div>

        <div className="row" id="charts">
          <div className="col-sm-4">
            <span>
              <span className="stats">
                <span className="green"><h1>{data.hoursPlayed}</h1></span>
                <br />
              </span>
              Hours Played
            </span>
          </div>
          <div className="col-sm-4">
          <div className="chart-container">
            <Line data={lineDataTicTacToe} options={options} />
            </div>
            <span>
              <span className="stats">
                <span className="green">{data.tictactoeStats.winPercent.slice(-1).pop() + "%"}</span> <br />
              </span>
              Win Percentage
            </span>
          </div>
          <div className="col-sm-4">
            <span>
              <span className="stats">
                <span className="green"><h1>{data.gamesPlayed}</h1></span> <br />
              </span>
              Games Played
            </span>
          </div>
        </div>

        <div className="row">
      		<div className="col-sm-4 text-center">
      		<Link to="/tictactoeingame">
      			<div className="navbar-brand" id="start-button">
      			Start Game<br /><i className="fas fa-play icon-gradient"></i>
      			</div>
      			</Link>
      		</div>
      	</div>

      	<div id="tictactoe-icons">
      		<i className="fas fa-times ttt-x-all move"></i>
      		<i class="far fa-circle ttt-circle-all move"></i>
      	</div>

      </div>
    );
  }
}

export default TicTacToe;
