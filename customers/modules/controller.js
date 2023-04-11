const customerSchema = require("../database/costomersSchema")
// exports.homepage = async (req, res) => {
//     try {
//       res.send('home');
//     } catch (error) {
//       console.log(error);
//     }
//   };
exports.orderlist = async(req , res)=>{
    let response = {
        data:{
            item:[
                {
                    id:1,name:'order1'
                },
                {
                    id:2,name:'order2'
                }
            ]
        }
    }
    res.status(200).json(response);
}
exports.order = async(req , res)=>{
    res.status(200).json({message:"order called"})
    
}

exports.addCustomer = async(req , res)=>{
    try {
        let newCustomer = new customerSchema(req.body);
        await newCustomer.save();
       
    } catch (error) {
        console.log(error);
    }
    res.send('customers add successfully');
}

exports.customersList = async(req , res)=>{
    try {
       const customerList = await customerSchema.find();
       res.send(customerList);
    } catch (error) {
        console.log(error);
    }
}

exports.customerListById = async(req , res)=>{
    try {
        const customerListById = await customerSchema.findById(req.query.id);
        if(customerListById){
            res.send(customerListById);
        }else{
            res.send("Invalid Id")
        }
     } catch (error) {
        console.log(error);
        
    }

}

exports.deletecustomerById = async(req,res)=>{
    try {
        const deletecustomerbyid = await customerSchema.findOneAndRemove({_id:req.query.id});
        res.send(deletecustomerbyid);
    } catch (error) {
        console.log(error);
    }
}