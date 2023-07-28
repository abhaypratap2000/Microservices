const express = require("express");
const controller = require("./controller");
const middleware = require('../middleware/jwt');

const router = express.Router();
router.get("/login",middleware.signRefreshToken,controller.login);
router.get("/profile" ,middleware.verifyToken, controller.profile)
router.post("/addUser" , controller.adduser);
router.post("/upload" , controller.uploads);

module.exports=router;