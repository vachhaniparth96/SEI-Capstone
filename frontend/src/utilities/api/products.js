import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productAPI = createApi({
    reducerPath: 'productAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => ({
                url: '/products',
                params: {
                    page: params.page
                }
            })
        }),

        getProductDetails: builder.query({
            query: (id) => `/products/${id}`,
        }),
        // createProduct: builder.mutation({
        //     query: (product) => ({
        //         url: '/products',
        //         method: 'POST',
        //         body: product,
        //     }),
        // }),
        // updateProduct: builder.mutation({
        //     query: (product) => ({
        //         url: `/products/${product.id}`,
        //         method: 'PUT',
        //         body: product,
        //     }),
        // }),
        // deleteProduct: builder.mutation({
        //     query: (id) => ({
        //         url: `/products/${id}`,
        //         method: 'DELETE',
        //     }),
        // }),
    })
})

export const { useGetProductsQuery, useGetProductDetailsQuery } = productAPI