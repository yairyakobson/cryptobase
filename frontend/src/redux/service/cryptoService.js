import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_EC2_FRONTEND_URL || "/api/v1"

export const cryptoAPI = createApi({
  reducerPath: "cryptoAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  endpoints: (builder) =>({
    fetchCryptos: builder.mutation({
      query(body){
        return{
          url: "/crypto/rates",
          method: "GET",
          body
        }
      }
    }),
    fetchCryptoDetails: builder.query({
      query: (id) =>({
        url: `/crypto/details/${id}`,
        method: "GET"
      })
    })
  })
});

export const {
  useFetchCryptosMutation,
  useFetchCryptoDetailsQuery
} = cryptoAPI;