const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String
    }
});

const imageModel = new mongoose.model('imageModel', ImageSchema);
module.exports = imageModel;