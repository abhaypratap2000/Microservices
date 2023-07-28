const constants = require("../constants/constants");
const {check} = require("express-validator");


 const userDataMiddlewares = () => {
        return [
          check("email").trim().not().isEmpty().isEmail().isLength({ min: 10, max: 50 })
          .withMessage(constants.USER.EMAIL_FORMAT),
          check("userName").trim().not().isEmpty().isLength({ min: 10, max: 20 })
          .withMessage(constants.USER.USER_NAME_FORMAT),
          check("firstName").trim().notEmpty().isLength({ min: 1, max: 30 })
          .withMessage(constants.USER.FIRST_NAME),
          check("lastName").trim().notEmpty().isLength({ min: 1, max: 30 })
          .withMessage(constants.USER.LAST_NAME)
        ];
      };

   
module.exports = {userDataMiddlewares};


  