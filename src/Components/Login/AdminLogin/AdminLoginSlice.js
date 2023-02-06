import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loginData: {},
    adminLoadingStatus: 'idle'

}

export const fetchAdmin = createAsyncThunk(
    "admin/fetchAdmin",
     (data) => {
        axios.post('http://localhost:3001/auth/login', data)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  );
const adminLoginSlice = createSlice({
    name: 'adminLogin',
    initialState,
    reducers: {
        adminLoginFetched: (state, action) => {
            state.loginData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAdmin.pending, state => {state.adminLoadingStatus = 'loading'})
        .addCase(fetchAdmin.fulfilled, (state, action) => {
            state.adminLoadingStatus = 'idle';
            state.loginData = action.payload;
        })
        .addCase(fetchAdmin.rejected, state => {
            state.adminLoadingStatus = 'error';
        })
        .addDefaultCase(() => {})
           
    }
});

const {actions, reducer} = adminLoginSlice;

export default reducer;
export const {
    adminLoginFetching,
    adminLoginFetched,
    adminLoginFetchingError,
} = actions;