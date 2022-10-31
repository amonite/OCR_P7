const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postCtrl = require("../controllers/post");

router.post("/", auth, multer, postCtrl.createPost);

router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.put("/:id/like", auth, postCtrl.likePost);

router.delete("/:id", auth, postCtrl.deletePost);




module.exports = router;