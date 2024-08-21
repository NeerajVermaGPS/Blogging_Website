const { Router } = require('express');
const { checkSchema } = require("express-validator")
const { userSignupValidator, userLoginValidator } = require("../validators/userValidator")
const { handleUserSignup, handleUserLogin, handleUserLogout } = require("../controllers/userController")

const router = Router()

router.post("/signup", checkSchema(userSignupValidator), handleUserSignup)
router.post("/login", checkSchema(userLoginValidator), handleUserLogin)
router.get("/logout", handleUserLogout)

module.exports = router