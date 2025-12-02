
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type {FillerPostsType } from "../../../types/types.ts"

// const fillerPOSTS_URL = "http://localhost:5005/api/fillerposts/";
const fillerPOSTS_URL = import.meta.env.VITE_BASE_URL+"/fillerposts/";

export const fetchAllPosts = createAsyncThunk("fillerPosts/fetch", async () => {
    try {
        const response = await axios.get(fillerPOSTS_URL)
        return response.data
    } catch (error) {
        // console.log("the eror happens when u fetch user info: ", error);
        throw  error;
    }
});


interface initialStateType {
    fillerPosts:FillerPostsType[] | null;
    status: "idle" | "loading" | "success" | "failed";
}

const initialState:initialStateType = {
  fillerPosts: null,
  status: "idle",
};

const fillerPostsSlice = createSlice({
  name: "fillerPosts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllPosts.pending, (state) => {
      state.status = "loading";
    });
      builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.fillerPosts = action.payload; 
      });
      builder.addCase(fetchAllPosts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = fillerPostsSlice.actions;
export default fillerPostsSlice.reducer;