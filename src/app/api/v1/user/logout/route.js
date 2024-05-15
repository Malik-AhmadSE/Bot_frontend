
import { ConnectDB } from "@/lib/database/ConnectDB";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
ConnectDB();
export async function GET(req) {
    try {
        await cookies().delete("Token");
      } catch (error) {
        return next(error);
      }
      // 2. response
     return NextResponse.json({ user: null, auth: false },{status:200});
}
