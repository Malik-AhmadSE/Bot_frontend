
import { ConnectDB } from "@/lib/database/ConnectDB";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import UserModel from "@/models/userModel";
import Joi from "joi";
import UserDTO from "@/lib/helpers/DTO/userDTO";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
ConnectDB();
export async function POST(req) {
    const userLogin = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });
  const data = await req.json();
  const { error } = userLogin.validate(data);
  if (error) {
      return NextResponse.json({ message: error.message },{status:422});
  }

  const {email, password } = data;
  let user;
  try{
    user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({error:"Invalid user email"},{status:401})
    }
    const match = await bcryptjs.compare(password, user.password);
    if (!match) {
        return NextResponse.json({error:"Invalid user password"},{status:401})
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" },{status:500});
  }
  const token = jwt.sign({ userID: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5d' });
  const user_DTO = new UserDTO(user);
  cookies().set("Token", token);
  return NextResponse.json({ user: user_DTO, auth: true },{status:200});
}
