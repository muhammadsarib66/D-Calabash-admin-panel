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
export const AddProductApi: any = createAsyncThunk(
  "dcalabash/AddProduct",
  async (Obj: any, {dispatch}) => {
    
    const {image , name, description, price, available, ingradients, category} = Obj;
    // console.log(ingradients)
    const formData = new FormData();
    formData.append("image", image);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("available", available);
   formData.append("ingredients", ingradients);
  formData.append("category", category);
 
    return await axios
    .post(`${baseUrl}products/product`, formData ,config)
    .then((resp) => {
 
      toast.success("Product Added Successfully");
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
const AddProductSlicer = createSlice({
  name :"AddProduct",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(AddProductApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddProductApi.fulfilled, (state) => {
      state.isLoading = false;
      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(AddProductApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {} = AddPortfolioSlicer.actions;
export default AddProductSlicer.reducer;
