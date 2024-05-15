'use client'
import React,{ useState, useEffect } from "react";
import { setUser } from "@/lib/Store/features/auth/auth";
import { useDispatch } from "react-redux";
import axios from "axios";
const internalApiPath = process.env.INTERNALAPIPATH;
function useAutoLogin() {
  // const [loading, setLoading] = useState(true);
  let loading=true;
  const dispatch = useDispatch();
  useEffect(() => {
    (async function autoLoginApiCall() {
      try {
        const response = await axios.get(
          `${internalApiPath}/api/v1/user/refresh`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          // 1. setUser
          const user = {
            _id: response.data.user._id,
            name: response.data.user.name,
            email: response.data.user.email,
            auth: response.data.auth,
            dob: response.data.user.dob,
            address:response.data.user.address,
            password:response.data.user.password,
          };

          dispatch(setUser(user));
        }
      } catch (error) {
        //
      } finally {
        loading=false;
      }
    })();
  }, []);

  return loading;
}

export default useAutoLogin;