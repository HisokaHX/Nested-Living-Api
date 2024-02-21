const House = require("../models/House.model");
const { statusCodes, StatusCodes } = require("http-status-codes");

module.exports.createHouse = ( req, res, next) => {
    House.create(req.body)
    .then(createdHouse => {
        res.status(StatusCodes.CREATED).json(createdHouse)
    })
    .catch(next)
}