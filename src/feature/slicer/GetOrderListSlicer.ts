/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";

export const GetOrderListApi: any = createAsyncThunk(
  "dcalabash/OrderList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}orders/orders-admin`, config);
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
  Orders: [],
};
const GetOrderListSlicer = createSlice({
  name: "OrderList",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(GetOrderListApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetOrderListApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Orders = action.payload
      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(GetOrderListApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {} = AddPortfolioSlicer.actions;
export default GetOrderListSlicer.reducer;
