import { createSlice } from "@reduxjs/toolkit";
export const token = localStorage.getItem("admintoken");
const UserDetail = JSON.parse(localStorage.getItem("AdminUser") as string);

export const issubadmin = UserDetail ? UserDetail?.issubadmin : false;
export const Userid = UserDetail ? UserDetail?._id : "empty";
export const baseUrl = 'https://dcalabashapis.veriorinc.com/'
export const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",

    Authorization: `Bearer ${token}`,
  },
};

const initialState = {
  value: 2,
};

export const Slicer = createSlice({
  name: "slicer",
  initialState,
  reducers: {},
});

export default Slicer.reducer;
