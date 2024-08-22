const { getUserFromToken } = require("../utils/authService")

const checkUserForAuthentication = (cookieName) => {
    return (req, res, next) => {
        const cookieValue = req.cookies[cookieName]
        if(!cookieValue) {
            req.user = null
        }

        try {
            req.user = getUserFromToken(cookieValue)
        } catch(e) {}

        next()
    }
}

const checkUserForAuthorization = (userType = [], renderPage) => {
    return (req, res, next) => {
        const {user} = req;
        if(!user) {
            return res.redirect("/login")
        }
        if(!userType.includes(user.role)) {
            return res.render(renderPage, {
                blog_body: req.body ? req.body.body : null,
                blog_title: req.body ? req.body.title : null,
                user: user.name,
                error: "You are not authorized to access this page!"
            })
        }
        next()
    }
}

module.exports = {
    checkUserForAuthentication,
    checkUserForAuthorization
}