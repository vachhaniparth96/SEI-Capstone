import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000"}),
    // tagTypes: ["User"],
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => `/users/profile`,
            // transformResponse: (result) => result.user,
        }),
    }),
})

export const { useGetProfileQuery } = userAPI