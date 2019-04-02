'use strict';

const { User } = require("./models/user");
const { CurrentGame } = require("./models/currentgame");
const { CompleteGame } = require("./models/completegame");

const INIT_USERS = [
    new User({
        username: "user",
        password: "user",
        role: "user",
        uri: "pic-URL",
        isBanned: false,
        isPending: false
    }),

    new User({
        username: "user2",
        password: "user2",
        role: "user",
        uri: "pic-URL",
        isBanned: false,
        isPending: false
    }),

    new User({
        username: "admin",
        password: "admin",
        role: "admin",
        uri: "pic-URL",
        isBanned: false,
        isPending: false
    }),

    new User({
        username: "userpending",
        password: "userpending",
        role: "user",
        uri: "pic-URL",
        isBanned: false,
        isPending: true
    }),

    new User({
        username: "userbanned",
        password: "userbanned",
        role: "user",
        uri: "pic-URL",
        isBanned: true,
        isPending: false
    })
]

const INIT_GAMES = [
    new CompleteGame({
        startTime: "2016-01-24T18:21:55.000+00:00",
        endTime: "2016-01-24T21:21:55.000+00:00",
        playerOne: "user",
        playerTwo: "user2",
        winner: "user",
        game: "Tic-Tac-Toe"
    }),
    new CompleteGame({
        startTime: "2016-01-25T18:21:55.000+00:00",
        endTime: "2016-01-25T21:21:55.000+00:00",
        playerOne: "user2",
        playerTwo: "user",
        winner: "user",
        game: "Tic-Tac-Toe"
    }),
    new CompleteGame({
        startTime: "2016-01-26T18:21:55.000+00:00",
        endTime: "2016-01-26T21:21:55.000+00:00",
        playerOne: "user",
        playerTwo: "user2",
        winner: "user",
        game: "Tic-Tac-Toe"
    }),
    new CompleteGame({
        startTime: "2016-01-27T18:21:55.000+00:00",
        endTime: "2016-01-27T21:21:55.000+00:00",
        playerOne: "user2",
        playerTwo: "user",
        winner: "user2",
        game: "Tic-Tac-Toe"
    }),
    new CompleteGame({
        startTime: "2016-01-28T18:21:55.000+00:00",
        endTime: "2016-01-28T21:21:55.000+00:00",
        playerOne: "user",
        playerTwo: "user2",
        winner: "user",
        game: "Tic-Tac-Toe"
    }),


    new CompleteGame({
        startTime: "2016-01-24T18:21:55.000+00:00",
        endTime: "2016-01-24T21:21:55.000+00:00",
        playerOne: "user",
        playerTwo: "user2",
        winner: "user2",
        game: "Checkers"
    }),
    new CompleteGame({
        startTime: "2016-01-25T18:21:55.000+00:00",
        endTime: "2016-01-25T21:21:55.000+00:00",
        playerOne: "user2",
        playerTwo: "user",
        winner: "user",
        game: "Checkers"
    }),
    new CompleteGame({
        startTime: "2016-01-26T18:21:55.000+00:00",
        endTime: "2016-01-26T21:21:55.000+00:00",
        playerOne: "user",
        playerTwo: "user2",
        winner: "user2",
        game: "Checkers"
    }),
    new CompleteGame({
        startTime: "2016-01-27T18:21:55.000+00:00",
        endTime: "2016-01-27T21:21:55.000+00:00",
        playerOne: "user2",
        playerTwo: "user",
        winner: "user",
        game: "Checkers"
    }),
    new CompleteGame({
        startTime: "2016-01-28T18:21:55.000+00:00",
        endTime: "2016-01-28T21:21:55.000+00:00",
        playerOne: "user",
        playerTwo: "user2",
        winner: "user2",
        game: "Checkers"
    })
]

module.exports = { INIT_USERS, INIT_GAMES }