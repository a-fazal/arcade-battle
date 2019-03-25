/* server.js - mar13 - 10am - mongoose*/
'use strict'
const log = console.log

const express = require('express')
const path = require("path")
const port = process.env.PORT || 5000
const bodyParser = require('body-parser') // middleware for parsing HTTP body
const { ObjectID } = require('mongodb')

const { mongoose } = require('./db/mongoose')

const { User } = require('./models/user')


const app = express();
app.use(bodyParser.json())

//
// app.get('/test', (req, res) => {
//   res.send({ testMessage: 'testing' });
// });


app.get('/allusers', (req, res) => {
  User.find({}).select({ "password": 0}).then(function (users) {
    if (!users) {
			res.status(404).send()
		} else {
    res.send(users);
  }
}).catch((error) => {
  res.status(500).send()
})
});

// Deploying to Heroku, followed parts from
// tutorial https://coursework.vschool.io/deploying-mern-with-heroku/
app.use(express.static(path.join(__dirname, "client", "build")));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.listen(port, () => {
	log(`Listening on port ${port}...`)
})
