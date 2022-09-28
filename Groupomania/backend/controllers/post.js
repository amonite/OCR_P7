const Post = require("../models/Post");
//const { post } = require("../routes/post");

exports.createPost = (req, res, next) =>{

    const post = new Post({
        //posterId: req.body.posterId,
        message: req.body.message,
        userId: req.auth.userId
        // likes: 0,
        // usersLiked: [] 
    });

    // const postObject = JSON.parse(req.body.post);
    // delete postObject._id;
    // delete postObject._userId;

    // const post = new Post(
    //     {
    //         ...postObject,
    //         userId:req.auth.userId
        
    //     }
    // );

    post.save()
        .then(()=> res.status(201).json({message: "post created successfuly :)"}))
        .catch(error => res.status(400).json({error}));

};

exports.updatePost = (req, res, next) =>{
    
    // const post = {...req.body};
    
    // Post.updateOne({_id:req.params.id}, post)
    //     .then(
    //         () => res.status(200).json({message: "post updated successfuly :)"})
    //     )
    //     .catch(error => res.status(400).json({error:error}));

    const postObject = {...req.body};
    delete postObject._userId;
    Post.findOne({_id:req.params.id})
        .then((post)=>{
            if(post._userId !== req.auth.userId){
                res.status(401).json({message:"not authorized ...:/"});
            }
            else{
                Post.updateOne({_id:req.params.id}, {...postObject, _id:req.params.id})
                    .then(()=>{res.status(200).json({message: "post updated sucessfuly :)"});})
                    .catch(error =>{res.status(400).json({error:error})})
            }
        })
        .catch(error => res.status(400).json({error}));
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