import React, { Component } from "react";
import { Doughnut, Line } from "react-chartjs-2";

class TicTacToe extends Component {

  render() {

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

    const data1 = {
      type: "line",
      labels: ["W", "L", "L", "W", "W", "L"],
      datasets: [
        {
          data: [100, 50, 33.3, 50, 60, 50, ],
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
                <span className="green"><h1>9</h1></span>
                <br />
              </span>
              Hours Played
            </span>
          </div>
          <div className="col-sm-4">
          <div className="chart-container">
            <Line data={data1} options={options1} />
            </div>
            <span>
              <span className="stats">
                <span className="green">50%</span> <br />
              </span>
              Win Percentage
            </span>
          </div>
          <div className="col-sm-4">
            <span>
              <span className="stats">
                <span className="green"><h1>10</h1></span> <br />
              </span>
              Games Played
            </span>
          </div>
        </div>

        <div className="row">
      		<div className="col-sm-4 text-center">
      		<a href="">
      			<div className="navbar-brand" id="start-button">
      			Start Game<br /><i class="fas fa-play icon-gradient"></i>
      			</div>
      			</a>
      		</div>
      	</div>

      	<div>
      		<i className="fas fa-times icon-gradient move"></i>
      		<i class="far fa-circle icon-gradient move"></i>
      	</div>

      </div>
    );
  }
}

export default TicTacToe;
