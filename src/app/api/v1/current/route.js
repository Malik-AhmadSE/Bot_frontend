import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/database/ConnectDB";
import UserModel from "@/models/userModel";
import jwt from "jsonwebtoken";
ConnectDB();
export async function GET(req){

    const token =req.cookies.get("Token")?.value;
    const data=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    try{
    const user=await UserModel.findById(data.userID).select("-password"); 
    return NextResponse.json({message:user,auth:true},{status:200});     
    }catch(error){
        return NextResponse.json({message:"Internal Server Error"},{status:500});
    }
    
}