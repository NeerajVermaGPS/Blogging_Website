const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS)
    return bcrypt.hashSync(password, salt)
}

const comparePassword = (plain, hashed) => {
    return bcrypt.compareSync(plain, hashed)
}

module.exports = {
    hashPassword,
    comparePassword
}