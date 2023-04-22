import { configureStore , combineReducers} from "@reduxjs/toolkit";

import account from "../components/Login/loginSlice";
import doctors from "../components/DoctorsList/DoctorsListSlice"

const rootReducer = combineReducers({
    account: account,
    doctors: doctors,
  
  });
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;