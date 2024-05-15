import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  _id: "1",
  name: "",
  email: "",
//   Status:"",
  auth: false,
  dob:"",
  address:"",
  password:"",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id,name,email,dob,auth,address,password} = action.payload;
      state._id = _id;
      state.name = name;
      state.email = email;
      state.auth = auth;
      state.dob=dob;
      state.address=address;
      state.password=password;
    },
    resetUser: (state) => {
      state._id = "1";
      state.name = "";
      state.email = "";
      state.dob="";
      state.auth = false;
      state.address="";
      state.password="";
    },
   
  },
});

export const { setUser, resetUser} = userSlice.actions;

export default userSlice.reducer;