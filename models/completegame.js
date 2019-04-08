/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')

// making a model a little differently
const CompleteGameSchema = new mongoose.Schema({
	startTime: {
		type: String,
	},
    endTime: {
        type: String,
    },
	playerOne: {
		type: String,
	},
	playerTwo: {
		type: String,
	},
	winner: {
		type: String,
	},
    game: {
        type: String,
	}
}, { collection : 'CompleteGame', toObject: {virtuals:true}, toJSON: {virtuals:true} });


CompleteGameSchema.virtual('userOne', {
  ref: 'User',
  localField: 'playerOne',
  foreignField: 'username',
  justOne: true // for many-to-1 relationships
});

CompleteGameSchema.virtual('userTwo', {
  ref: 'User',
  localField: 'playerTwo',
  foreignField: 'username',
  justOne: true // for many-to-1 relationships
});

const CompleteGame = mongoose.model('CompleteGame', CompleteGameSchema)

module.exports = { CompleteGame }
