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

module.exports = {
    checkUserForAuthentication
}