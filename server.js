/* server.js - mar13 - 10am - mongoose*/
'use strict'
const log = console.log

const express = require('express')
const port = process.env.PORT || 5000
const bodyParser = require('body-parser') // middleware for parsing HTTP body
const { ObjectID } = require('mongodb')

// const { mongoose } = require('./db/mongoose')


const app = express();
app.use(bodyParser.json())


app.get('/test', (req, res) => {
  res.send({ testMessage: 'testing' });
});



app.listen(port, () => {
	log(`Listening on port ${port}...`)
})
