const mongoose = require("mongoose");

const orders = new mongoose.Schema({
    CustomerId:{
        type:mongoose.SchemaTypes.ObjectId,
        require:true
    },
    BookId:{
        type:mongoose.SchemaTypes.ObjectId,
        require:true
    },
    initialDate:{
        type:Date,
        require:true
    },
    deliveryDate:{
        type:Date,
        require:true
    }
})
const orderModal = new mongoose.model("orderModal",orders);
module.exports = orderModal;