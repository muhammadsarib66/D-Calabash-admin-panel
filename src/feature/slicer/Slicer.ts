import { createSlice } from "@reduxjs/toolkit";

// export const baseUrl = "http://localhost:3002/";
// export const token = 'a6b4d9aba8128a07146dc3c6892805112c99172ca050fb09c0be38cef2b35ae3'
export const token = localStorage.getItem('admintoken')
const UserDetail = JSON.parse(localStorage.getItem('AdminUser') as string);
export const issubadmin = UserDetail ? UserDetail?.issubadmin : false;
export const Userid = UserDetail ? UserDetail?._id  : "empty";

console.log(issubadmin);
// export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVsbGlvdEBkY2FsYWJhc2guY29tIiwiaWF0IjoxNzE3NjcwMjQzfQ.vIefeJ7XQAwKDotv7vEhFodNGSybifW7h0mXbf9lw4o" 
export const baseUrl = "https://dcalabash-backend-819bebaeeb98.herokuapp.com/";
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
