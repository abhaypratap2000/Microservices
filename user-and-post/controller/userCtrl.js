const UserService = require('../services/userService');
const service = new UserService(1);
class UserController {
    constructor(){
    
    }
async createUser(req , res){
     try{
        const doesExist = await service.userFindById(req.body);
        if (doesExist){
          return res.status(400).json({
          message: 'email already exist & userName alreay exist',
        });
      }
        const data = await service.createUser(req.body);
        res.status(200).json({ message: 'data fetch successfully', data: data });
    }catch(err){
        res.status(500).json({ success: false, message: 'Internal server error' });
    } 
}
  async findPost(req,res){
    try {
        const data = await service.findPostByUserID(req.params.userId);
        res.status(200).json({message : "Post SuccessFully Fetched" , data : data});
    } catch (error) {
        res.status(500).send(error);
    }
  }
  async deleteUserAndPosts(req , res){
    try {
        
        const data = await service.delete_user_post(req.params.userId);
        res.status(200).json({message : "SuccessFully Fetched"});
        console.log(data);
        
    } catch (error) {
        res.status(500).send(error);
    }
}
}

module.exports = UserController;