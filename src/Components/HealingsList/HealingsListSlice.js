import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const baseUrl = "http://localhost:3001/healing/getAllHealings";
const addUrl = '/healing/add';
const updateUrl = 'http://localhost:3001/healing/edit'
const initialState = {
    healings: [],
    currentPage: 1,
    healingsLoadingStatus: 'idle',
    searchedHealings: "",
    healingsCount: 0,
    healingsCountStatus: 'idle',
    status: 'idle',
    error: null,
    healing: {},
    checkedList: []
}

export const fetchHealings = ([token, count, start]) => async (dispatch) => {
    try {

        const response = await axios.get(baseUrl, {
            headers: {
                'authorization': token,
                'count': count,
                'from': start

            }
        });

        dispatch(fetchHealingsSuccess(response.data));

    } catch (error) {

        dispatch(fetchHealingsFailure(error.message));
    }
};

export const deleteHealingItem = ([id, token]) => async (dispatch) => {
    try {

        const response = await axios.delete(`/healing/delete/${id}`,
            {
                headers: {
                    'authorization': token
                }
            });

        dispatch(deleteHealingItemSuccess(response.data._id));
        dispatch(getHealingsCount(token));
    } catch (error) {

        dispatch(deleteHealingItemFailure(error.message));
    }
};

export const deleteHealingsMany = ({ checkedList, token }) => async (dispatch) => {
    console.log(token);

    try {

        const response = await axios.delete(`/healing/deleteMany/`,
            {
                headers: {
                    'authorization': token
                },
                data: {
                    healings: checkedList
                }
            }
        );

        // Dispatch success action with deleted item ID
        dispatch(deleteHealingsManySuccess(checkedList));

        console.log(response.data);
        dispatch(getHealingsCount(token));
    } catch (error) {
        console.log(error);
        dispatch(deleteHealingsManyFailure(error.message));
    }
};

export const getHealingsCount = (token) => async (dispatch) => {
    try {

        const response = await axios.get(baseUrl, {
            headers: {
                'authorization': token
            }
        });

        dispatch(getHealingsCountSuccess(response.data.length));

    } catch (error) {

        dispatch(fetchHealingsFailure(error.message));
    }
};

export const postHealing = ({ id, token, patient, doctor, dignos, diagnosDescription, date, healingInstruction, status, preparations=undefined, ward=undefined }) => async (dispatch) => {

    try {
        const post = await axios.post(addUrl, {
            patient,
            doctor,
            dignos,
            diagnosDescription,
            date,
            healingInstruction,
            status,
            preparations,
            ward
        }, {
            headers: {
                Authorization: token
            }
        });

        dispatch(healingCreatedSuccess(post.data));
        dispatch(getHealingsCount(token));
    } catch (error) {

        dispatch(healingCreatedFailure(error.message));
    }
};

export const updateHealing = ([item, token, id]) => async (dispatch) => {
    try {
        // Make API call to delete item
        const response = await axios.put(`${updateUrl}/${id}`, item,
            {
                headers: {
                    Authorization: token
                }
            });

        // let doctors = useSelector(state => state.doctors.doctors);
        dispatch(updateHealingSuccess(response.data));
    } catch (error) {
        dispatch(updateHealingFailure(error.message));
    }
};

const healingsSlice = createSlice({
    name: 'healings',
    initialState,
    reducers: {
        fetchHealingsSuccess: (state, action) => {
            // Update the state to remove the deleted item
            state.healingsLoadingStatus = 'idle';

            state.healings = action.payload.map(item => ({ ...item, isSelected: false }))

        },
        fetchHealingsFailure: (state, action) => {
            state.healingsLoadingStatus = 'error';
            if (action.error.message && action.payload === 404) {
                state.error = 'The requested resource was not found on the server.';
            } else {
                state.error = action.payload.message;
            }
        },

        deleteHealingItemSuccess: (state, action) => {
            // Update the state to remove the deleted item
            const deletedItemId = action.payload;
            state.status = 'deleted';
            state.healings = state.healings.filter(item => item._id !== deletedItemId);

        },

        deleteHealingItemFailure: (state, action) => {
            // Handle failure, e.g. show error message or set error state
            state.error = action.payload;
        },
        deleteHealingsManySuccess: (state, action) => {

            state.status = 'deletedMany';
            state.healings = state.healings.filter(item => !action.payload.includes(item._id));


        },
        deleteHealingsManyFailure: (state, action) => {
            // Handle failure, e.g. show error message or set error state
            state.error = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        handleSearchHealings(state, action) {
            state.searchedHealings = action.payload;
        },

        healingCreatedSuccess: (state, action) => {

            state.status = 'added';
            state.healing = action.payload;
        },
        healingCreatedFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },

        updateHealingSuccess: (state, action) => {
            state.status = 'updated';
            const updatedItem = action.payload;

            const index = state.healings.findIndex((item) => item._id === updatedItem._id);
            if (index !== -1) {
                state.healings.splice(index, 1, updatedItem);
            }
        },

        updateHealingFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;

        },
        getHealingsCountSuccess: (state, action) => {
            state.healingsCount = action.payload;
        },
        getHealingsCountFailure: (state, action) => {

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

const { actions, reducer } = healingsSlice;
export default reducer;
export const {
    PageIncrement,
    PageDecrement,
    setCurrentPage,
    handleSearchHealings,
    deleteHealingItemSuccess,
    deleteHealingItemFailure,
    searchByName,
    fetchHealingsSuccess,
    fetchHealingsFailure,
    healingCreatedSuccess,
    healingCreatedFailure,
    updateHealingSuccess,
    addCheckedListItem,
    updateHealingFailure,
    setStatusIdle,
    getHealingsCountSuccess,
    getHealingsCountFailure,
    removeCheckedListItem,
    deleteHealingsManySuccess,
    deleteHealingsManyFailure,
    clearCheckedList
} = actions
