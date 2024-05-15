import mongoose from "mongoose";
const UserOTPVerificationSchema = new mongoose.Schema({
    email:{type:String,required:true},
    otp:{type:String,required:true} ,
    expires:{type:Number,default:(60 * 5)},
},
{timestamps:true}
);
const UserOTPVerification = mongoose.models.UserOTPVerification || mongoose.model("UserOTPVerification",UserOTPVerificationSchema);
export default UserOTPVerification;