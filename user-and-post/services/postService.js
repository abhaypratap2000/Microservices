const Post = require('../database/postDB');
const User = require("../database/userDB")

class UserService {
  constructor(x) {
    console.log(x);
  }

  async createpost(post, userId) {
    const postData = new Post(post);
    const postDB = await postData.save();
    const id = postDB._id;
    const DB = await User.findById(userId);
    let posts = DB.posts || [];
    posts.push(id.toString());
    return posts;
}

  updatePost(id , data){
    const getPostData = Post.findByIdAndUpdate(id , data);
    return getPostData;
  }


  getpost(id) {
    const getdata = Post.findById(id);
    return getdata;
  }



  deletepost(id) {
    console.log(id)
    const deletedata = Post.findByIdAndDelete(id);
    return deletedata;
  }

  getimage(id){
    const getImage = Post.findById(id);
    return getImage;
  }

}

module.exports = UserService;