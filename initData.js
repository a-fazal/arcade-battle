'use strict';

const { User } = require("./models/user");
const { CurrentGame } = require("./models/currentgame");

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

module.exports = { INIT_USERS }