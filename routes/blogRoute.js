const { Router } = require("express")
const { handleAddBlog, openBlogWithId } = require("../controllers/blogController")
const { checkSchema } = require("express-validator")
const { addBlogSchema } = require("../validators/blogValidator")
const { checkUserForAuthorization } = require("../middlewares/authMiddleware")
const multer = require('multer');
const path = require('path');

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}${req.user._id}.${file.originalname.split(".")[1]}`
      cb(null, fileName)
    }
})
  
const upload = multer({ storage: storage })

router.post("/addblog", checkUserForAuthorization(["USER", "ADMIN"], "add-blog"), upload.single("coverImage"), checkSchema(addBlogSchema), handleAddBlog)
router.get("/:id", openBlogWithId)

module.exports = router