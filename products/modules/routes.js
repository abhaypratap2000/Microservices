const express = require("express");
const controller = require("./controller.js")
const router = express.Router();

router.route('/').get(controller.product);
router.route('/productlist').get(controller.productlist);
router.route('/newbook').post(controller.books);
router.route('/getbooks').get(controller.getbooks);
// router.route('/getbookbyid/:id').get(controller.getbooksbyid);
router.get('/getbooksbyid',controller.getbooksbyid);
router.delete("/deletebook" , controller.deleteBookById);
module.exports = router;