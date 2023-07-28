const mongoose = require('mongoose');

const post = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      require: true,
      ref:"usermodal"
    },
    title:{
        type : String,
        require: true
    },
    content: {
      type: String,
    }, 
    status:{
        type:String,
        
    },
    image:{
      type:String,
      default : ""
     
  }
  },
  { timestamps: true }
);

const postModel = new mongoose.model("postmodal" , post);
module.exports = postModel;