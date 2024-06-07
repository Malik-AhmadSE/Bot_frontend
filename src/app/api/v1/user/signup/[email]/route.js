import { ConnectDB } from "@/lib/database/ConnectDB";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import UserModel from "@/models/userModel";
import Subscription from "@/models/Subscribe"; // Assuming typo is fixed
import Joi from "joi";
import UserDTO from "@/lib/helpers/DTO/userDTO";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import mongoose from 'mongoose';

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
    return NextResponse.json({ message: error.message }, { status: 422 });
  }

  const { name, email, password, confirmPassword, address, dob } = data;

  try {
    const EmailInUse = await UserModel.exists({ email });
    const UserInuse = await UserModel.exists({ name });

    if (EmailInUse) {
      return NextResponse.json({ message: "Email already registered, use another Email" }, { status: 409 });
    }

    if (UserInuse) {
      return NextResponse.json({ message: "User Name already registered, use another Name" }, { status: 409 });
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
    console.log(saved_user._id);
    const defaultSubscription = new Subscription({
        userId: saved_user._id,
        type: 'none', 
        title: 'No Subscription',
        price: '0', 
        startDate: Date.now(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 
      });
    const savedSubscription = await defaultSubscription.save();
    console.log(savedSubscription);
    const token = jwt.sign({ userID: saved_user._id,email:saved_user.email,subtype: savedSubscription.type, title: savedSubscription.title}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5d' });
    console.log(token);
    cookies().set("Token", token);
    const user_DTO = new UserDTO(user);

    return NextResponse.json({ message: user_DTO, auth: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
