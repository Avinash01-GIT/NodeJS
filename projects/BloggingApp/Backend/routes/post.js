const express = require("express");
const postController = require("../controller/post");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, postController.createPost);
router.get("/list", postController.listPost);
router.put("/update/:id", authMiddleware, postController.updatePost);
router.delete("/delete/:id", authMiddleware, postController.deletePost);


module.exports = router;
