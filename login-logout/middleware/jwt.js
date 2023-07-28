
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

const signRefreshToken = async(req , res , next)=>{
const data = await userModel.findOne({ email: req.body.email });
 jwt.sign(
   { id: data._id },
   process.env.secretkey,
   { expiresIn: '1y' },
   (err, token) => {
    if(err){
      console.log(err);
    }
       req.refreshToken = token;
       next();
     }

 );

}

const verifyRefreshToken = (req, res, next) => {
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
        return res.status(400).json({ message: 'User not found' });
      }
      req.user = decodeData;
      next();
    });
  } else {
    return res.send('Token invalid');
  }
};
module.exports = { verifyToken, signRefreshToken ,verifyRefreshToken };
