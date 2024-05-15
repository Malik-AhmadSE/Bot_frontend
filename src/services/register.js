import { httpRequest } from "../lib/helpers/httpRequest/request";

export async function registerMail(email){
    const result = await httpRequest.get(`/api/v1/user/signup/otp/${email}`).then((response)=>response.data)
    return result;
}

export async function verifyotp(email,data){
    const result = await httpRequest.post(`/api/v1/user/signup/otp/verify/${email}`,data).then((response)=>response.data)
    return result;
}