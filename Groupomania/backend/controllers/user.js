const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config()

//const {body, validationResult} = require("express-validator");
var passwordValidator = require("password-validator");

var schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase(1)                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

exports.signup = (req, res, next) =>{
    // if(req.body.email === "coco"){
    //     return res.status(400).json({message:"cet email ne convient pas !"})
    // }
    User.findOne({email:req.body.email})
        .then(user =>{
            if(user){
                return res.status(400).json({message:"cet email est déjà pris ! "});
            }

            if(schema.validate(req.body.password)){
            
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
            }
            else{
                console.log("erreur mot de passe trop court")
                return res.status(400).json({message:"votre mot de passe ne convient pas"});
            };
            
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
                                 { 
                                    email: user.email,
                                    userId: user._id,
                                    isAdmin: user.isAdmin,
                                 },
                                 process.env.SECRET_PHRASE,
                                 //"THE_PCENGINE_RULEZ",
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
