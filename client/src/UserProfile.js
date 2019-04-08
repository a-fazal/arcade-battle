import React, { Component } from "react";
import { Doughnut, Line } from "react-chartjs-2";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null
    }
    this.fetchUserInfo = this.fetchUserInfo.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  fetchUserInfo() {
    const id = this.props.match ? this.props.match.params.id : null;
    if (id) {
      // BACKEND CALL
      fetch(`/user/${id}/stats`).then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      }).then((json) => {
        const data = {
          username: json.username,
          winstreak: json.winStreak["Overall"],
          hoursPlayed: (json.timePlayed["Tic-Tac-Toe"] + json.timePlayed["Checkers"]) / (60 * 60 * 1000),
          gamesPlayed: json.gamesPlayed["Tic-Tac-Toe"] + json.gamesPlayed["Checkers"],
          checkersStats: {
            hoursPlayed: json.timePlayed["Checkers"] / (60 * 60 * 1000),
            gamesPlayed: json.gamesPlayed["Checkers"],
            winPercent: json.winPercent["Checkers"].map(elem => (elem * 100).toFixed(1))
          },
          tictactoeStats: {
            hoursPlayed: json.timePlayed["Tic-Tac-Toe"] / (60 * 60 * 1000),
            gamesPlayed: json.gamesPlayed["Tic-Tac-Toe"],
            winPercent: json.winPercent["Tic-Tac-Toe"].map(elem => (elem * 100).toFixed(1))
          }
        }
        this.setState({ userData: data });
      }).catch((err) => {
        alert(err.message)
      });
    }
  }

  goBack(e) {
    e.preventDefault()
    if (this.props.user === "user") {
      this.props.history.push('/trophy');
    }
    else if (this.props.user === "admin") {
      this.props.history.push('/admin');
    }
  }

  goToProfile(e) {
    e.preventDefault();
    if (this.props.user === "admin" && this.props.match) {
      this.props.history.push(`/profile/${this.props.match.params.id}`);
    }
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

    const lineDataCheckers = {
      labels: [
        '4 Games Ago', '3 Games Ago', 
        '2 Games Ago', '1 Game Ago', 
        'Current'
      ],
      datasets: [
        {
          label: 'Win Percent',
          data: data.checkersStats.winPercent,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)"
        }
      ]
    };

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
      <div id="userProfile">
        <button className="profile-button" id="back-btn" onClick={this.goBack}>
          <i className="fas fa-chevron-left" />BACK
        </button>
        <div className="text-center">
          <h1 id="username">{data.username}</h1>
        </div>
        {this.props.user === "admin" &&
          <button className="profile-button" id="profile-btn" onClick={this.goToProfile}>
            MODIFY<i className="fas fa-chevron-right" />
          </button>}

        <h2 className="chartsLabel">OVERALL STATS</h2>
        <div className="row charts">
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
                <span className="green"><h1>{data.winstreak.toFixed(0)}</h1></span>
                <br />
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


        <h2 className="chartsLabel">CHECKERS STATS</h2>
        <div className="row charts">
          <div className="col-sm-4">
            <span>
              <span className="stats">
                <span className="green"><h1>{data.checkersStats.hoursPlayed.toFixed(1)}</h1></span>
                <br />
              </span>
              Hours Played
            </span>
          </div>
          <div className="col-sm-4">
            <div className="chart-container">
              <Line data={lineDataCheckers} options={options} />
            </div>
            <span>
              <span className="stats">
                <span className="green">{data.checkersStats.winPercent.length == 0 ? "0.00%" : Number(data.checkersStats.winPercent.slice(-1).pop()).toFixed(2) + "%"}</span> <br />
              </span>
              Win Percentage
            </span>
          </div>
          <div className="col-sm-4">
            <span>
              <span className="stats">
                <span className="green"><h1>{data.checkersStats.gamesPlayed.toFixed(0)}</h1></span> <br />
              </span>
              Games Played
            </span>
          </div>
        </div>


        <h2 className="chartsLabel">TICTACTOE STATS</h2>
        <div className="row charts">
          <div className="col-sm-4">
            <span>
              <span className="stats">
                <span className="green"><h1>{data.tictactoeStats.hoursPlayed.toFixed(1)}</h1></span>
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
                <span className="green">{data.tictactoeStats.winPercent.length == 0 ? "0.00%" : Number(data.tictactoeStats.winPercent.slice(-1).pop()).toFixed(2) + "%"}</span> <br />
              </span>
              Win Percentage
            </span>
          </div>
          <div className="col-sm-4">
            <span>
              <span className="stats">
                <span className="green"><h1>{data.tictactoeStats.gamesPlayed.toFixed(0)}</h1></span> <br />
              </span>
              Games Played
            </span>
          </div>
        </div>
      </div>
    );
  }

}

export default UserProfile;
