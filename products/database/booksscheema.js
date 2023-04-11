const validator = require("validator");
const mongoose = require("mongoose");

const books = new mongoose.Schema({
    tittle:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    numberPages:{
        type:Number,
        require:true,
    },
    publisher:{
        type:String,
        require:true
    }

})

const Books = new mongoose.model('book',books);
module.exports=Books