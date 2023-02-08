import { configureStore } from "@reduxjs/toolkit";

import account from "../components/Login/loginSlice";
import doctors from "../components/DoctorsList/DoctorsListSlice"
const store = configureStore({
    reducer: {account, doctors},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;