import otpGenerator from 'otp-generator';
const OTP_LENGTH=process.env.OTP_LENGTH;
const OTP_CONFIG= {
    upperCaseAlphabets: true,
    lowerCaseAlphabets:true,
    digits:true,
    specialChars: false,
}
function generateOTP(){
  const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return OTP;
};

export default generateOTP; 

