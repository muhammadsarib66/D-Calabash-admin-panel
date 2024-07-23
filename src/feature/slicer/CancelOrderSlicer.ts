/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";
import { GetOrderListApi } from "./GetOrderListSlicer";
import { DashboardApi } from "./DashboardSlicer";

export const CancelOrderApi: any = createAsyncThunk(
  "dcalabash/CancelOrder",
  async (Obj: any, {dispatch}) => {
    console.log(Obj , "====>Cancel")
    return await axios
    .post(`${baseUrl}cancel-order`, Obj,config)
    .then((resp) => {
    // console.log(resp);
      toast.success(resp?.data?.message);
      dispatch(GetOrderListApi())
      dispatch(DashboardApi())
      return resp.data;
    })
    .catch((err) => {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.status === 400) {
        //   toast.error("Bad Request: User with the same details already exists.");
          toast.error(err.response.data.message);
          console.log("Error 400: Bad Request", err.response.data);
        } else {
          toast.error(`Error: ${err.response.data.message}`);
          console.log(err.response.data);
        }
      } else if (err.request) {
        // The request was made but no response was received
        toast.error("No response received from the server.");
        console.log(err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An error occurred while processing your request.");
        console.log("Error", err.message);
      }
      return err.message;
    });
  }
);

const initialState = {
  isLoading: false,
  isError: false,
};
const CancelOrderSlicer = createSlice({
  name :"cancelOrder",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(CancelOrderApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CancelOrderApi.fulfilled, (state) => {
      state.isLoading = false;
      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(CancelOrderApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {} = AddPortfolioSlicer.actions;
export default CancelOrderSlicer.reducer;
