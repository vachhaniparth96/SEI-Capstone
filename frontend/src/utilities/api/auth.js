import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { userAPI } from "./user"

const { VITE_BASE_URL }= import.meta.env;

export const authAPI = createApi({
    reducerPath: "authAPI",
    baseQuery: fetchBaseQuery({ baseUrl: `${VITE_BASE_URL}` }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query(body) {
                return {
                    url: "/login",
                    method: "POST",
                    body,
                }
            }
        }),
        register: builder.mutation({
            query(body) {
                return {
                    url: '/register',
                    method: "POST",
                    body,
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(userAPI.endpoints.getMe.initiate(null));
                } catch(error) {
                    console.log(error)
                }
            },
        })
    })
})

export const { useLoginMutation, useRegisterMutation } = authAPI