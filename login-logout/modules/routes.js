const express = require("express");
const controller = require("./controller");
const middleware = require('../middleware/jwt');

const router = express.Router();
router.get("/login",controller.login);
router.get("/profile" ,middleware.verifyToken, controller.profile)
router.post("/addUser" , controller.adduser);
module.exports=router;