import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { ConnectDB } from "@/lib/database/ConnectDB";
import UserModel from "@/models/userModel";
import Joi from "joi";
import sendMail from "@/lib/helpers/Mail";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
ConnectDB();
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
export async function POST(req,{params}){
    const Schema = Joi.object({
        password: Joi.string().regex(passwordRegex).required(),
        confirmPassword: Joi.ref("password"),
    });
    const data = await req.json();
    console.log(data);
    const { error } = Schema.validate(data);
    if (error) {
        return NextResponse.json({ message: error.message },{status:422});
    }
    const { password } = data;
    const { id } = params;
    try {
          const user = await UserModel.findById(id)
          const new_secret = process.env.ACCESS_TOKEN_SECRET
          const token=req.cookies.get("Token")?.value;
          jwt.verify(token, new_secret)
          const salt = await bcryptjs.genSalt(10)
          const newHashPassword = await bcryptjs.hash(password, salt)
          const result=await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
          if(result){
            await sendMail({
              to: user.email,
              subject: 'Password Reset ',
              message: `<p>Your Password is changed Successfully ${user.email}</p>`,
          });
          }
          return NextResponse.json({message: "Password Reset Successfully" },{status:200})
        } catch (error) {
          console.log(error)
          return NextResponse.json({message: "Invalid Token" },{status:500})
        }
}