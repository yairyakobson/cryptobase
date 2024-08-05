import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
  cryptos: [],
  cryptoDetails: {},
  status: "idle",
  error: null
};

const baseURL = "http://51.17.112.249:4000"

export const fetchCryptos = createAsyncThunk("crypto/fetchCryptos", async() =>{
  const response = await axios.get(`${baseURL}/api/v1/crypto/rates`);
  return response.data;
});

export const fetchCryptoDetails = createAsyncThunk("crypto/fetchCryptoDetails", async(id) =>{
  const response = await axios.get(`${baseURL}/api/v1/crypto/details/${id}`);
  return response.data;
});

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {},
  extraReducers: (builder) =>{
    builder
    .addCase(fetchCryptos.pending, (state) =>{
    state.status = "loading";
    })
    .addCase(fetchCryptos.fulfilled, (state, action) =>{
      state.status = "succeeded";
      state.cryptos = action.payload.data;
    })
    .addCase(fetchCryptos.rejected, (state, action) =>{
      state.status = "failed";
      state.error = action.error.message;
    })
    .addCase(fetchCryptoDetails.fulfilled, (state, action) =>{
      state.cryptoDetails = action.payload.data;
    });
  }
});

export default cryptoSlice.reducer;