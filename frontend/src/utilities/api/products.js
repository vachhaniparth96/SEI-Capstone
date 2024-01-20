import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const { VITE_BASE_URL }= import.meta.env;

export const productAPI = createApi({
    reducerPath: 'productAPI',
    baseQuery: fetchBaseQuery({ baseUrl: VITE_BASE_URL }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => ({
                url: '/products',
                params: {
                    page: params?.page,
                    keyword: params?.keyword,
                    "price[gte]": params?.min,
                    "price[lte]": params?.max,
                    category: params?.category,
                    "ratings[gte]": params?.ratings,
                },
            }),
        }),

        getProductDetails: builder.query({
            query: (id) => `/products/${id}`,
        }),
    })
})

export const { useGetProductsQuery, useGetProductDetailsQuery } = productAPI