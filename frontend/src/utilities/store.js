import { configureStore, createReducer } from "@reduxjs/toolkit";
import { productAPI } from "./api/products";
import { authAPI } from "./api/auth";
import { userAPI } from "./api/user";
import { orderAPI } from "./api/order";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice"

export const store = configureStore({
    reducer: {
        auth: userReducer,
        cart: cartReducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [orderAPI.reducerPath]: orderAPI.reducer,

    }, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([productAPI.middleware, authAPI.middleware, userAPI.middleware, orderAPI.middleware])
});