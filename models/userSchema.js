const mongoose = require('mongoose');
const { hashPassword } = require("../utils/hashing")

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
        default: "/assets/user_default.png"
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

const User = mongoose.model("User", userSchema)

module.exports = User