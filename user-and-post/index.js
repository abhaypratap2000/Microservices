const express = require('express');
const bodyParser = require("body-parser")

const app = express();
const router = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')
require("dotenv").config();

const mongoose = require('mongoose');
  mongoose.connect(process.env.port , {
    dbName:'UserBlogpostData',
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
    .then((res) => {
      console.log('dbconnected');
    })
    .catch((err) => {
      console.log(err);
    });

mongoose.connection.on('error' ,(err)=>{
  console.log(err.message);
}) 
mongoose.connection.on('disconnected',()=>{
  console.log('Mongoose connection is disconnected')
})
process.on('SIGINT' , async()=>{
    await mongoose.connection.close()
    process.exit(0)
  })
  
  const port = process.env.PORT || 9000;

  app.use(bodyParser.urlencoded({ limit: '1gb', extended: true }));
  app.use('/user',  router);
  app.use('/post',postRouter)

  app.listen(port, () => {
    console.log(`Connection sucessfull on ${port}`);
  });
  