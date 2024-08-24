import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_EC2_FRONTEND_URL || "/api/v1"

export const customCryptoAPI = createApi({
  reducerPath: "customCryptoAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  endpoints: (builder) =>({
    createCustomCryptos: builder.mutation({
      query(body){
        return{
          url: "/customCrypto/add",
          method: "POST",
          body
        }
      }
    }),
    fetchCustomCryptos: builder.mutation({
      query(body){
        return{
          url: "/customCrypto",
          method: "GET",
          body
        }
      }
    }),
    fetchCustomCryptoDetails: builder.query({
      query: (id) =>({
        url: `/customCrypto/${id}`,
        method: "GET"
      })
    }),
    deleteCustomCryptos: builder.mutation({
      query(id){
        return{
          url: `/customCrypto/${id}`,
          method: "DELETE"
        }
      }
    })
  })
});

export const {
  useCreateCustomCryptosMutation,
  useFetchCustomCryptosMutation,
  useFetchCustomCryptoDetailsQuery,
  useDeleteCustomCryptosMutation
} = customCryptoAPI;