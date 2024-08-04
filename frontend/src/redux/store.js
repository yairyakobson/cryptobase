import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./features/cryptoSlice.js";
import watchlistReducer from "./features/watchlistSlice.js";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    watchlist: watchlistReducer
  }
});