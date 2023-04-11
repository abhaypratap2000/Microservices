const BooksModel = require("../database/booksscheema");
exports.productlist = async(req , res)=>{
    let response = {
        data:{
            item:[
                {
                    id:1,name:'product1'
                },
                {
                    id:2,name:'product2'
                }
            ]
        }
    }
    res.status(200).json(response);
}

exports.product = async(req , res)=>{
    res.status(200).json({message:"product called"})
}

exports.books = async(req,res)=>{
    try {
        let newBook = new BooksModel(req.body);
        await newBook.save();

    } catch (error) {
        console.log(error)
    }
    res.send("new book is added")
}
exports.getbooks = async(req,res)=>{
    try {
        BooksModel.find().then((books)=>{
            res.json(books);
        })
    } catch (error) {
        console.log(error)
    }
}
exports.getbooksbyid = async(req,res)=>{
    try {
        BooksModel.findById(req.query.id).then((books)=>{
            if(books){
                res.json(books)
            }else{
                res.sendStatus(404)
            }
        })
        
    } catch (error) {
        console.log(error)
        
    }
}

// exports.deleteBookById = async(req , res)=>{
//     try {
//         BooksModel.findOneAndRemove({_id:req.query.id}).then(()=>{
//             res.send("remove book succesfully")
//         })
//      } catch (error) {
//         console.log(error);
        
//     }
// }


exports.deleteBookById = async(req , res)=>{
    try {
        await BooksModel.findOneAndRemove({_id:req.query.id})
            res.send("remove book succesfully");
     } catch (error) {
        console.log(error);
        
    }
}