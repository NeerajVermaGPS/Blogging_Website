const { Router } = require("express")
const { handleAddBlog, openBlogWithId, handlePostComment } = require("../controllers/blogController")
const { checkSchema } = require("express-validator")
const { addBlogSchema } = require("../validators/blogValidator")
const { commentSchema } = require("../validators/commentValidator")
const { checkUserForAuthorization } = require("../middlewares/authMiddleware")
const { imageUpload } = require("../middlewares/image_upload")
const multer = require('multer');
const path = require('path');

const router = Router()

const upload = multer({ dest: `uploads/`});

router.post("/addblog", checkUserForAuthorization(["USER", "ADMIN"], "add-blog"), upload.single("coverImage"), imageUpload(), checkSchema(addBlogSchema), handleAddBlog)
router.get("/:id", openBlogWithId)
router.post("/comments/:id", checkUserForAuthorization(["USER", "ADMIN"], "add-blog"), checkSchema(commentSchema), handlePostComment)

module.exports = router