import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: { userId: null, token: Cookies.get("token") || "" },
  reducers: {
    loginSuccess: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      Cookies.set("token", action.payload.token, { expires: 7 }); // Token lưu trong 7 ngày
    },
    logout: (state) => {
      state.userId = null;
      state.token = "";
      Cookies.remove("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
