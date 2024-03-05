const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    houseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House',
        required: true
    },
    likingUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret.__v;
            delete ret._id;
        }
    }
}
);

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
