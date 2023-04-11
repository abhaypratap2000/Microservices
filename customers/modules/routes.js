const express = require("express");
const controller = require("./controller.js")
const router = express.Router();

router.route('/').get(controller.order);
router.route('/orderList').get(controller.orderlist);
router.post('/addcustomer',controller.addCustomer);
router.get('/customerList',controller.customersList);
router.get('/customerlistbyid',controller.customerListById);
router.delete('/deletecustomerbyid',controller.deletecustomerById);
module.exports = router;