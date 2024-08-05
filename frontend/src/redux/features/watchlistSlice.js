import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
  customCryptos: [],
  cryptoDetails: {},
  status: "idle",
  error: null
};

const baseURL = "http://51.17.2.172:4000"

export const createCustomCryptos = createAsyncThunk("watchlist/createCustomCryptos", async(newCrypto, { rejectWithValue }) =>{
  try{
    const response = await axios.post(`${baseURL}/api/v1/watchlist/add`, newCrypto);
    return response.data;
  }
  catch(error){
    console.error("Error creating custom cryptocurrency:", error.response ? error.response.data : error.message);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const fetchCustomCryptos = createAsyncThunk("watchlist/fetchCustomCryptos", async() =>{
  const response = await axios.get(`${baseURL}/api/v1/watchlist`);
  return response.data;
});

export const fetchCustomCryptoDetails = createAsyncThunk("crypto/fetchCustomCryptoDetails", async(id) =>{
  const response = await axios.get(`${baseURL}/api/v1/watchlist/${id}`);
  return response.data;
});

export const deleteCustomCryptos = createAsyncThunk("watchlist/deleteCustomCryptos", async(id) =>{
  const response = await axios.delete(`${baseURL}/api/v1/watchlist/${id}`);
  return response.data;
});

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {},
  extraReducers: (builder) =>{
    builder
    .addCase(createCustomCryptos.pending, (state) =>{
      state.status = "loading";
    })
    .addCase(createCustomCryptos.fulfilled, (state, action) =>{
      state.status = "succeeded";
    })
    .addCase(createCustomCryptos.rejected, (state, action) =>{
      state.status = "failed";
      state.error = action.error.message;
    })
    .addCase(fetchCustomCryptos.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchCustomCryptos.fulfilled, (state, action) =>{
      state.status = "succeeded";
      state.customCryptos = action.payload;
    })
    .addCase(fetchCustomCryptos.rejected, (state, action) =>{
      state.status = "failed";
      state.error = action.error.message;
    })
    .addCase(fetchCustomCryptoDetails.pending, (state) =>{
      state.status = "loading";
    })
    .addCase(fetchCustomCryptoDetails.fulfilled, (state, action) =>{
      state.status = "succeeded";
      state.cryptoDetails = action.payload;
    })
    .addCase(fetchCustomCryptoDetails.rejected, (state, action) =>{
      state.status = "failed";
      state.error = action.error.message;
    })
    .addCase(deleteCustomCryptos.pending, (state) =>{
      state.status = "loading";
    })
    .addCase(deleteCustomCryptos.fulfilled, (state, action) =>{
      state.status = "succeeded";
      state.customCryptos = state.customCryptos.filter(crypto => crypto.id !== action.payload.id);
    })
    .addCase(deleteCustomCryptos.rejected, (state, action) =>{
      state.status = "failed";
      state.error = action.error.message;
    });
  }
});

export const { addCrypto } = watchlistSlice.actions;

export default watchlistSlice.reducer;