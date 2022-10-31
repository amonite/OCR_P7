const express = require("express");
const mongoose = require("mongoose");
//const Post = require('./models/Post');
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const path = require("path");
const dotenv = require("dotenv");
const app = express();



dotenv.config();


mongoose.connect(process.env.USER_KEY,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //acess api from anywhere 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //res.setHeader('Access-Control-Allow-Credentials', 'true');
    //res.setHeader('Cross-Origin-Ressource-Policy', 'same-site');
    next();
  });


  app.use("/api/posts", postRoutes);
  app.use("/api/auth", userRoutes);
  app.use("/images", express.static(path.join(__dirname, 'images')));


module.exports = app;