const House = require("../models/House.model");
const { statusCodes, StatusCodes } = require("http-status-codes");

module.exports.createHouse = ( req, res, next) => {
    const images = req.files ? req.files.map(file => file.path) : [];
    House.create({...req.body, owner: req.currentUserId, images})
    .then(createdHouse => {
        res.status(StatusCodes.CREATED).json(createdHouse)
    })
    .catch(next)
}

module.exports.getHouse = (req, res, next) => {
House.find()
.then((houses) => {
    res.status(StatusCodes.OK).json(houses)
})
.catch(next)
}