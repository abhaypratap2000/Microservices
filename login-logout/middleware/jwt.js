
const jwt = require('jsonwebtoken');
const userModel = require('../database/user');
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    jwt.verify(token, process.env.secretkey, (err, decodeData) => {
      if (err) {
        console.log(err);
        return res.send({ data: 'invalid Token' });
      }
        const userid = decodeData.id;
       
        const doesExist = userModel.findOne({ id: userid });
         if (!doesExist) {
         return res
           .status(400)
           .json({ message: "User not found" });
       }
      req.user = decodeData;
      next();
    });
  } else {
    return res.send('Token invalid');
  }
};
module.exports = { verifyToken };
