import { httpRequest } from "../lib/helpers/httpRequest/request";

export async function current(){
    const result = await httpRequest.get(`/api/v1/current`).then((response)=>response)
    return result;
}
