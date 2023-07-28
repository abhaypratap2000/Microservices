const PostService = require('../services/postService');
const UserService = require("../services/userService");
const fs = require('fs');
const path = require('path');

const service = new PostService(1);
const userService = new UserService(1);
class PostController {
    constructor() {

    }

    async createPost(req, res) {
        try {
            req.body.image = req.files.image[0].filename;
            const post = req.body;
            console.log("post", post, req.files.image[0].filename)
            const { userId } = req.params;
            const data = await service.createpost(post, userId);
            await userService.updateUser(userId, { posts: data });
            res.status(200).json({ message: 'Post Created successfully', data: data });
        } catch (err) {
            res.status(500).send(err);
        }
    }


    async getImage(req , res){
        try {
            const id = req.body;
            if (!id) {
                return res.status(401).send("ID Require");
            }
            const data = await service.getimage(id);
            console.log("data" , data.image)
            res.status(200).json({ message: "Image Fetched successfully", data: data })
        } catch (error) {
            console.log(error)
        }
    }



    async editPost(req, res) {
        try {
            const userid = req.query.userId;
            const postid = req.query.postId;
            if (!(userid || postid)) {
                return res.status(401).send("ID Require");
            }
            if (Object.keys(req.files).length === 0) {
                const userData = await userService.findUser({ _id: userid });
                if (!userData) {
                    return res.status(401).send("User not found");
                }
                const postData = await service.updatePost(postid, req.body);
                res.status(200).json({ message: "Post edited successfully", data: postData })
            } else {
                const data = await service.getimage(postid);
                const directoryName = `uploads/${data.image}`;
                fs.unlink(directoryName, (err) => {
                    if (err) {
                      console.error('Error while deleting old image:', err);
                    } else {
                      console.log('Old image deleted successfully.');
                    }
                  });
             
                req.body.image = req.files.image[0].filename;
                const userData = await userService.findUser({ _id: userid });
                if (!userData) {
                    return res.status(401).send("User not found");
                }
                const postData = await service.updatePost(postid, req.body);
                res.status(200).json({ message: "Post edited successfully", data: postData })
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }



    async getPost(req, res) {
        try {
            const _id = req.params.id;
            if (!_id) {
                return res.status(401).send("ID Require");
            }
            const data = await service.getpost(_id);
            res.status(200).json({ message: "Post Fetched successfully", data: data })
        } catch (error) {
            res.status(500).send(error);
        }
    }



    async deletePost(req, res) {
        try {
            const _id = req.params.id;
            console.log(_id)
            if (!_id) {
                return res.status(401).send("ID Require");
            }
            await service.deletepost(_id);
            res.status(200).json({ message: "Post Deleted successfully" })
        } catch (error) {
            res.status(500).send(error);
        }
    }

    
}

module.exports = PostController;