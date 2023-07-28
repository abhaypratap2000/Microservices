const postModel = require('../database/postDB');
const userModel = require('../database/userDB');
const User = require('../database/userDB');


class UserService{
  constructor(x){
    console.log(x);
  }
    async createUser(data){
          const user = new User(data);
          return user.save();    
 }

 async userFindById(data){
    const doesExist = await userModel.findOne({ email: data.email },{userName : data.userName});
    return doesExist;
}

async findUser(data){
  const doesExist = await userModel.findOne(data);
  return doesExist;
}

    async findPostByUserID(userId){
      const postdata = await postModel.aggregate([{$match:{}},{$lookup:{
        from : "usermodals",
        localField : "userId",
        foreignField :"_id",
        as : "userdata",
        
      }},{$unwind:{path : "$userdata"}}]);
      return postdata;
    }

    async delete_user_post(id){
     const postdata = await postModel.deleteMany({ userId: { $in: id } });
     const userdata = await userModel.findByIdAndDelete(id);
      console.log(userdata , "userdata");
      return;
    }

    async updateUser(key, data){
      const doesExist = await userModel.findByIdAndUpdate(key, data);
      return doesExist;

    };
}

module.exports = UserService;