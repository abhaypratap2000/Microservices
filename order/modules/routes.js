const express = require("express");
const controller = require("./controller.js")
const router = express.Router();

router.route('/').get(controller.order);
router.route('/orderList').get(controller.orderlist);
router.post('/order',controller.order);
router.get('/getorders',controller.getorder);
router.get('/getorderbyid',controller.ordersbyId);
module.exports = router;