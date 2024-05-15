
import { ConnectDB } from "@/lib/database/ConnectDB";
import { NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import Joi from "joi";
import sendMail from "@/lib/helpers/Mail";
import resetpage from '@/lib/helpers/constants/resetmail';
import jwt from "jsonwebtoken";
ConnectDB();
export async function POST(req) {
    const useremail = Joi.object({
        email: Joi.string().email().required(),
      });
  const data = await req.json();
  const { error } = useremail.validate(data);
  if (error) {
      return NextResponse.json({ message: error.message },{status:422});
  }

  const {email } = data;
  let user;
  try{
    user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json({error:"Invalid user email"},{status:401})
    }
  
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" },{status:500});
  }
  const secret = user._id + process.env.ACCESS_TOKEN_SECRET
  const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
  const id=user._id;
  const link = `http://localhost:3000/reset/${id}/${token}`
  try{
    console.log(user.email);
     await sendMail({
      to: user.email,
      subject: "Password Reset - PGOT",
      message:resetpage(link)
    })  
    return NextResponse.json({message: "Password Reset Email Sent... Please Check Your Email" },{status:200});
  }catch(error){
    return NextResponse.json({ message: "Internal Server Error" },{status:500});
  }
  
}

