const orderModel = require("../database/orderschema")
const mongoose = require("mongoose");
const { default: axios } = require("axios");
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

exports.order = async(req,res)=>{
    try {
        let newOrder = new orderModel(req.body);
        await newOrder.save();
        res.status(200).json({message:"success",data:newOrder})
         } catch (error) {
            console.log(error);   
     }    
}
exports.getorder = async(req,res)=>{
    try {
        const getorders = await orderModel.find();
        res.json(getorders);
    } catch (error) {
        console.log(error)
    }
}

exports.ordersbyId = async(req,res)=>{
    try {
        const orderbyid = await orderModel.findById(req.query.id);
        if(orderbyid){
            const customer = await axios.get(
              `http://localhost:3002/customerlistbyid?id=${orderbyid.CustomerId}`
            );
        console.log(customer.data);
            res.send(customer.data);
            // const product = await axios.get('http://localhost:3002/customerlistbyid');
        }


    } catch (error) {
        console.log(error);
    }
}