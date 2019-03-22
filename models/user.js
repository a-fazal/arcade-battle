/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')

// making a model a little differently
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 8
	},
	role: {
		type: String,
		required: true,
	},
	uri: {
		type: String,
		required: true,
	},
	isBanned: {
		type: Boolean,
		required: true,
	},
	isPending: {
		type: Boolean,
		required: true,
	},
}, { collection : 'User' });

const User = mongoose.model('User', UserSchema)

module.exports = { User }
