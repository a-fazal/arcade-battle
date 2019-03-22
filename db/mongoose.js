const mongoose = require('mongoose')
require('dotenv').config()

// connect to our database
mongoose.connect('mongodb+srv://' + process.env.MONGODB_USER + ':' + process.env.MONGODB_PW + '@arcadebattle-cluster-bivpz.mongodb.net/arcade_battle?retryWrites=true', { useNewUrlParser: true, dbName: 'arcade_battle'});


module.exports = { mongoose }
