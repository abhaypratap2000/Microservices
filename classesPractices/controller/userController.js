const UserService = require('../services/userServices');
const service = new UserService(1);
class UserController {
    constructor(){
    
    }
  
   async createUser(req , res){
    try{
        const data = await service.createUser(req.body);
        res.status(200).json({ message: 'data fetch successfully', data: data });
    }catch(err){
        res.status(500).send(err);
    } 
}

    async  getUser(req , res ){
        try{
            const data = await service.getuser();
            console.log( "data 12" , data)
            if(!data || data.length === 0){
            return res.status(401).send("data Not found");
         }
           console.log( "data12" , data)
           res.status(200).json({ message: 'success', data: data });
        }catch(err){
        console.log(err) 
       }

    }

    getUserByEmail(req , res){
        const email = (req.query.email);
        if(!email){
            return res.status(401).send("Email Require");
        }
        service.getUserByemail(email)
        .then(data => {
            console.log("data" , data)
            res.status(200).json({message : 'success' , data:data});

        }).catch(err =>{
            res.status(500).send(err);
        })
    }
    removeUserByEmail(req , res){
        service.removeUserByemail(req.body)
        .then(data => {
            console.log("data" , data);
            res.status(200).json({message :" User remove successfully " , data:data });
        }).catch(err => {
            res.status(500).send(err);
        })
    }
}

module.exports = UserController;