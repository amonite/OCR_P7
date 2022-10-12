const Post = require("../models/Post");
const fs = require('fs');

exports.createPost = (req, res, next) =>{
    const postObject = req.file ? {
        
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...JSON.parse(req.body.post)}//{ ...req.body};
    // const recbody = {...req.body}
    // const recpost = {...recbody.post};
    // console.log("reqbody =", recbody);
    // console.log("reqpost = ",recpost.message);
    if(typeof postObject.imageUrl !== 'undefined'){
        console.log("postObj.imageUrl = ",postObject.imageUrl);
        delete postObject._id;
        delete postObject.userId;
        
        const post = new Post({
        
            ...postObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            // likes: 0,
            // usersLiked: [] 
        });
        
        post.save()
            .then(()=> res.status(201).json({message: "post created successfuly :)"}))
            .catch(error => res.status(400).json({error}));
    
    }
    else{
        console.log(31);
        delete postObject._id;
        delete postObject.userId;
        
        const post = new Post({
        
            ...postObject,
            userId: req.auth.userId,
            imageUrl: ""
            // likes: 0,
            // usersLiked: [] 
        });
        
        post.save()
            .then(()=> res.status(201).json({message: "post created successfuly :)"}))
            .catch(error => res.status(400).json({error}));
    }

};

exports.updatePost = (req, res, next) =>{
    
    // const post = {...req.body};
    
    // Post.updateOne({_id:req.params.id}, post)
    //     .then(
    //         () => res.status(200).json({message: "post updated successfuly :)"})
    //     )
    //     .catch(error => res.status(400).json({error:error}));


    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...JSON.parse(req.body.post)};//{ ...req.body};

    //const postObject = {...req.body};
    console.log("postObject = ", postObject);

    delete postObject._userId;
    Post.findOne({_id:req.params.id})
        .then((post)=>{
            // if(post.userId !== req.auth.userId){
            //     res.status(401).json({message:"not authorized ...:/"});
            // }
            // else{
            //     Post.updateOne({_id:req.params.id}, {...postObject, _id:req.params.id})
            //         .then(()=>{res.status(200).json({message: "post updated sucessfuly :)"});})
            //         .catch(error =>{res.status(400).json({error:error})})
            // }
            if(post.userId == req.auth.userId || req.auth.isAdmin == true){
                Post.updateOne({_id:req.params.id}, {...postObject, _id:req.params.id})
                    .then(()=>{res.status(200).json({message: "post updated sucessfuly :)"});})
                    .catch(error =>{res.status(400).json({error:error})})
            }
            else{
                res.status(401).json({message: "not authorized ....:/"});
            }
        })
        .catch(error => res.status(400).json({error}));
};

exports.deletePost = (req, res, next) =>{
  
    Post.findOne({_id: req.params.id})
        .then(post =>{
                //console.log(`req.auth.user`)
                if(post.userId == req.auth.userId || req.auth.isAdmin == true){
                    //console.log(100);
                    const filename = post.imageUrl.split('/images/')[1];
                            fs.unlink(`images/${filename}`, ()=>{
                        Post.deleteOne({_id:req.params.id})
                            .then(()=>{res.status(200).json({message: "post deleted !"})})
                            .catch(error => res.status(401).json({error}));
                    });
                }
                else{
                    res.status(401).json({message: "Not authorized :/"})
                }
        
        })
        .catch(error=>{
            res.status(500).json({error});
        });
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
    Post.findOne({_id: req.params.id})
        .then((post)=>{
            const like = Number(req.body.like);
            const userId = req.body.userId;
            if(like === 1){
                console.log(`like 1 = ${like}`);
                Post.updateOne({_id: req.params.id},
                    {$inc:{likes: 1}, $push: {usersLiked:userId}})
                        .then(()=>{res.status(200).json({message: "post liked !"})})
                        .catch(error =>{res.status(400).json({error:error});})
            }
            else if(like === 0){
                console.log(`like 0 = ${like}`);
                if(post.usersLiked.length !==0){
                    for(i=0; i<post.usersLiked.length;i++){
                        if(userId == post.usersLiked[i]){
                            Post.updateOne({_id:req.params.id},
                                {$inc:{likes: -1}, $pull:{usersLiked:userId}})
                                    .then(()=>res.status(200).json({message: "post unliked !"}))
                                    .catch(error =>{res.status(400).json({error:error});})
                        }
                    }
                }
            }
        })
        .catch(error => res.status(400).json({error}));
};