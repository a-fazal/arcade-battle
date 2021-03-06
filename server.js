"use strict";

const log = console.log;

const express = require("express");
const path = require("path");
const http = require('http');
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser"); // middleware for parsing HTTP body
const session = require('express-session');
const { ObjectID } = require("mongodb");
const moment = require('moment');

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

/* Session cookie */
// Add express sesssion middleware
app.use(session({
  secret: 'oursecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000,
    httpOnly: true
  }
}))

// Add middleware to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (req.session.user) {
    res.redirect('/home')
  } else {
    next();
  }
}

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
        .catch((err) => {
          res.status(500).send(err);
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
        .catch((err) => {
          res.status(500).send(err);
        })
    })
})

/*  USER ENDPOINTS  */
app.post("/user/register", (req, res) => {
  const name = req.body.username;
  const pass = req.body.password;

  const user = new User({
    username: name,
    password: pass,
    uri: "/avatars/staravatar.jpg",
    role: "user",
    isPending: true,
    isBanned: false
  })

  user.save().then((result) => {
    res.send(result)
  }, (error) => {
    console.log(error)
    res.status(500).send(error);
  })
})

app.post("/user/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findByUsernamePassword(username, password).then((user) => {
    if (!user|| user.isBanned){
      console.log(user)
      console.log('hello')
      res.send("Invalid username or password.");
    } else {
      req.session.user = user._id;
      if (user.role === 'user') {
       res.status(200).send(user);
      } else if (user.role === 'admin') {
        res.status(300).send(user);
      }
    }
  }).catch((error) => {
    console.log(error)
    res.status(500).send(error);
  })
})

app.get("/user", (req, res) => {
  const id = req.session.user;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  } else {
    User.findById(id)
      .then((user) => {
        console.log(user)
        res.send(user);
      }).catch((err) => {
        res.status(500).send(err);
      })
  }
})


app.get("/user/:username", (req, res) => {
  const id = req.params.username;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  } else {
    User.findOne({username: username})
      .then((user) => {
        res.send(user);
      }).catch((err) => {
        res.status(500).send(err);
      })
  }
})

app.get("/allusers", (req, res) => {
  User.find({
    isBanned: false,
    isPending: false,
    role: "user"
  }).then(function (users) {
      if (!users) {
        res.status(404).send();
      } else {
        res.send(users);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/allusersforadmin", (req, res) => {
  User.find({
    role: "user"
  }).then(function (users) {
      if (!users) {
        res.status(404).send();
      } else {
        res.send(users);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/alladmins", (req, res) => {
  User.find({
    role: "admin",
    isBanned: false,
    isPending: false
  }).then((users) => {
    if (!users) {
      res.status(404).send();
    } else {
      res.send(users);
    }
  }).catch((error) => {
    res.status(500).send(error);
  })
})

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
      .catch((err) => {
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
      .catch((err) => {
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
      .catch((err) => {
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
      .catch((err) => {
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
              console.log("first")
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
              timePlayed[games[i].game] += Math.round((new Date(games[i].endTime).getTime() - new Date(games[i].startTime).getTime()))
              winPercent[games[i].game].push(winCount[games[i].game] / gamesPlayed[games[i].game])
              i++;
            }

            winPercent["Tic-Tac-Toe"] = winPercent["Tic-Tac-Toe"].slice(0, WIN_PERCENT_POINTS)
            winPercent["Checkers"] = winPercent["Checkers"].slice(0, WIN_PERCENT_POINTS)

            res.send({ username: user.username, timePlayed, gamesPlayed, winStreak, winPercent })
          })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send(err);
      })
  }
})

app.get("/currentuser/stats", (req, res) => {
    // TODO: get the currently logged in user's id
    const id = req.session.user;

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
              timePlayed[games[i].game] += Math.round((new Date(games[i].endTime).getTime() - new Date(games[i].startTime).getTime()))
              winPercent[games[i].game].push(winCount[games[i].game] / gamesPlayed[games[i].game])
              i++;
            }

            winPercent["Tic-Tac-Toe"] = winPercent["Tic-Tac-Toe"].slice(0, WIN_PERCENT_POINTS)
            winPercent["Checkers"] = winPercent["Checkers"].slice(0, WIN_PERCENT_POINTS)
            res.send({ username: user.username, timePlayed, gamesPlayed, winStreak, winPercent })
          })
      })
      .catch((err) => {
        res.status(500).send(err);
      })
})


app.get("/userbyname/:name/stats", (req, res) => {
    const name = req.params.name


        CompleteGame.find().or([{ playerOne: name }, { playerTwo: name }]).sort({ endTime: 'ascending' }).exec().then((games) => {

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
              if (games[i].winner === name) {
                winStreak[games[i].game] += 1
                winStreak["Overall"] += 1
                winCount[games[i].game] += 1
              } else {
                winStreak[games[i].game] = 0
                winStreak["Overall"] = 0
              }
              gamesPlayed[games[i].game] += 1
              timePlayed[games[i].game] += Math.round((new Date(games[i].endTime).getTime() - new Date(games[i].startTime).getTime()))
              winPercent[games[i].game].push(winCount[games[i].game] / gamesPlayed[games[i].game])
              i++;
            }

            winPercent["Tic-Tac-Toe"] = winPercent["Tic-Tac-Toe"].slice(0, WIN_PERCENT_POINTS)
            winPercent["Checkers"] = winPercent["Checkers"].slice(0, WIN_PERCENT_POINTS)

            res.send({ username: name, timePlayed, gamesPlayed, winStreak, winPercent })
          }).catch((err) => {
            console.log(err)
            res.status(500).send(err);
      })

})


app.get('/currentuser/info', (req, res) => {

  // TODO: get the currently logged in user's id
  const id = req.session.user;

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}

	User.findById(id).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			res.send(user)
		}
	}).catch((error) => {
		res.status(500).send()
	})

})

app.get("/currentuser/winner", (req, res) => {
  const id = req.session.user;

  User.findById(id)
    .then(function (user) {
      CompleteGame.find({ winner: user.username })
        .sort({ endTime: 'ascending' })
        .populate('userOne')
        .populate('userTwo')
        .exec((err, games) => {
          const idLabelled = games.map(g => { return ({...g._doc, opponentId: g.playerOne === user.username ? g.userTwo._id : g.userOne._id }); })
          const opponentMap = {}
          idLabelled.forEach(elem => {
            if (!(elem.opponentId in opponentMap) || new Date(elem.endTime) > new Date(opponentMap[elem.opponentId].endTime)){
              opponentMap[elem.opponentId] = elem;
            }
          })
          const opponentList = []
          for (let key in opponentMap) {
            opponentList.push(opponentMap[key])
          }
          res.send(opponentList.sort(function(a, b) {
            return new Date(b.endTime) - new Date(a.endTime);
          }))
        })
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})

/*  GAMEPLAY ENDPOINTS  */

app.get("/getopponent/:game", (req, res) => {
  const game = req.params.game
  CurrentGame.findOne({game: game, startOfLastTurn: ""})
    .then(function (currentgame) {
      if (!currentgame) {
        res.status(404).send();
      } else {
        res.send(currentgame);
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post('/currentgame', (req, res) => {
  const currentgame = new CurrentGame({
    "startTime": Date.now(),
    "playerOne": req.body.playerOne,
    "playerOneImage": req.body.playerOneImage,
    "playerTwo": "",
    "playerTwoImage": "",
    "turn": "x",
    "startOfLastTurn": "",
    "game": req.body.game,
    "moves":
      { "lastmove": "empty", "top-left-ttt": "empty", "top-center-ttt": "empty", "top-right-ttt": "empty", "middle-left-ttt": "empty", "middle-center-ttt": "empty", "middle-right-ttt": "empty", "bottom-left-ttt": "empty", "bottom-center-ttt": "empty", "bottom-right-ttt": "empty" }
  })

  currentgame.save().then((currentgame) => {
    res.send(currentgame)
  }).catch((error) => {
    res.status(400).send(error)
  })
})

app.post('/completegame', (req, res) => {
  const completegame = new CompleteGame({
    "_id": req.body._id,
    "startTime":  moment(req.body.startTime).format('YYYY-MM-DDTHH:mm:ss'),
    "endTime":  moment().format('YYYY-MM-DDTHH:mm:ss'),
    "playerOne": req.body.playerOne,
    "playerTwo": req.body.playerTwo,
    "winner": req.body.winner,
    "game": req.body.game
  })
  completegame.save().then((completegame) => {
    console.log(completegame)
    res.send(completegame)
  }).catch((error) => {
    res.status(400).send(error)
    log(error)
  });

});

app.delete('/currentgame/:id', (req, res) => {
	// Add code here
	const id = req.params.id
  console.log(id)
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}
  CurrentGame.findByIdAndRemove(id, function(error) {
      if (error) {
          res.status(400).send(error);
      } else {
          res.send(id);
      }
  });

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
    res.status(500).send(error)
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
      }).catch((error) => {
        res.status(400).send(error)
      })
    }
  }).catch((error) => {
    res.status(500).send(error)
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
