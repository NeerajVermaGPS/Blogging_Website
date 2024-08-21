const { validationResult, matchedData } = require("express-validator")
const Blog = require("../models/blogSchema")

const handleAddBlog = async (req, res) => {
    const result = validationResult(req)
    const errors = result.errors.map(error => error.msg)
    const {body, title} = req.body
    if (result.isEmpty()) {
        data = matchedData(req)
        try {
            const sentData = await Blog.create({...data, createdBy: req.user._id})
            res.json(sentData)
        } catch (error) {
            return res.render("add-blog", {
                error: "Internal server error!",
                blog_body: data.body,
                blog_title: data.title
            })
        }
    }
    return res.render("add-blog", {
        error: errors[0],
        blog_body: body,
        blog_title: title
    })
}

module.exports = {
    handleAddBlog
}