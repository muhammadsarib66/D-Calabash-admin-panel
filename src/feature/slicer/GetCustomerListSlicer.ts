/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";

export const GetCustomerApi: any = createAsyncThunk(
  "dcalabash/customerList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}users/customers`, config);
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

const initialState = {
  isLoading: false,
  isError: false,
  Customers: [],
};
const GetCustomerListSlicer = createSlice({
  name: "customerList",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(GetCustomerApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetCustomerApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Customers = action.payload
      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(GetCustomerApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {} = AddPortfolioSlicer.actions;
export default GetCustomerListSlicer.reducer;
