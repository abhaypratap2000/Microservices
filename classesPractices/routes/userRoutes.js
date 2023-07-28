const UserController = require('../controller/userController');
const controller = new UserController();
const express = require("express");

const router = express.Router();

router.post("/createUser" , controller.createUser);
router.get("/getUser" , controller.getUser);
router.get("/getUserByEmail" , controller.getUserByEmail);
router.post("/removeUserByEmail" , controller.removeUserByEmail)
module.exports=router;