import { createSlice } from "@reduxjs/toolkit";
import { cryptoAPI } from "../service/cryptoService";

const initialState ={
  cryptos: [],
  cryptoDetails: {},
  error: null
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {},
  extraReducers: (builder) =>{
    builder
    .addMatcher(
      cryptoAPI.endpoints.fetchCryptos.matchFulfilled,
      (state, action) =>{
        state.cryptos = action.payload.data;
    })
    .addMatcher(
      cryptoAPI.endpoints.fetchCryptoDetails.matchFulfilled,
      (state, action) =>{
        state.cryptoDetails = action.payload.data;
    });
  }
});

export default cryptoSlice.reducer;