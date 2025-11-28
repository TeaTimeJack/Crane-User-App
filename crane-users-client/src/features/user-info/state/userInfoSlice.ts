
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type {UserTypeFromAPI, licenseTypeFromAPI} from "../../../types/types.ts"

const INFO_URL = "http://localhost:5005/api/user/info";
const LICENSE_URL = "http://localhost:5005/api/user/license";

export const fetchUserInfo = createAsyncThunk("userinfo/fetch", async () => {
    try {
        const response = await axios.get(INFO_URL,{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        // console.log("the eror happens when u fetch user info: ", error);
        throw  error;
    }
});
export const fetchLicenseInfo = createAsyncThunk("licenseinfo/fetch", async () => {
    try {
        const response = await axios.get(LICENSE_URL,{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        console.log("the eror happens when u fetch License info: ", error);
        throw  error;
    }
});

interface initialStateType {
    info:UserTypeFromAPI | null;
    license: licenseTypeFromAPI | null;
    infoStatus: "idle" | "loading" | "success" | "failed";
    licenseStatus: "idle" | "loading" | "success" | "failed";
}

const initialState:initialStateType = {
  info: null,
  license: null,
  infoStatus: "idle",
  licenseStatus: "idle",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    logOut:(state) =>{
      state.info = null;
      state.infoStatus = "idle";
      state.license = null;
      state.licenseStatus = "idle";
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.infoStatus = "loading";
    });
      builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.infoStatus = "success";
        state.info = action.payload; 
      });
      builder.addCase(fetchUserInfo.rejected, (state) => {
        state.infoStatus = "failed";
      });
      builder.addCase(fetchLicenseInfo.pending, (state) => {
      state.licenseStatus = "loading";
    });
      builder.addCase(fetchLicenseInfo.fulfilled, (state, action) => {
        state.licenseStatus = "success";
        state.license = action.payload; 
      });
      builder.addCase(fetchLicenseInfo.rejected, (state) => {
        state.licenseStatus = "failed";
      });
  },
});

export const {logOut} = userInfoSlice.actions;
export default userInfoSlice.reducer;