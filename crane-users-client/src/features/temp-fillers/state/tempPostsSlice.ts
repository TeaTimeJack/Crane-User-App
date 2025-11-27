
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type {FillerPostsType } from "../../../types/types.ts"

const fillerPOSTS_URL = "http://localhost:5005/api/user/fillerposts";
// const LICENSE_URL = "http://localhost:5005/api/user/license";

export const fetchUserInfo = createAsyncThunk("userinfo/fetch", async () => {
    try {
        const response = await axios.get(fillerPOSTS_URL,{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        // console.log("the eror happens when u fetch user info: ", error);
        throw  error;
    }
});
// export const fetchLicenseInfo = createAsyncThunk("licenseinfo/fetch", async () => {
//     try {
//         const response = await axios.get(LICENSE_URL,{
//             withCredentials:true
//         })
//         return response.data
//     } catch (error) {
//         console.log("the eror happens when u fetch License info: ", error);
//         throw  error;
//     }
// });

interface initialStateType {
    fillerPosts:FillerPostsType[] | null;
    Status: "idle" | "loading" | "success" | "failed";
}

const initialState:initialStateType = {
  fillerPosts: null,
  Status: "idle",
};

const fillerPostsSlice = createSlice({
  name: "fillerPosts",
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
  },
});

export const {logOut} = fillerPostsSlice.actions;
export default fillerPostsSlice.reducer;