const Post = require("../models/Post");

exports.createPost = (req, res, next) =>{
    const post = new Post({
        posterId: req.body.posterId,
        message: req.body.message,
        // likes: 0,
        // usersLiked: [] 
    });
    post.save()
        .then(()=> res.status(201).json({message: "post created successfuly :)"}))
        .catch(error => res.status(400).json({error}));

};

exports.updatePost = (req, res, next) =>{
    const post = new Post(
        {
            _id: req.params.id,
            posterId: req.params.id,
            message: req.body.message

        }
    );
    Post.updateOne({_id:req.params.id}, post)
        .then(
            () => res.status(200).json({message: "post updated successfuly :)"})
        )
        .catch(error => res.status(400).json({error:error}));
};

exports.deletePost = (req, res, next) =>{
    Post.deleteOne({_id: req.params.id}).then(
        () =>{
            res.status(200).json({message: "post deleted !"});
        }
    )
    .catch( error => res.status(400).json({error: error}));
};

exports.getAllPosts = (req, res, next) =>{
    Post.find().then(
        (posts) =>{
            res.status(200).json(posts);
        }
    )
    .catch(error => res.status(400).json({error:error}));
};

exports.getOnePost = (req, res, next) =>{
    Post.findOne({
        _id: req.params.id
    }).then(
        (post) => {res.status(200).json(post);}
    ).catch(
        (error) => {res.status(404).json({error: error});}
    )
};

exports.likePost = (req, res, next) =>{

};