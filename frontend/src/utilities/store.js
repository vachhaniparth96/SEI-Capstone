import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api/products";

export const store = configureStore({
    reducer: {
        [productAPI.reducerPath]: productAPI.reducer,
        // cart: cartReducer,
        // user: userReducer,
    }, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([productAPI.middleware])
});