import React, { Component } from "react";
import { Doughnut, Line } from "react-chartjs-2";

class UserMain extends Component {
  constructor(props){
    super(props);
    // BACK END DATA
    this.state = {
      hoursPlayed: 9,
      streak: 20,
      gamesPlayed: 10,
      test: ''
    };
    this.getTest = this.getTest.bind(this);
  }

  componentDidMount() {
    this.getTest()
  }

  getTest(event) {
      fetch('/test').then((response) => {
          if (response.status !== 200) {
              throw new Error(response.statusText);
          } else {
              return response.json();
          }
      }).then((json) => {
          this.setState({
              test: json['testMessage']
          });
      }).catch((err) => {
          alert(err.message)
      });
    }


  render() {
    // BACK END DATA
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

    // BACK END DATA
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
    return (
      <div className="row">
        <div className="col-sm-12 text-center">
          <h2>
            Welcome back,
            <br /> {this.props.user}

            {this.state.test}
          </h2>
        </div>

        <div className="row" id="charts">
          <div className="col-sm-4">
          <div className="chart-container">
            <Doughnut data={data1} options={options1} />
            </div>
            <span>
              <span className="stats">
                <span className="green">{this.state.hoursPlayed}</span>
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
                <span className="green">{this.state.streak}</span> <br />
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
                <span className="green">{this.state.gamesPlayed}</span> <br />
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
