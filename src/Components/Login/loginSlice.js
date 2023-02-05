import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: '',
    role: '',
    accountLoggingStatus: 'idle'
}

const loginSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        accountFetching: state => {
            state.accountLoggingStatus = 'logging'
        },
        accountFetched: (state, action) => {
            state.accountLoggingStatus = 'logged';
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
        accountFetchingError: state => {
            state.accountLoggingStatus = 'error';
            state.token = '';
            state.role = '';
        }
    }
});

const {actions, reducer} = loginSlice;

export default reducer;
export const {
    accountFetching,
    accountFetched,
    accountFetchingError
} = actions;