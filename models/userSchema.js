const mongoose = require('mongoose');
const { hashPassword, comparePassword } = require("../utils/hashing")
const { setTokenForUser } = require("../utils/authService")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: "/assets/user_default.webp"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, {timestamps:true})

userSchema.pre("save", function (next) {
    const user = this;
    if(!user.isModified("password")) return;
    this.password = hashPassword(user.password)
    next()
})

userSchema.static("validateLoginAndGenerateToken", async function (email, password) {
    const user = await this.findOne({ email })
    if(!user) throw new Error("User not found!")
    if(!comparePassword(password, user.password)) throw new Error("Password is incorrect!")
    return setTokenForUser(user, "2h")
})

const User = mongoose.model("user", userSchema)

module.exports = User