"use strict";

const log = console.log;

const express = require("express");
const path = require("path");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser"); // middleware for parsing HTTP body
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");

const { User } = require("./models/user");
const { CurrentGame } = require("./models/currentgame");
const { CompleteGame } = require("./models/completegame");

const { INIT_USERS, INIT_GAMES } = require('./initData');

const app = express();
app.use(bodyParser.json());

// The number of points used for the win percent line graphs
const WIN_PERCENT_POINTS = 5;

//
// app.get('/test', (req, res) => {
//   res.send({ testMessage: 'testing' });
// });


// Delete all model objects
// add test data to the database
app.post('/resetdata', (req, res) => {
  let ret = {
    games: [],
    users: []
  }
  let set = false;
  CurrentGame.deleteMany()
  CompleteGame.deleteMany()
    .then(function () {
      CompleteGame.create(INIT_GAMES)
        .then(games => {
          ret.games = games
          if (set) {
            res.send(ret);
          } else {
            set = true;
          }
        })
        .catch(error => {
          res.status(500).send();
        })
    })
  User.deleteMany()
    .then(function () {
      User.create(INIT_USERS)
        .then(users => {
          ret.users = users
          if (set) {
            res.send(ret);
          } else {
            set = true;
          }
        })
        .catch(error => {
          res.status(500).send();
        })
    })
})

/*  USER ENDPOINTS  */

app.get(/user/:id, (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  } else {
    User.findById(id)
      .then((user) => {
        res.send(user);
      }).catch((err) => {
        res.status(500).send(err);
      })
  }
})

app.get("/allusers", (req, res) => {
  User.find({})
    .select({ password: 0 })
    .then(function (users) {
      if (!users) {
        res.status(404).send();
      } else {
        res.send(users);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.patch("/user/:id/updatepass", (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  } else {
    User.findByIdAndUpdate(
      id,
      {password: req.body.newPass}
    ).then((user) => {
      res.send(user);
    }).catch((err) => {
      res.status(500).send(err);
    })
  }
})

app.patch("/user/:id/updatename", (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  } else {
    User.findByIdAndUpdate(
      id,
      {username: req.body.newName}
    ).then((user) => {
      res.send(user);
    }).catch((err) => {
      res.status(500).send(err);
    })
  }
})

app.patch("/user/:id/accept", (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    res.status(404).send()
  } else {
    User.findByIdAndUpdate(
      id,
      { isPending: false },
      { new: true })
      .then(function (user) {
        res.send(user);
      })
      .catch(err => {
        res.status(500).send(err);
      })
  }
})

app.patch("/user/:id/deny", (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    res.status(404).send()
  } else {
    User.findById(id)
      .then(function (user) {
        if (user.isPending) {
          user.remove()
            .then(() => {
              res.status(200).send();
            })
        } else {
          res.status(500).send({ "msg": "Cannot delete users once they have been accepted" })
        }
      })
      .catch(err => {
        res.status(500).send(err);
      })
  }
})

app.patch("/user/:id/ban", (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    res.status(404).send()
  } else {
    User.findByIdAndUpdate(
      id,
      { isBanned: true },
      { new: true })
      .then(function (user) {
        res.send(user);
      })
      .catch(err => {
        res.status(500).send(err);
      })
  }
})

app.patch("/user/:id/reinstate", (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    res.status(404).send()
  } else {
    User.findByIdAndUpdate(
      id,
      { isBanned: false },
      { new: true })
      .then(function (user) {
        res.send(user);
      })
      .catch(err => {
        res.status(500).send(err);
      })
  }
})

app.get("/user/:id/stats", (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    res.status(404).send()
  } else {
    // Needed:
    // hours played (itemized by game)
    // games played (itemized by game)
    // current win streak
    User.findById(id)
      .then(function (user) {
        CompleteGame.find()
          .or([{ playerOne: user.username }, { playerTwo: user.username }])
          .sort({ endTime: 'ascending' })
          .exec((err, games) => {
            if (err) {
              return res.status(500).send(err);
            }
            let timePlayed = {
              "Tic-Tac-Toe": 0,
              "Checkers": 0
            }
            let gamesPlayed = {
              "Tic-Tac-Toe": 0,
              "Checkers": 0
            }
            let winStreak = {
              "Tic-Tac-Toe": 0,
              "Checkers": 0,
              "Overall": 0
            }
            let winPercent = {
              "Tic-Tac-Toe": [],
              "Checkers": []
            }

            // used to calculate historic win percentages
            let winCount = {
              "Tic-Tac-Toe": 0,
              "Checkers": 0
            }

            let i = 0
            while (i < games.length) {
              if (games[i].winner === user.username) {
                winStreak[games[i].game] += 1
                winStreak["Overall"] += 1
                winCount[games[i].game] += 1
              } else {
                winStreak[games[i].game] = 0
                winStreak["Overall"] = 0
              }
              gamesPlayed[games[i].game] += 1
              timePlayed[games[i].game] += (new Date(games[i].endTime).getTime() - new Date(games[i].startTime).getTime())
              winPercent[games[i].game].push(winCount[games[i].game] / gamesPlayed[games[i].game])
              i++;
            }

            winPercent["Tic-Tac-Toe"] = winPercent["Tic-Tac-Toe"].slice(0, WIN_PERCENT_POINTS)
            winPercent["Checkers"] = winPercent["Checkers"].slice(0, WIN_PERCENT_POINTS)

            res.send({ username: user.username, timePlayed, gamesPlayed, winStreak, winPercent })
          })
      })
      .catch(err => {
        res.status(500).send(err);
      })
  }
})

app.get("/currentuser/stats", (req, res) => {
    // TODO: get the currently logged in user's id
    const id = "5ca300727c3d0b6d2bee77ae"
    
    // Needed:
    // hours played (itemized by game)
    // games played (itemized by game)
    // current win streak
    User.findById(id)
      .then(function (user) {
        CompleteGame.find()
          .or([{ playerOne: user.username }, { playerTwo: user.username }])
          .sort({ endTime: 'ascending' })
          .exec((err, games) => {
            if (err) {
              return res.status(500).send(err);
            }
            let timePlayed = {
              "Tic-Tac-Toe": 0,
              "Checkers": 0
            }
            let gamesPlayed = {
              "Tic-Tac-Toe": 0,
              "Checkers": 0
            }
            let winStreak = {
              "Tic-Tac-Toe": 0,
              "Checkers": 0,
              "Overall": 0
            }
            let winPercent = {
              "Tic-Tac-Toe": [],
              "Checkers": []
            }

            // used to calculate historic win percentages
            let winCount = {
              "Tic-Tac-Toe": 0,
              "Checkers": 0
            }

            let i = 0
            while (i < games.length) {
              if (games[i].winner === user.username) {
                winStreak[games[i].game] += 1
                winStreak["Overall"] += 1
                winCount[games[i].game] += 1
              } else {
                winStreak[games[i].game] = 0
                winStreak["Overall"] = 0
              }
              gamesPlayed[games[i].game] += 1
              timePlayed[games[i].game] += (new Date(games[i].endTime).getTime() - new Date(games[i].startTime).getTime())
              winPercent[games[i].game].push(winCount[games[i].game] / gamesPlayed[games[i].game])
              i++;
            }

            winPercent["Tic-Tac-Toe"] = winPercent["Tic-Tac-Toe"].slice(0, WIN_PERCENT_POINTS)
            winPercent["Checkers"] = winPercent["Checkers"].slice(0, WIN_PERCENT_POINTS)

            res.send({ username: user.username, timePlayed, gamesPlayed, winStreak, winPercent })
          })
      })
      .catch(err => {
        res.status(500).send(err);
      })
})

/*  GAMEPLAY ENDPOINTS  */

app.get("/getopponent/:game", (req, res) => {
  const game = req.params.game
  CurrentGame.findOne({})
    .where('game').equals('tictactoe')
    .then(function (currentgame) {
      if (!currentgame) {
        res.status(404).send();
      } else {
        res.send(currentgame);
      }
    })
    .catch(error => {
      res.status(500).send();
    });
});

app.post('/currentgame', (req, res) => {
  const currentgame = new CurrentGame({
    "startTime": "",
    "playerOne": req.body.playerOne,
    "playerTwo": "",
    "turn": "x",
    "startOfLastTurn": "",
    "game": req.body.game,
    "moves":
      { "top-left-ttt": "empty", "top-center-ttt": "empty", "top-right-ttt": "empty", "middle-left-ttt": "empty", "middle-center-ttt": "empty", "middle-right-ttt": "empty", "bottom-left-ttt": "empty", "bottom-center-ttt": "empty", "bottom-right-ttt": "empty" }
  })

  currentgame.save().then((currentgame) => {
    res.send(currentgame)
  }, (error) => {

    res.status(400).send(error)
  })
})

app.patch('/currentgame/:id', (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    res.status(404).send()
  }
  CurrentGame.findByIdAndUpdate(
    id,
    req.body,
    (err, currentgame) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.send(currentgame);
      }
    }
  )
})

app.get('/currentgamemoves/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send()
  }

  CurrentGame.findById(id).then((currentgame) => {
    if (!currentgame) {
      res.status(404).send()
    } else {
      res.send(currentgame.moves);
    }
  }).catch((error) => {
    res.status(500).send()
  })
})

app.patch('/currentgamemoves/:id', (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    res.status(404).send()
  }
  CurrentGame.findById(id).then((currentgame) => {
    if (!currentgame) {
      res.status(404).send()
    } else {
      const moves = currentgame.moves
      moves.set(req.body);
      currentgame.save().then((currentgame) => {
        res.send(currentgame)
      }, (error) => {
        res.status(400).send(error)
      })

    }
  }).catch((error) => {
    res.status(500).send()
  })
})

// Deploying to Heroku, followed parts from
// tutorial https://coursework.vschool.io/deploying-mern-with-heroku/
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  log(`Listening on port ${port}...`);
});
