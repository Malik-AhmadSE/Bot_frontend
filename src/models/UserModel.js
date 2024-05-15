import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    password: {
      type: String
    },
    apikey: {
        type: String,
        trim: true
    },
    secretkey:{
        type:String,
        trim: true
    },
    image:{
        type:String,
        default:""
    },
    address:{
        type:String
    },
    dob:{
        type:Date
    },
    verified:{
      type:Boolean,
    }
  },
  {timestamps:true}
);
const userModel= mongoose.models.User || mongoose.model('User', userSchema);

export default userModel;