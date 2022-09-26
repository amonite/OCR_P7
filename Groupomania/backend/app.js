const express = require("express");
const mongoose = require("mongoose");
//const Post = require('./models/Post');
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const dotenv = require("dotenv");
const app = express();

//const cors = require('cors');

dotenv.config();

//'mongodb+srv://admin:Groupomania7619@cluster0.jw10pf1.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(process.env.USER_KEY,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

// app.use((req, res) =>{
//     res.json({message: "votre requête à bien été reçue :)"})
// });

// app.use(cors({
//   origin:"http://localhost:5000"
// }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //acess api from anywhere 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //res.setHeader('Access-Control-Allow-Credentials', 'true');
    //res.setHeader('Cross-Origin-Ressource-Policy', 'same-site');
    next();
  });


  app.use("/api/post", postRoutes);
  app.use("/api/auth", userRoutes);
// test route get 
// app.use("/api/stuff", (req, res, next)=>{
//     const stuff = [
//         {
//             _id: "001",
//             name: "obj1",
//             desc: "ceci est l'objet 1"
//         },
//         {
//             _id: "002",
//             name: "obj2",
//             desc: "ceci est l'objet 2"
//         },
//         {
//             _id: "003",
//             name: "obj3",
//             desc: "ceci est l'objet 3"
//         }
//     ];
//     res.status(200).json(stuff);
// });

// test route post (const Post = require('./models/Post');)
// app.post("/api/post", (req, res, next) =>{
//     // console.log(req.body);
//     // res.status(201).json({message: "objet créé :)"});
//     delete req.body._id;
//     const post = new Post({
//         ...req.body 
//     });
//     post.save()
//         .then(()=> res.status(201).json({message:"post enregistré :)"}))
//         .catch(error => res.status(400).json({error}));
// });


module.exports = app;