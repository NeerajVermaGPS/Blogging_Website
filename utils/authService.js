const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');
dotenv.config()

const secret = process.env.JWT_SECRET

const setTokenForUser = (user, expireTime) => {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role
    }

    return jwt.sign(payload, secret,  { expiresIn: expireTime })
}

const getUserFromToken = (token) => jwt.verify(token, secret)

module.exports = {
    setTokenForUser,
    getUserFromToken
}