import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux'
import axios from "axios";
const baseUrl = "http://localhost:3001/doctor/getAllDoctors";

const initialState = {
    doctors: {},
    currentPage: 1,
    doctorsLoadingStatus: 'idle',
    searchedDoctors: "",
    doctorsCount:0,
    doctorsCountStatus: 'idle',
    doctor: {},
    
}


export const fetchDoctors = createAsyncThunk(
    'doctors/fetchdoctors',
    async ([token, count, start]) =>{
        
        const response = await axios.get(baseUrl, {
            headers: {
                'authorization': token,
                'count':  count,
                'from':  start
                

            }
        });
        // console.log(response.data);
        return response.data;
        
    }  
);
export const getDoctorsCount = createAsyncThunk(
    'doctors/getDoctorsCount',
    async (token) =>{
        
        const response = await axios.get(baseUrl, {
            headers: {
                'authorization': token,
            }
        });
        // console.log(response.data);
        return response.data;
        
    }  
);
const doctorsSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {
        setCurrentPage(state, action){
            state.currentPage = action.payload;
        },
        setDoctor(state, action){
            state.doctor = action.payload;
        },
        handleSearchDoctors(state, action){
            state.searchedDoctors = action.payload;
        },
        
    },
    extraReducers: (builder) =>{
        builder
            .addCase(fetchDoctors.pending, state => {state.doctorsLoadingStatus = 'loading'})
            .addCase(fetchDoctors.fulfilled, (state, action) =>{
                state.doctorsLoadingStatus = 'idle';
                state.doctors = action.payload; 
            })
            .addCase(fetchDoctors.rejected, state => {
                state.doctorsLoadingStatus = 'error';
                console.log('error');
            })
            .addCase(getDoctorsCount.pending, state => {state.doctorsCountStatus = 'loading'})
            .addCase(getDoctorsCount.fulfilled, (state, action) =>{
                state.doctorsCountStatus = 'idle';
                console.log('22');
                state.doctorsCount = action.payload.length; 
            })
            .addCase(getDoctorsCount.rejected, state => {
                state.doctorsCountStatus = 'error';
                console.log('error');
            })
            .addDefaultCase(() => {})
    }
})
const {actions, reducer} = doctorsSlice;
export default reducer;
export const {
    PageIncrement,
    PageDecrement,
    setCurrentPage,
    setDoctor,
    handleSearchDoctors,
    searchByName
} = actions


