const { Router } = require('express');
const { checkSchema } = require("express-validator")
const { userSignupValidator, userLoginValidator } = require("../validators/userValidator")
const { handleUserSignup, handleUserLogin, handleUserLogout, handleUserLoginSuccess } = require("../controllers/userController")
const multer = require('multer');
const { imageUpload } = require("../middlewares/image_upload")
const path = require('path');

const router = Router()

const upload = multer({ dest: `uploads/`});

router.post("/signup", upload.single("profileImage"), imageUpload("pp_"), checkSchema(userSignupValidator), handleUserSignup)
router.post("/login", checkSchema(userLoginValidator), handleUserLogin)
router.get("/logout", handleUserLogout)
router.get("/login-success", handleUserLoginSuccess)

module.exports = router