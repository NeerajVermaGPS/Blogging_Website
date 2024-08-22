const Blog = require("../models/blogSchema")
const User = require("../models/userSchema")

const handleHomePage = async (req, res) => {
    const rawBlogs = await Blog.find({})
    if(rawBlogs.length === 0) {
        return res.render("home", {
            user: req.user ? req.user.name : null
        })
    }
    const users = await User.find({})
    let blogs = rawBlogs.map((e,i)=>{
        let temp = users.find(element => String(element._id) === String(e.createdBy))
        if(temp) {
          e.author = temp.name;
        }
        return e;
    })
    return res.render("home", {
        user: req.user ? req.user.name : null,
        blogs: blogs
    })
}
const handleSignupPage = (req, res) => {
    res.render("signup", {
    error: null
})}
const handleLoginPage = (req, res) => {
    res.render("login", {
    error: null
})}
const handleAddBlogPage = (req, res) => {
    res.render("add-blog", {
    user: req.user ? req.user.name : null,
    error: null
})}

module.exports = {
    handleHomePage,
    handleSignupPage,
    handleLoginPage, 
    handleAddBlogPage
}