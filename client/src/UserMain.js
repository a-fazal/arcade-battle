import React, { Component } from "react";
import { Doughnut, Line } from "react-chartjs-2";

class UserMain extends Component {
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
            hoursPlayed: Math.round(json.timePlayed["Checkers"] / (60 * 60 * 1000)),
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

    const hoursData = {
      labels: ["Tic Tac Toe", "Checkers"],
      datasets: [
        {
          data: [data.tictactoeStats.hoursPlayed, data.checkersStats.hoursPlayed],
          backgroundColor: [
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    };

    const gamesData = {
      labels: ["Tic Tac Toe", "Checkers"],
      datasets: [
        {
          data: [data.tictactoeStats.gamesPlayed, data.checkersStats.gamesPlayed],
          backgroundColor: [
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    };

    const chartOptions = {
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
          <h2>
            Welcome back,
            <br /> {this.props.user}

          </h2>
        </div>

        <div className="row" id="charts">
          <div className="col-sm-4">
          <div className="chart-container">
              <Doughnut data={hoursData} options={chartOptions} />
            </div>
            <span>
              <span className="stats">
                <span className="green">{data.hoursPlayed.toFixed(1)}</span>
                <br />
              </span>
              Hours Played
            </span>
          </div>
          <div className="col-sm-4">
            <span>
              <span className="stats">
                <span className="green"><h1>{data.winstreak.toFixed(0)}</h1></span> <br />
              </span>
              Game Winning Streak
            </span>
          </div>
          <div className="col-sm-4">
          <div className="chart-container">
              <Doughnut data={gamesData} options={chartOptions} />
            </div>
            <span>
              <span className="stats">
                <span className="green">{data.gamesPlayed.toFixed(0)}</span> <br />
              </span>
              Games Played
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default UserMain;
