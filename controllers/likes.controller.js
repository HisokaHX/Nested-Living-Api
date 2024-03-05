const { StatusCodes } = require('http-status-codes');
const Like = require('../models/Like.model');

module.exports.toggleLike = (req, res, next) => {
    // userId no ahcew falta pasarlo en body o en params, por que es req.currentUserId
    const { houseId } = req.params; 


    Like.findOne({houseId})
        .then(like => {
            if (like) {
                Like.findByIdAndDelete(like.id)
                    .then(() => res.status(StatusCodes.NO_CONTENT).json({ message: 'Like removed' }))
            } else {
                Like.create({ houseId, userId: req.currentUserId, likingUser: req.currentUserId})
                    .then(like => res.status(StatusCodes.CREATED).json(like))
            }
        }
        )
        .catch(next)
} 
                       