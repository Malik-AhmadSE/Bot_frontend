
import { ConnectDB } from "@/lib/database/ConnectDB";
import { NextResponse } from "next/server";
import sendMail from "@/lib/helpers/Mail";
import UserOTPVerification from "@/models/OtpVerification";
import Joi from "joi";
ConnectDB();
export async function POST(req,{params}) {
try{
    const schema = Joi.object({
        email: Joi.string()
          .email()  
          .required()
          .regex(/^\w+@\gmail\.com$/),  
          otp:Joi.string().required().min(18),
      });
  const {email} = params;
  console.log(params);
  const body = await req.json();
  const data={email:email,otp:body.otp};
  const { error } = schema.validate(data);
  if (error) {
    console.log(error);
      return NextResponse.json({ message: error.message },{status:422});
  }
  const {otp}=data;
    const existingOTP = await UserOTPVerification.findOneAndDelete({ email, otp });
    if (existingOTP) {
        await sendMail({
            to: email,
            subject: 'Otp Verification',
            message: `<p>OTP SuccessFuly Verified ${email}</p>`,
        });
       return NextResponse.json({ success: true, message: 'OTP verification successful'},{status:200});
    } else {
      return NextResponse.json({ success: false, error: 'Invalid OTP' },{status:400});
    }
    } catch (error) {
        console.error('Error sending OTP:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' },{status:500});
    }
}
