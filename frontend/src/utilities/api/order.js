import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderAPI = createApi({
	reducerPath: "orderApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
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
