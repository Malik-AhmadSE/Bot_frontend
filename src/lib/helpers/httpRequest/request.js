import axios from "axios";

export const httpRequest=axios.create({
    baseURL:process.env.BACKENDPATH,
    withCredentials:true,
    headers: {
        "Content-Type": "application/json",
      },
})