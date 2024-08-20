const handleSignupPage = (req, res) => res.render("signup", {
    error: null
})
const handleLoginPage = (req, res) => res.render("login", {
    error: "done"
})

module.exports = {
    handleSignupPage,
    handleLoginPage
}