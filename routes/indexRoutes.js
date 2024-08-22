const { Router } = require("express")
const { handleHomePage, handleSignupPage, handleLoginPage, handleAddBlogPage } = require("../controllers/indexController")
const userRoute = require("./userRoute")
const blogRoute = require("./blogRoute")
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
router.use("/blogs", blogRoute)

router.get("/", handleHomePage)
router.get("/signup", handleSignupPage)
router.get("/login", handleLoginPage)
router.get("/add-blog", handleAddBlogPage)

module.exports = router