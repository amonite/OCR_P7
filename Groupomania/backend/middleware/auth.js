const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_PHRASE);
       
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;
        
        req.auth = {
            userId: userId,
            isAdmin: isAdmin
        };
    next();
    }
    catch(error){
        res.status(401).json({error});
    }
}