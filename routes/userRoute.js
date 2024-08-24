const { Router } = require('express');
const { checkSchema } = require("express-validator")
const { userSignupValidator, userLoginValidator } = require("../validators/userValidator")
const { handleUserSignup, handleUserLogin, handleUserLogout, handleUserLoginSuccess } = require("../controllers/userController")
const multer = require('multer');
const path = require('path');

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
      const extensionArray = file.originalname.split(".")
      const fileName = `pp_${Date.now()}${parseInt(Math.random()*100000)}.${extensionArray[extensionArray.length - 1]}`
      cb(null, fileName)
    }
})
  
const upload = multer({ storage: storage })

router.post("/signup", upload.single("profileImage"), checkSchema(userSignupValidator), handleUserSignup)
router.post("/login", checkSchema(userLoginValidator), handleUserLogin)
router.get("/logout", handleUserLogout)
router.get("/login-success", handleUserLoginSuccess)

module.exports = router