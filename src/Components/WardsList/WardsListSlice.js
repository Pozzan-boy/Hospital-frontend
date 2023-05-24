import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const baseUrl = "http://localhost:3001/ward/getAllWards";
const addUrl = '/ward/add';
const updateUrl = 'http://localhost:3001/ward/edit'
const initialState = {
    wards: [],
    currentPage: 1,
    wardsLoadingStatus: 'idle',
    searchedWards: "",
    wardsCount: 0,
    wardsCountStatus: 'idle',
    status: 'idle',
    error: null,
    ward: {},
    checkedList: []


}

export const fetchWards = ([token, count, start]) => async (dispatch) => {
    try {

        const response = await axios.get(baseUrl, {
            headers: {
                'authorization': token,
                'count': count,
                'from': start

            }
        });

        dispatch(fetchWardsSuccess(response.data));

    } catch (error) {

        dispatch(fetchWardsFailure(error.message));
    }
};

export const deleteWardItem = ([id, token]) => async (dispatch) => {
    try {

        const response = await axios.delete(`/ward/delete/${id}`,
            {
                headers: {
                    'authorization': token
                }
            });

        dispatch(deleteWardItemSuccess(response.data._id));
        dispatch(getWardsCount(token));
    } catch (error) {

        dispatch(deleteWardItemFailure(error.message));
    }
};

export const deleteWardsMany = ({ checkedList, token }) => async (dispatch) => {
    console.log(token);

    try {

        const response = await axios.delete(`/ward/deleteMany/`,
            {
                headers: {
                    'authorization': token
                },
                data: {
                    wards: checkedList
                }
            }
        );

        // Dispatch success action with deleted item ID
        dispatch(deleteWardsManySuccess(checkedList));

        console.log(response.data);
        dispatch(getWardsCount(token));
    } catch (error) {
        console.log(error);
        dispatch(deleteWardsManyFailure(error.message));
    }
};

export const getWardsCount = (token) => async (dispatch) => {
    try {

        const response = await axios.get(baseUrl, {
            headers: {
                'authorization': token
            }
        });

        dispatch(getWardsCountSuccess(response.data.length));

    } catch (error) {

        dispatch(fetchWardsFailure(error.message));
    }
};

export const postWard = ({ id, token, number, floor, department, purpose, placeCount, chief=undefined }) => async (dispatch) => {

    try {
        const post = await axios.post(addUrl, {
            number,
            floor,
            department,
            purpose,
            placeCount,
            chief,
        }, {
            headers: {
                Authorization: token
            }
        });

        dispatch(wardCreatedSuccess(post.data));
        dispatch(getWardsCount(token));
    } catch (error) {

        dispatch(wardCreatedFailure(error.message));
    }
};

export const updateWard = ([item, token, id]) => async (dispatch) => {
    try {
        // Make API call to delete item
        const response = await axios.put(`${updateUrl}/${id}`, item,
            {
                headers: {
                    Authorization: token
                }
            });

        // let doctors = useSelector(state => state.doctors.doctors);
        dispatch(updateWardSuccess(response.data));
    } catch (error) {
        dispatch(updateWardFailure(error.message));
    }
};

const wardsSlice = createSlice({
    name: 'wards',
    initialState,
    reducers: {
        fetchWardsSuccess: (state, action) => {
            // Update the state to remove the deleted item
            state.wardsLoadingStatus = 'idle';

            state.wards = action.payload.map(item => ({ ...item, isSelected: false }))

        },
        fetchWardsFailure: (state, action) => {
            state.wardsLoadingStatus = 'error';
            if (action.error.message && action.payload === 404) {
                state.error = 'The requested resource was not found on the server.';
            } else {
                state.error = action.payload.message;
            }
        },

        deleteWardItemSuccess: (state, action) => {
            // Update the state to remove the deleted item
            const deletedItemId = action.payload;
            state.status = 'deleted';
            state.wards = state.wards.filter(item => item._id !== deletedItemId);

        },

        deleteWardItemFailure: (state, action) => {
            // Handle failure, e.g. show error message or set error state
            state.error = action.payload;
        },
        deleteWardsManySuccess: (state, action) => {

            state.status = 'deletedMany';
            state.wards = state.wards.filter(item => !action.payload.includes(item._id));


        },
        deleteWardsManyFailure: (state, action) => {
            // Handle failure, e.g. show error message or set error state
            state.error = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        handleSearchWards(state, action) {
            state.searchedWards = action.payload;
        },

        wardCreatedSuccess: (state, action) => {

            state.status = 'added';
            state.ward = action.payload;
        },
        wardCreatedFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },

        updateWardSuccess: (state, action) => {
            state.status = 'updated';
            const updatedItem = action.payload;
            console.log(updatedItem);
            const index = state.wards.findIndex((item) => item._id === updatedItem._id);
            if (index !== -1) {
                state.wards.splice(index, 1, updatedItem);
            }
        },

        updateWardFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;

        },
        getWardsCountSuccess: (state, action) => {
            state.wardsCount = action.payload;
        },
        getWardsCountFailure: (state, action) => {

            state.error = action.payload;
        },
        setStatusIdle: (state, action) => {
            state.status = 'idle';
        },
        addCheckedListItem: (state, action) => {
            if (!state.checkedList.includes(action.payload)) {
                state.checkedList.push(action.payload);
            }

        },
        removeCheckedListItem: (state, action) => {

            state.checkedList = state.checkedList.filter(item => item !== action.payload);

        },
        clearCheckedList: (state) => {

            state.checkedList = [];

        }

    },
    extraReducers: (builder) => {
        builder
            .addDefaultCase(() => { })
    }
})

const { actions, reducer } = wardsSlice;
export default reducer;
export const {
    PageIncrement,
    PageDecrement,
    setCurrentPage,
    handleSearchWards,
    deleteWardItemSuccess,
    deleteWardItemFailure,
    searchByName,
    fetchWardsSuccess,
    fetchWardsFailure,
    wardCreatedSuccess,
    wardCreatedFailure,
    updateWardSuccess,
    addCheckedListItem,
    updateWardFailure,
    setStatusIdle,
    getWardsCountSuccess,
    getWardsCountFailure,
    removeCheckedListItem,
    deleteWardsManySuccess,
    deleteWardsManyFailure,
    clearCheckedList
} = actions
