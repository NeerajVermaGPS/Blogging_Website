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
    user: req.user,
    error: null
})}

module.exports = {
    handleSignupPage,
    handleLoginPage, 
    handleAddBlogPage
}