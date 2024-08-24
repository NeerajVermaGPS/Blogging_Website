const { validationResult, matchedData } = require("express-validator")
const Blog = require("../models/blogSchema")
const Comment = require("../models/commentSchema")

const handleAddBlog = async (req, res) => {
    const result = validationResult(req)
    const errors = result.errors.map(error => error.msg)
    const {body, title} = req.body
    if (result.isEmpty()) {
        data = matchedData(req)
        try {
            let coverImage;
            try {
                coverImage = `/uploads/${req.file.filename}`
            } catch (error) {
                coverImage = "/assets/blog_bg.jpg"
            }
            const sentData = await Blog.create({...data, coverImage: coverImage, createdBy: req.user._id})
            return res.redirect(`/blogs/${sentData._id}`)
        } catch (error) {
            console.log(error)
            return res.render("add-blog", {
                error: "Internal server error!",
                user: req.user ? req.user.name : null,
                blog_body: data.body,
                blog_title: data.title
            })
        }
    }
    return res.render("add-blog", {
        error: errors[0],
        user: req.user ? req.user.name : null,
        blog_body: body,
        blog_title: title
    })
}

const openBlogWithId = async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findOne({_id: id}).populate("createdBy")
    if(!blog) {
        return res.redirect("/")
    }
    const commentData = await Comment.find({blog: id}).populate("user")
    return res.render("show-blog", {
        user: req.user ? req.user.name : null,
        error: null,
        blog_id: id,
        blog_title: blog.title,
        blog_body: blog.body,
        blog_cover: blog.coverImage,
        blog_author: blog.createdBy.name,
        blog_date: blog.postedAt,
        author_image: blog.createdBy.profileImage,
        comments: commentData
    })
}

const handlePostComment = async (req, res) => {
    const result = validationResult(req)
    const errors = result.errors.map(error => error.msg)
    const {id} = req.params
    if (result.isEmpty()) {
        const rawData = matchedData(req)
        try {
            const data = {
                comment: rawData.comment,
                user: req.user._id,
                blog: rawData.id
            }
            const createdComment = await Comment.create(data)
            return res.redirect(`/blogs/${rawData.id}`)
        } catch (error) {
            return res.redirect(`/blogs/${rawData.id}`)
        }
    }
    return res.redirect(`/blogs/${id}`)
}

module.exports = {
    handleAddBlog,
    openBlogWithId,
    handlePostComment
}