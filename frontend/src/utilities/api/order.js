import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const { VITE_BASE_URL }= import.meta.env;

export const orderAPI = createApi({
	reducerPath: "orderApi",
	baseQuery: fetchBaseQuery({ baseUrl: `${VITE_BASE_URL}` }),
	endpoints: (builder) => ({
		createNewOrder: builder.mutation({
			query(body) {
				return {
					url: "/orders/new",
					method: "POST",
					body,
				};
			},
		}),
		stripeCheckoutSession: builder.mutation({
			query(body) {
				return {
					url: "/payment/checkout_session",
					method: "POST",
					body,
				};
			},
		}),
	}),
});

export const { useCreateNewOrderMutation, useStripeCheckoutSessionMutation } =
	orderAPI;
