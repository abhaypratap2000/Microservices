const mongoose = require('mongoose');

const user = new mongoose.Schema(
  {
    userName:{
        type : String,
        require: true
    },
    email: {
      type: String,
      require: true,
    }, 
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true 
    },
    status:{
        type:String
    },
    posts :[{type:mongoose.Schema.Types.ObjectId , ref :"postmodal"}]
  },
  { timestamps: true }
);

const userModel = new mongoose.model("usermodal" , user);
module.exports = userModel;