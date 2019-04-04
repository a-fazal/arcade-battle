/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')

const MovesSchema = new mongoose.Schema({
  'top-left-ttt': {
		type: String,
	},
  'top-center-ttt': {
		type: String,
	},
  'top-right-ttt': {
		type: String,
	},
  'middle-left-ttt': {
		type: String,
	},
  'middle-center-ttt': {
		type: String,
	},
  'middle-right-ttt': {
		type: String,
	},
  'bottom-left-ttt': {
		type: String,
	},
  'bottom-center-ttt': {
		type: String,
	},
  'bottom-right-ttt': {
		type: String,
	},
});

// making a model a little differently
const CurrentGameSchema = new mongoose.Schema({
	startTime: {
    type: Date,
    default: Date.now
	},
	playerOne: {
		type: String,
	},
	playerTwo: {
		type: String,
	},
	turn: {
		type: String,
	},
	startOfLastTurn: {
    type: Date,
    default: Date.now
	},
  game: {
    type: String,
	},
  moves: MovesSchema
}, { collection : 'CurrentGame' });

const CurrentGame = mongoose.model('CurrentGame', CurrentGameSchema)

module.exports = { CurrentGame }
