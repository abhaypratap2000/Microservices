const express = require('express');
const bodyParser = require("body-parser")
const router = require('./modules/routes')
const app = express();
const path = require('path');
const createError = require("http-errors");
require("dotenv").config();

const mongoose = require('mongoose');
mongoose.connect(process.env.port , {
  dbName:'Auth',
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

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"./views"))
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ limit: '1gb', extended: true }));
app.use('/',  router);


app.use(async(req , res , next)=>{
  next(createError.NotFound());
})

app.use((err , req , res , next)=>{
  res.status(err.status || 500)
  res.send({error:{
    status:err.status||500,
    message:err.message
  }})
})


app.listen(port, () => {
  console.log(`Connection sucessfull on ${port}`);
});
