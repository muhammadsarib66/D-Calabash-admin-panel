/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";

export const DashboardApi: any = createAsyncThunk(
  "DashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}dashboard`,
        config
      );
      // console.log(response?.data?.data)
      return response?.data?.data;
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
        console.log(error.response);
      } else if (error.request) {
        toast.error("No response received from the server");
        console.log(error.request);
      } else {
        toast.error("An error occurred while processing your request");
        console.log("Error", error.message);
      }

      // Use rejectWithValue to propagate the error to the rejected action
      return rejectWithValue(error.message);
    }
  }
);
interface initialStateI  {
  isLoading: boolean,
  isError: boolean,
  DashboardData : any

}

const initialState : initialStateI = {
  isLoading: false,
  isError: false,
  DashboardData : {}
};
const DashboardSlicer = createSlice({
  name: "DashboardData",
  initialState,
  reducers: {
  
  },

  extraReducers: (builder) => {
    builder.addCase(DashboardApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DashboardApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.DashboardData = action.payload;
      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(DashboardApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {RecentOrderComing} = DashboardSlicer.actions;
export default DashboardSlicer.reducer;
