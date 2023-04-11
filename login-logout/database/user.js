const mongoose = require('mongoose');

const user = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    }, 
    otp:{
      type:String,
      createdAt:Date,
      expiresAt:Date,
      require:true
    },
  },
  { timestamps: true }
);

const userModel = new mongoose.model("usermodal" , user);
module.exports = userModel;