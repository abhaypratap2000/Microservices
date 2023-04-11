const express = require('express');
const bodyParser = require("body-parser")
const router = require('./modules/routes')
const app = express();
const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/ProductMicroServices')
  .then((res) => {
    console.log('dbconnected');
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({ limit: '1gb', extended: true }));

app.use('/',  router);

app.listen(port, () => {
  console.log(`Connection sucessfull on ${port}`);
});
