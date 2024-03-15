const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const User = require("../models/User.model");


const createAdmin = () => {
    const admin = new User({
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: "admin"
    });

    return admin.save();
}

module.exports.dashboard = (req, res, next) => {
    User.exists({ role: "admin" })
    .then(adminExists => {
        if (!adminExists) {
            return createAdmin();
        }
    }
    )
    .then(() => {
        res.status(StatusCodes.OK).json({ message: "Welcome to the admin dashboard" });
    })
    .catch(next);
}

module.exports.getUsers = (req, res, next) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(next);
}

            