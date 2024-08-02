/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl,  token } from "./Slicer";
import { toast } from "react-toastify";
import { GetProductListApi } from "./GetProductListSlicer";
import { socketFire } from "../../components/UpdateSocket";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",

    Authorization: `Bearer ${token}`,
  },
};
export const EditProductApi: any = createAsyncThunk(
  "editProduct",
  async (Obj: any, {dispatch}) => {
 
    return await axios
    .put(`${baseUrl}products/product/${Obj?.id}`, Obj?.item ,config)
    .then((resp) => {
 console.log(resp)
      toast.success("Product Edit Successfully");
      // socket.emit('product-updates');
      socketFire();
      dispatch(GetProductListApi())
      return resp.data;
    })
    .catch((err) => {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.status === 400) {
        //   toast.error("Bad Request: User with the same details already exists.");
          toast.error(err.response.data);
          console.log("Error 400: Bad Request", err.response.data);
        } else {
          toast.error(`Error: ${err.response.data.message}`);
          console.log(err.response.data);
        }
      } else if (err.request) {
        // The request was made but no response was received
        toast.error("No response received from the server.");
        // console.log(err.request);
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
const EditProductSlicer = createSlice({
  name :"editproduct",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(EditProductApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(EditProductApi.fulfilled, (state) => {
      state.isLoading = false;
      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(EditProductApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {} = AddPortfolioSlicer.actions;
export default EditProductSlicer.reducer;
