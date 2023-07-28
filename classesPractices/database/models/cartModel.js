const mongoose = require('mongoose');

const cart = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      require: true,
    },
    item: {
      type: Number,
      require: true,
    },
    payment: {
      type: Number,
      require: true,
    }, 
    category:{
        type : String,
        require:true
    }
  },
  { timestamps: true }
);

const cartModel = new mongoose.model("cartmodal" , cart);
module.exports = userModel;