/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";
import { GetRidersListApi } from "./GetRidersSlicer";
// import { socket } from "../../socketfire";

export const DeleteRiderApi: any = createAsyncThunk(
  "dcalabash/DeleteRider",
  async (Obj: any, {dispatch}) => {
    return await axios
    .post(`${baseUrl}riders/delete-rider`, Obj,config)
    .then((resp) => {
    // console.log(resp);
    // socket.emit("rider-updated",Obj?.riderId)

      toast.success(resp?.data?.message);
      dispatch(GetRidersListApi())
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
          // console.log(err.response.data);
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
const DeleteRiderSlicer = createSlice({
  name :"dcalabash/DeleteRider",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(DeleteRiderApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteRiderApi.fulfilled, (state) => {
      state.isLoading = false;
      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(DeleteRiderApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {} = AddPortfolioSlicer.actions;
export default DeleteRiderSlicer.reducer;
