import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api/products";
import { authAPI } from "./api/auth";
import { userAPI } from "./api/user";
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        auth: userReducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,

    }, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([productAPI.middleware, authAPI.middleware, userAPI.middleware])
});