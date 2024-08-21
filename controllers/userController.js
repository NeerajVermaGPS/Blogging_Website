const { validationResult, matchedData } = require("express-validator")
const User = require("../models/userSchema")

const handleUserSignup = async (req, res) => {
    const result = validationResult(req)
    const errors = result.errors.map(error => error.msg)
    if (result.isEmpty()) {
        const data = matchedData(req)
        try {
            await User.create(data)
        } catch (error) {
            return res.render("signup", {
                error: error.name === "MongooseError" ? "Internal server error!" : "Email already exists!"
            })
        }
    }
    return res.render("signup", {
        error: errors[0]
    })
}
const handleUserLogin = async (req, res) => {
    const result = validationResult(req)
    const errors = result.errors.map(error => error.msg)
    if(result.isEmpty()) {
        const data = matchedData(req)
        try {
            const token = await User.validateLoginAndGenerateToken(data.email, data.password)
            return res.cookie("token", token).redirect("/")
        } catch (error) {
            return res.render("login", {
                error: error.message
            })
        }
    }
    return res.render("login", {
        error: errors[0]
    })
}

const handleUserLogout = (req, res) => {
    res.clearCookie("token").redirect("/")
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout
}