const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) =>{
    User.findOne({email:req.body.email})
        .then(user =>{
            if(user){
                return res.status(400).json({message:"cet email est déjà pris ! "});
            }

            bcrypt.hash(req.body.password, 10) // salt password 10 times !
                .then(hash =>{
                    const user = new User({
                        email: req.body.email,
                        password: hash,
                        isAdmin: req.body.isAdmin
                    });
                    user.save()
                        .then(()=> res.status(201).json({message: "utilisateur créé :)"}))
                        .catch(error => res.status(400).json({error}));
                })
                .catch(error => res.status(500).json({error}));

            })
        .catch(error => res.status(500).json({error}));
    
};



exports.login = (req, res, next) =>{
    //let token ="";
    User.findOne({email:req.body.email})
        .then(user =>{
            if(!user){
                return res.status(400).json({message: "utilisateur non trouvé :/"});
            }
            
            bcrypt.compare(req.body.password, user.password)
                .then(valid =>{
                    if(!valid){
                        return res.status(400).json({message: "mot de passe incorect :/"});
                    }
                    //token = jwt.sign({userId:user._id, isAdmin:user.isAdmin}, "THE_PCENGINE_RULEZ", {expiresIn:"24h"});
                    //console.log(token);
                    
                    res.status(200).json(
                        {
                            email: user.email,
                            userId: user._id,
                            //token: "token"
                             token: jwt.sign(
                                 {userId: user._id,
                                  isAdmin: user.isAdmin,
                                 },
                                 "THE_PCENGINE_RULEZ",
                                 {expiresIn: "24h"}
                            )
                            //token: token 
                        }
                    );
                }
                
                )
                .catch(error => res.status(500).json({error}));
                
        })
        .catch(error => res.status(500).json({error}));
        
};

// exports.logout = (req, res, next) =>{
//     // remove token from localStorage 
// }
