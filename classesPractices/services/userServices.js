const User = require('../database/models/userModel');

class UserService{
  constructor(x){
    console.log(x);
  }
    async getuser(){
      return User.find();
    }

    createUser(data){
        const user = new User(data);
        // user.email = data.email;
        // user.name = data.name;
        return user.save();
    }
    getUserByemail(email){
        return User.find({email}).sort({createdAt:1});
    }
    removeUserByemail({email}){
        const data = User.findOneAndRemove({email});
        return data;
      
}
}

module.exports = UserService;