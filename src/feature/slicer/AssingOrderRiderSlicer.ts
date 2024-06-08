/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl,  config } from "./Slicer";
import { toast } from "react-toastify";
import { GetOrderListApi } from "./GetOrderListSlicer";
import { DashboardApi } from "./DashboardSlicer";


export const AssingOrderApi: any = createAsyncThunk(
  "dcalabash/assignorder",
  async (Obj: any, {dispatch}) => {
    return await axios
    .post(`${baseUrl}orders/assign-rider`, Obj,config)
    .then((resp) => {
    // console.log(resp);
      toast.success(resp?.data?.message);
      dispatch(DashboardApi())
      dispatch(GetOrderListApi())
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
const AssingOrderRiderSlicer = createSlice({
  name :"assignorder",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(AssingOrderApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AssingOrderApi.fulfilled, (state) => {
      state.isLoading = false;
      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(AssingOrderApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {} = AddPortfolioSlicer.actions;
export default AssingOrderRiderSlicer.reducer;
