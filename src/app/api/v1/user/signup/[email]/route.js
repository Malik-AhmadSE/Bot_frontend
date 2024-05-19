
import { ConnectDB } from "@/lib/database/ConnectDB";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import UserModel from "@/models/userModel";
import Joi from "joi";
import UserDTO from "@/lib/helpers/DTO/userDTO";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
ConnectDB();
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

export async function POST(req) {
  const RegistrationSchema = Joi.object({
      name: Joi.string().min(1).max(15).required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(passwordRegex).required(),
      confirmPassword: Joi.ref("password"),
      address: Joi.string().min(1).max(20).required(),
      dob: Joi.date().required(),
  });
  const data = await req.json();
  const { error } = RegistrationSchema.validate(data);
  if (error) {
      return NextResponse.json({ message: error.message },{status:422});
  }

  const { name, email, password, confirmPassword, address, dob } = data;

  try {
      const EmailInUse = await UserModel.exists({ email });
      const UserInuse = await UserModel.exists({ name });

      if (EmailInUse) {
          return NextResponse.json({ message: "Email already registered, use another Email" },{status:409});
      }

      if (UserInuse) {
          return NextResponse.json({ message: "User Name already registered, use another Name" },{status:409});
      }

      const Hashpassword = await bcryptjs.hash(password, 10);

      const RegisterUser = new UserModel({
          name,
          email,
          password: Hashpassword,
          address,
          dob,
      });

      const user = await RegisterUser.save();
      const saved_user = await UserModel.findOne({ email: email });
      const token = jwt.sign({ userID: saved_user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5d' });
      cookies().set("Token", token);
      const user_DTO = new UserDTO(user);
      return NextResponse.json({ user: user_DTO, auth: true },{status:201});
  } catch (error) {
      return NextResponse.json({ message: "Internal Server Error" },{status:500});
  }
}
