import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const baseUrl = "/patient/getHealing";
const initialState = {
    loadingStatus: 'idle',
    status: 'idle',
    error: null,
    healing: {},
}
export const fetchHealing = (token) => async (dispatch) => {
    dispatch(fetchHealingLoading()); // set loading status
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
        dispatch(fetchHealingSuccess(response.data));
       
    } catch (error) {
        // Dispatch failure action with error message
        dispatch(fetchHealingFailure(error.message));
    }
};

const healingSlice = createSlice({
    name: 'patientHealing',
    initialState,
    reducers: {
        fetchHealingLoading: (state) => {
            state.loadingStatus = 'loading';
        },
        fetchHealingSuccess: (state, action) => {

            state.loadingStatus = 'succeeded';
            state.healing = action.payload;
            state.error = null;

        },
        fetchHealingFailure: (state, action) => {
            state.loadingStatus = 'failed';
            state.error = action.payload.message;
        },

    },
    extraReducers: (builder) => {
        builder
            .addDefaultCase(() => { })
    }
})

const { actions, reducer } = healingSlice;
export default reducer;
export const {
    fetchHealingSuccess,
    fetchHealingFailure,
    fetchHealingLoading
} = actions


