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
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  fetchUserInfo() {
    const id = this.props.match ? this.props.match.params.id : null;
    if (id) {
      // BACKEND CALL

      const data = {
        username: "Alec",
        winstreak: 14,
        hoursPlayed: 40,
        gamesPlayed: 120,
        checkersStats: {
          hoursPlayed: 10,
          gamesPlayed: 20,
          winPercent: [100, 50, 33.3, 50, 60, 50]
        },
        tictactoeStats: {
          hoursPlayed: 30,
          gamesPlayed: 100,
          winPercent: [20, 50, 83.3, 60, 90, 85]
        }
      }
      this.setState({ userData: data });
    }
  }
  
  goBack(e) {
    e.preventDefault()
    console.log(this.props);
    if (this.props.user === "user") {
        this.props.history.push('/trophy');
    }
    else if (this.props.user === "admin") {
        this.props.history.push('/admin');
    }
  }
  
  render() {
    const data = this.state.userData;

    if (!data) {
      return (<div>LOADING</div>);
    }

    const data1 = {
      labels: ["Tic Tac Toe", "Checkers"],
      datasets: [
        {
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 0)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    };

    const options1 = {
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

    const data2 = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
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

    const lineDataCheckers = {
      type: "line",
      datasets: [
        {
          data: data.checkersStats.winPercent,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1,
          lineTension: 0
        },
      ],
    };

    const lineDataTicTacToe = {
      type: "line",
      datasets: [
        {
          data: data.tictactoeStats.winPercent,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1,
          lineTension: 0
        },
      ],
    };

    return (
      <div id="userProfile">
        <button className="back-button" onClick={this.goBack}>
          <i className="fas fa-chevron-left" />BACK
        </button>
        <div className="text-center">
          <h1 id="username">{data.username}</h1>
        </div>


        <h2 className="chartsLabel">OVERALL STATS</h2>
        <div className="row charts">
          <div className="col-sm-4">
          <div className="chart-container">
            <Doughnut data={data1} options={options1} />
            </div>
            <span>
              <span className="stats">
                <span className="green">{data.hoursPlayed}</span>
                <br />
              </span>
              Hours Played
            </span>
          </div>
          <div className="col-sm-4">
          <div className="chart-container">
            <Line data={data2} options={options1} />
            </div>
            <span>
              <span className="stats">
                <span className="green">{data.winstreak}</span> <br />
              </span>
              Winning Game Streak
            </span>
          </div>
          <div className="col-sm-4">
          <div className="chart-container">
            <Doughnut data={data1} options={options1} />
            </div>
            <span>
              <span className="stats">
                <span className="green">{data.gamesPlayed}</span> <br />
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
                <span className="green"><h1>{data.checkersStats.hoursPlayed}</h1></span>
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
                <span className="green">{data.checkersStats.winPercent.slice(-1).pop() + "%"}</span> <br />
              </span>
              Win Percentage
            </span>
          </div>
          <div className="col-sm-4">
            <span>
              <span className="stats">
                <span className="green"><h1>{data.checkersStats.gamesPlayed}</h1></span> <br />
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
                <span className="green"><h1>{data.tictactoeStats.hoursPlayed}</h1></span>
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
                <span className="green"><h1>{data.tictactoeStats.gamesPlayed}</h1></span> <br />
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
