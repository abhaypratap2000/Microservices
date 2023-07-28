const {validationResult} = require("express-validator");


const validationHandler = (req, res, next) => {
  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
        return error.msg.replace("{PARAM}", error.path);
      },
  });
  const result = myValidationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      message: result.array().join(" and "),
    });
  }
   return next();

}
  module.exports = {validationHandler};
