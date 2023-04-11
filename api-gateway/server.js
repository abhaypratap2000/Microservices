const express = require('express');
const gateway = require('fast-gateway');
const authentication = require('./middleware/checkauth');
const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/APIGateWay')
  .then((res) => {
    console.log('dbconnected');
  })
  .catch((err) => {
    console.log(err);
  });
const port = 9001;

const server = gateway({
  // middlewares:[authentication ],
    routes: [{
      prefix: '/order',
      target: 'http://localhost:3000',
       hooks:{

      }
    },
    {
        prefix: '/product',
        target: 'http://localhost:3002',
        hooks:{
  
        }
      }
]
  })
  server.get('/mytesting',(req,res)=>res.send('yes called gateway'))
  server.start(port).then(server=>{
        console.log("Api Gateway is running on 9001")
  });