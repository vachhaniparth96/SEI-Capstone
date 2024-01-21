import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setLoading, setUser } from "../userSlice";
const { VITE_BASE_URL }= import.meta.env;

export const userAPI = createApi({
	reducerPath: "userAPI",
	baseQuery: fetchBaseQuery({ baseUrl: `${VITE_BASE_URL}` }),
	tagTypes: ["User"],
	endpoints: (builder) => ({
		getMe: builder.query({
			query: () => `/users/profile`,
			transformResponse: (result) => result.user,
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUser(data));
					dispatch(setIsAuthenticated(true));
					dispatch(setLoading(false));
				} catch (error) {
					dispatch(setLoading(false));
					console.log(error);
				}
			},
			providesTags: ["User"],
		}),
	}),
});

export const {
	useGetMeQuery,
} = userAPI;
