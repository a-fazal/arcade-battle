/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt');
const saltRounds = 10;

// making a model a little differently
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 4
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
}, { collection: 'User' });

UserSchema.statics.findByUsernamePassword = function (username, password) {
	const User = this;
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject();
		}

		 
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (error, result) => {
				if (result) {

					resolve(user);
				} else {

					reject();
				}
			});
		});
		
	});
}


UserSchema.pre('save', function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds,
      function(err, hashedPassword) {
      if (err) {
        next(err);
      }
      else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});


const User = mongoose.model('User', UserSchema)

module.exports = { User }
