/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";

export const GetProductListApi: any = createAsyncThunk(
  "dcalabash/GetProductList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}products/products-listing`,
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

const initialState = {
  isLoading: false,
  isError: false,
  Products: [],
};
const GetProductListSlicer = createSlice({
  name: "GetProductList",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(GetProductListApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetProductListApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Products = action.payload;
      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(GetProductListApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {} = AddPortfolioSlicer.actions;
export default GetProductListSlicer.reducer;
