import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const baseUrl = "/patient/getInfo";
const initialState = {
    loadingStatus: 'idle',
    status: 'idle',
    error: null,
    patient: {},
}
export const fetchPatient = (token) => async (dispatch) => {
    dispatch(fetchPatientLoading()); // set loading status
    console.log(token)
    try {
        // Make API call to delete item
        const response = await axios.get(baseUrl,
            {
                headers: {
                    'authorization': token
                }
            });
        // Dispatch success action with deleted item ID
        dispatch(fetchPatientSuccess(response.data));
       
    } catch (error) {
        // Dispatch failure action with error message
        dispatch(fetchPatientFailure(error.message));
    }
};


const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
       fetchPatientLoading: (state) => {
            state.loadingStatus = 'loading';
        },
        fetchPatientSuccess: (state, action) => {

            state.loadingStatus = 'succeeded';
            state.patient = action.payload;
            state.error = null;

        },
        fetchPatientFailure: (state, action) => {
            state.loadingStatus = 'failed';
            state.error = action.payload.message;
        },

    },
    extraReducers: (builder) => {
        builder
            .addDefaultCase(() => { })
    }
})

const { actions, reducer } = patientSlice;
export default reducer;
export const {
    fetchPatientSuccess,
    fetchPatientFailure,
    fetchPatientLoading
} = actions


