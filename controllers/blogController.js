const { validationResult, matchedData } = require("express-validator")
const Blog = require("../models/blogSchema")
const User = require("../models/userSchema")

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
            res.json(sentData)
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
    const blog = await Blog.findOne({_id: id})
    if(!blog) {
        return res.redirect("/")
    }
    const user = await User.findOne({_id: blog.createdBy})
    return res.render("show-blog", {
        user: req.user ? req.user.name : null,
        error: null,
        blog_title: blog.title,
        blog_body: blog.body,
        blog_cover: blog.coverImage,
        blog_author: user.name,
        blog_date: blog.postedAt
    })
}

module.exports = {
    handleAddBlog,
    openBlogWithId
}