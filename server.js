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

const { INIT_USERS } = require('./initData');

const app = express();
app.use(bodyParser.json());

//
// app.get('/test', (req, res) => {
//   res.send({ testMessage: 'testing' });
// });


// Delete all model objects
// add test data to the database
app.post('/resetdata', (req, res) => {
  User.deleteMany()
    .then(function () {
      INIT_USERS.forEach((u) => {u.save()})
    })
  CurrentGame.deleteMany()
  res.status(200).send();
})

/*  USER ENDPOINTS  */

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
    .catch(error => {
      res.status(500).send();
    });
});

app.post("/acceptuser/:id"), (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    res.status(404).send()
  }
  User.findByIdAndUpdate(
    id,
    {isPending: false},
    (err, user) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.send(user);
      }
    }
  )
}

app.post("/banuser/:id"), (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    res.status(404).send()
  }
  User.findByIdAndUpdate(
    id,
    {isBanned: true},
    (err, user) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.send(user);
      }
    }
  )
}

app.post("/reinstateuser/:id"), (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    res.status(404).send()
  }
  User.findByIdAndUpdate(
    id,
    {isBanned: false},
    (err, user) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.send(user);
      }
    }
  )
}

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
