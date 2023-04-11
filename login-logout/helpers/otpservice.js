const otpGenerator = require('otp-generator');
module.exports.genrateOtp = ()=>{
    const OTP = otpGenerator.generate(4, {
      digits: true,
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets:false
      
    });
    return OTP;
}