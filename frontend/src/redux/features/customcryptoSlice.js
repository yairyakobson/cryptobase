import { createSlice } from "@reduxjs/toolkit";
import { customCryptoAPI } from "../service/customcryptoService";

const initialState ={
  customCryptos: [],
  cryptoDetails: {},
  error: null
};

const customcryptoSlice = createSlice({
  name: "customcrypto",
  initialState,
  reducers: {},
  extraReducers: (builder) =>{
    builder
    .addMatcher(
      customCryptoAPI.endpoints.createCustomCryptos.matchFulfilled,
      (state, action) => {
        // Use concat to add the new cryptocurrency
        state.customCryptos = state.customCryptos?.concat(action.payload.data);
      }
    )
    .addMatcher(
      customCryptoAPI.endpoints.fetchCustomCryptos.matchFulfilled,
      (state, action) =>{
        state.customCryptos = action.payload.data;
    })
    .addMatcher(
      customCryptoAPI.endpoints.fetchCustomCryptoDetails.matchFulfilled,
      (state, action) =>{
        const cryptoId = action.payload.data?.id;
        state.cryptoDetails[cryptoId] = action.payload.data;
    })
    .addMatcher(
      customCryptoAPI.endpoints.deleteCustomCryptos.matchFulfilled,
      (state, action) =>{
        const id = action.meta.arg;
        state.customCryptos = state.customCryptos?.filter(crypto => crypto.id !== id);
    });
  }
});

export default customcryptoSlice.reducer;