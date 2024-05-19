import { httpRequest } from "../lib/helpers/httpRequest/request";

export async function resetMail(data){
    const result = await httpRequest.post(`/api/v1/user/password/reset/mail`,data).then((response)=>response)
    return result;
}

export async function resetPassword(id,data){
    const result = await httpRequest.post(`/api/v1/user/password/reset/${id}`,data).then((response)=>response)
    return result;
}

