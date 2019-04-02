'use strict';

const INIT_USERS = [
    new User({
        username: "user",
        password: "user",
        role: "user",
        URI: "",
        isBanned: false,
        isPending: false
    }),

    new User({
        username: "user2",
        password: "user2",
        role: "user",
        URI: "",
        isBanned: false,
        isPending: false
    }),

    new User({
        username: "admin",
        password: "admin",
        role: "admin",
        URI: "",
        isBanned: false,
        isPending: false
    }),

    new User({
        username: "userpending",
        password: "userpending",
        role: "user",
        URI: "",
        isBanned: false,
        isPending: true
    }),

    new User({
        username: "userbanned",
        password: "userbanned",
        role: "user",
        URI: "",
        isBanned: true,
        isPending: false
    })
]

module.exports = { INIT_USERS }