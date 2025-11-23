
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type {UserTypeFromAPI} from "../../../types/types.ts"

const INFO_URL = "http://localhost:5005/api/user/info";

// export const fetchUserInfo = createAsyncThunk("posts/fetch", async () => {
//   const response = await fetch(INFO_URL);
//   const data = await response.json();
//   return data;
// });
export const fetchUserInfo = createAsyncThunk("userinfo/fetch", async () => {
    try {
        const response = await axios.get(INFO_URL,{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        console.log("the eror happens when u fetch user info: ", error);
    }
});

interface initialStateType {
    info:UserTypeFromAPI | null;
    status: "idle" | "loading" | "success" | "failed";
}

const initialState:initialStateType = {
  info: null,
  status: "idle",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = "success";
        state.info = action.payload;
      }),
      builder.addCase(fetchUserInfo.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = userInfoSlice.actions;
export default userInfoSlice.reducer;