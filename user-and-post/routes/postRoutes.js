const PostController = require('../controller/postCtrl');
const controller = new PostController();
const express = require("express");
const uploads = require("../helpers/utils");
const postRouter = express.Router();

postRouter.post(
    "/createPost/:userId" ,
     uploads.fields([{ name: "image" }]), 
    controller.createPost
    );
postRouter.put(
    "/editPost" , 
    uploads.fields([{ name: "image" }]),
    controller.editPost)

    
postRouter.get("/getposts/:id" , controller.getPost);
postRouter.delete("/postDelete/:id" , controller.deletePost);
postRouter.get("/getImage", controller.getImage);

module.exports=postRouter;