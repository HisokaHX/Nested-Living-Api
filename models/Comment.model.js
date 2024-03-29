const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const commentSchema = new Schema(
    {
        writer: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: 'House'
        },
        date: {
            type: Date,
            default: Date.now
        },
        text: {
            type: String,
            requiered: true,
            maxLength: 250
        },
    },
    {
        timestamps: true,
    }
);
const Comment = model("Comment", commentSchema);
module.exports = Comment;