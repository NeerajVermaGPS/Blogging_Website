const { Router } = require("express")
const { handleAddBlog } = require("../controllers/blogController")
const { checkSchema } = require("express-validator")
const { addBlogSchema } = require("../validators/blogValidator")

const router = Router()

router.post("/addblog", checkSchema(addBlogSchema), handleAddBlog)

module.exports = router