
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type {UserTypeFromAPI, licenseTypeFromAPI} from "../../../types/types.ts"

const INFO_URL = "http://localhost:5005/api/user/info";

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
    license: licenseTypeFromAPI | null;
    status: "idle" | "loading" | "success" | "failed";
}

const initialState:initialStateType = {
  info: null,
  license: null,
  status: "idle",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    logOut:(state) =>{
      state.info = null;
      state.status = "idle";
    }
  },
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

export const {logOut} = userInfoSlice.actions;
export default userInfoSlice.reducer;