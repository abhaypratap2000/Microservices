const bcrypt = require('bcrypt');
const userModel = require('../database/user');
const { authSchema } = require('../helpers/userAuth');
const jwt = require('jsonwebtoken');
const otp = require('../helpers/otpservice');
const nodemailer = require('nodemailer');
const fs = require('fs');
const { email } = require('../template/email.template');

require('dotenv').config();


exports.adduser = async (req, res) => {
  try {
    req.body.otp = otp.genrateOtp();
    req.body.otp.createdAt = Date.now();
    req.body.otp.expiresAt = Date.now() + 360000;

    const result = await authSchema.validate(req.body);
    if (result.error) {
      return res.status(400).json({
        success: false,
        message: result.error.details[0].message,
      });
    }
    const doesExist = await userModel.findOne({ email: result.value.email });
    if (doesExist) {
      return res.status(400).json({
        message: 'email already exist',
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(result.value.password, salt);
    const hashOtp = bcrypt.hashSync(result.value.otp.toString(), salt);
    result.value.password = hashPassword;
    result.value.otp = hashOtp;
    const data = new userModel(result.value);
    console.log(data);
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'abhay@ravenspirit.in', // generated ethereal user
        pass: 'lszbfstapngmjrbf', // generated ethereal password
      },
    });
     const replacedmail = email.replace('{OTP}', req.body.otp);
     const custommail = replacedmail.replace('{NAME}', req.body.name);
     let x = await transporter.sendMail({
       from: 'abhay@ravenspirit.in', // sender address
       to: `${req.body.email}`, // list of receivers
       subject: 'Thanks For Registering With Us.',
       html: custommail,
     });
     console.log(req.body.name);

    await data.save();
    res.status(200).json({ message: 'success', data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
exports.login = async (req, res) => {
  const data = await userModel.findOne({ email: req.body.email });
  if (data) {
    const checkuser = await bcrypt.compare(req.body.password, data.password);
    jwt.sign(
      { id: data._id },
      process.env.secretkey,
      { expiresIn: '300s' },
      (err, token) => {
        if (checkuser) {
          return res.json({ name: data.name, email: data.email, token: token });
        } else {
          console.log('user not found');
        }
      }
    );
  }
};

exports.profile = async (req, res) => {
  console.log('abhay', req.user);
  res.json({
    message: 'profile accress',
  });
};
