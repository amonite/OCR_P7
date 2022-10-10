const express = require("express");

const router = express.Router();
//const Post = require('../models/Post');

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postCtrl = require("../controllers/post");

router.post("/", auth, multer, postCtrl.createPost);
//router.post("/:id/like", auth, postCtrl.likePost);

router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.put("/:id/like", auth, postCtrl.likePost);

router.delete("/:id", auth, postCtrl.deletePost);


// router.post("/", (req, res, next) =>{
//     const post = new Post({
//         posterId: req.body.posterId, 
//         message: req.body.message,
//         // likes: 0,
//         // usersLiked: [] 
//     });
//     post.save()
//         .then(()=> res.status(201).json({message: "post created successfuly :)"}))
//         .catch(error => res.status(400).json({error}));
// })


module.exports = router;