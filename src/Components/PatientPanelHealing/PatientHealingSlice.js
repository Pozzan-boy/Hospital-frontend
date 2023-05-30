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
    dispatch(fetchHealingLoading());
    console.log(token)
    try {
        const response = await axios.get(baseUrl,
            {
                headers: {
                    'authorization': token
                }
            });
        dispatch(fetchHealingSuccess(response.data));
    } catch (error) {
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
