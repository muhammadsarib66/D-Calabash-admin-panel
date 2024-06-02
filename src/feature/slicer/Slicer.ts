import { createSlice } from '@reduxjs/toolkit'

    export const baseUrl = "http://localhost:3002/";
    export const config = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          Authorization: `Bearer ${'a6b4d9aba8128a07146dc3c6892805112c99172ca050fb09c0be38cef2b35ae3'}`,
        },
      };

const initialState = {
  value: 2,
}

export const Slicer = createSlice({
  name: 'slicer',
  initialState,
  reducers : {}
})


export default Slicer.reducer