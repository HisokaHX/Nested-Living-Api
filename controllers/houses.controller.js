const House = require("../models/House.model");
const { StatusCodes } = require("http-status-codes");
const Like = require("../models/Like.model");

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

module.exports.getMyHouses = (req, res, next) => {
House.find({ owner: req.currentUserId })
.then((houses) => {
    res.status(StatusCodes.OK).json(houses)
})
.catch(next)
}

module.exports.getHouseDetail = (req, res, next) => {
House.findById(req.params.id)
.then((house) => {
    if (!house) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'House not found' });
    }
    res.status(StatusCodes.OK).json(house);
})
.catch(next)
}