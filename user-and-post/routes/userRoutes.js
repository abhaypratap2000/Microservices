const UserController = require('../controller/userCtrl');
const controller = new UserController();
const userMiddlewares = require("../middlewares/userMW")
const express = require("express");
const  validate = require("../utils/validate")

const router = express.Router();

router.post("/createUser" , userMiddlewares.userDataMiddlewares() , validate.validationHandler, controller.createUser);
router.get("/getPostByUserId/:userId" , controller.findPost);
router.delete("/deleteUserAndPosts/:userId" , controller.deleteUserAndPosts)
module.exports=router;
