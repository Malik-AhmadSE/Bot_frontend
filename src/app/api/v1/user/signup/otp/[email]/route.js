
import { ConnectDB } from "@/lib/database/ConnectDB";
import { NextResponse } from "next/server";
import sendMail from "@/lib/helpers/Mail";
import UserOTPVerification from "@/models/OtpVerification";
import Joi from "joi";
import generateOTP from "@/lib/helpers/Otp";
ConnectDB();
export async function GET(req,{params}) {
try{
    const schema = Joi.object({
        email: Joi.string()
          .email()  
          .required()
          .regex(/^\w+@\gmail\.com$/),  
      });
  const {email} = params;
  const { error } = schema.validate(params);
  if (error) {
      return NextResponse.json({ message: error.message },{status:422});
  }
  let existingOTP = await UserOTPVerification.findOne({ email });
        if (existingOTP) {
            await UserOTPVerification.deleteOne({ email: existingOTP.email });
        }
        const otp = generateOTP(); 
        const newOTP = new UserOTPVerification({ email, otp });
        await newOTP.save();
        await sendMail({
            to: email,
            subject: 'Otp Verification',
            message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
        });

       return NextResponse.json({ success: true, message: 'OTP sent successfully' },{status:200});
    } catch (error) {
        console.error('Error sending OTP:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' },{status:500});
    }
}
