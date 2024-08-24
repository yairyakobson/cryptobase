// eslint-disable-next-line no-unused-vars
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { cryptoAPI } from "./service/cryptoService.js";
import { customCryptoAPI } from "./service/customcryptoService.js";

import cryptoReducer from "./features/cryptoSlice.js";
import customcryptoReducer from "./features/customcryptoSlice.js";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    customcrypto: customcryptoReducer,
    [cryptoAPI.reducerPath]: cryptoAPI.reducer,
    [customCryptoAPI.reducerPath]: customCryptoAPI.reducer
  },

  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat([
    cryptoAPI.middleware,
    customCryptoAPI.middleware
  ])
});