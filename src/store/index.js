import { configureStore } from "@reduxjs/toolkit";

import account from "../components/Login/loginSlice";

const store = configureStore({
    reducer: {account},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;