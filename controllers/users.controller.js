const User = require("../models/User.model");
const { StatusCodes } = require('http-status-codes');

module.exports.create = (req, res, next) => {
    const userToCreate = {
        ...req.body
    }

    User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }]})
    .then(user => {
        if (user) {
            next(createError(StatusCodes.BAD_REQUEST, 'Username or email already in use'));
        } else {
            return User.create(userToCreate)
            .then(userCreated => {
                res.status(StatusCodes.CREATED).json(userCreated)
            })
        }
    })
    .catch(next)
}
