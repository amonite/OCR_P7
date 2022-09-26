const express = require("express");

const router = express.Router();
//const Post = require('../models/Post');

const auth = require("../middleware/auth");
const postCtrl = require("../controllers/post");

router.post("/", postCtrl.createPost);
router.post("/:id/like", postCtrl.likePost);

router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("/:id", auth, postCtrl.updatePost);
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