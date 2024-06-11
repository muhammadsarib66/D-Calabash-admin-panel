/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";
import { GetOrderListApi } from "./GetOrderListSlicer";
import { DashboardApi } from "./DashboardSlicer";

export const DeleteOrderApi: any = createAsyncThunk(
  "dcalabash/DeleteOrder",
  async (Obj: any, {dispatch}) => {
    return await axios
    .post(`${baseUrl}orders/delete-order`, Obj,config)
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
const DeleteOrderSlicer = createSlice({
  name :"dcalabash/DeleteOrder",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(DeleteOrderApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteOrderApi.fulfilled, (state) => {
      state.isLoading = false;
      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(DeleteOrderApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {} = AddPortfolioSlicer.actions;
export default DeleteOrderSlicer.reducer;
