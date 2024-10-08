const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    postedAt: {
        type: String,
        default: new Date().toLocaleDateString()
    }
}, {timestamps: true})

const Blog = mongoose.model("blog", blogSchema)

module.exports = Blog