const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true,
        isLength: {
            options: {
                max: 400
            }
        }
    },
    postedAt: {
        type: String,
        default: new Date().toLocaleDateString()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog"
    }
}, {timestamps: true})

const Comment = mongoose.model("comment", commentSchema)

module.exports = Comment