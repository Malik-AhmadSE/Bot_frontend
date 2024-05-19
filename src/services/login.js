import { httpRequest } from "../lib/helpers/httpRequest/request";

export async function userLogin(data){
    const result = await httpRequest.post("/api/v1/user/login",data).then((response)=>response)
    return result;
}