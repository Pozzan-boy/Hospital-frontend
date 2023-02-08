import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux'
import axios from "axios";
const baseUrl = "/doctor/getAllDoctors";
const initialState = {
    doctors: {},
    currentPage: 1,
    doctorsLoadingStatus: 'idle',
    doctor: {}
    
}

// const convertArrayToObject = (array, key) => {
//     const initialValue = {};
//     return array.reduce((obj, item) => {
//       return {
//         ...obj,
//         [item[key]]: item,
//       };
//     }, initialValue);
// };
export const fetchDoctors = createAsyncThunk(
    'doctors/fetchdoctors',
    async (token) => {
        
        const response = await axios.get(baseUrl, {
            headers: {
                'authorization': token
            }
        });
        console.log(response.data);
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
        }
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
            .addDefaultCase(() => {})
    }
})
const {actions, reducer} = doctorsSlice;
export default reducer;
export const {
    doctorsFetching,
    doctorsFetched,
    doctorsFetchingError,
    setCurrentPage,
    setDoctors
} = actions


