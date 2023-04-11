const mongoose = require('mongoose');
const customers =  new mongoose.Schema({
    name :{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    address:{
        type:String,
        require:true
     }

})
const customerModal = new mongoose.model("customer",customers);
module.exports = customerModal;