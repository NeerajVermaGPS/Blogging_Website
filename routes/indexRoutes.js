const { Router } = require("express")
const { handleSignupPage, handleLoginPage } = require("../controllers/indexController")
const userRoute = require("./userRoute")
const { connectToMongo } = require("../config/db")
const dotenv = require('dotenv');
dotenv.config()

const router = Router()

connectToMongo(process.env.MONGO_URI)
  .then((res) => {
    console.log("Connected to databse")
  })
  .catch((err) => {
    console.log(err.message)
  })

router.use("/user", userRoute)

router.get("/", (req, res) => {
    return res.render("home", {
        user: null
    })
})
router.get("/signup", handleSignupPage)
router.get("/login", handleLoginPage)

module.exports = router