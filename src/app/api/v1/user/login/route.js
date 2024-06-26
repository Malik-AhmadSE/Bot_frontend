import { ConnectDB } from "@/lib/database/ConnectDB";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import UserModel from "@/models/userModel";
import Subscription from "@/models/Subscribe";
import Joi from "joi";
import UserDTO from "@/lib/helpers/DTO/userDTO";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { isAfter, parseISO } from 'date-fns';

ConnectDB();

export async function POST(req) {
    const userLogin = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const data = await req.json();
    const { error } = userLogin.validate(data);
    if (error) {
        return NextResponse.json({ message: error.message }, { status: 422 });
    }

    const { email, password } = data;
    let user;
    let subscribe;
    try {
        user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "Invalid user email" }, { status: 401 });
        }
        const match = await bcryptjs.compare(password, user.password);
        if (!match) {
            return NextResponse.json({ message: "Invalid user password" }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }

    try {
        subscribe = await Subscription.findOne({ userId: user._id }).populate('userId');
        console.log("run1 ");
        if (subscribe && isAfter(new Date(), parseISO(subscribe.endDate))) {
            subscribe.type = "none";
            subscribe.title = "No Subscription";
            await subscribe.save();
            console.log("run");
        }
    } catch (error) {
        console.error('Error finding subscription:', error);
    }

    const token = jwt.sign(
        { userID: user._id, email: user.email, subtype: subscribe.type, title: subscribe.title },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '5d' }
    );
    const user_DTO = new UserDTO(user);
    cookies().set("Token", token);
    return NextResponse.json({ message: user_DTO, auth: true }, { status: 200 });
}
