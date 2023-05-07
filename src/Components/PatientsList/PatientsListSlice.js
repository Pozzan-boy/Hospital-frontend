import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
const baseUrl = "http://localhost:3001/patient/getAllPatients";
const addUrl = '/patient/add';
const updateUrl = 'http://localhost:3001/patient/edit';
const initialState = {
    patients: [],
    currentPage: 1,
    patientsLoadingStatus: 'idle',
    searchedPatients: "",
    patientsCount: 0,
    patientsCountStatus: 'idle',
    status: 'idle',
    error: null,
    patient: {},
    checkedList: []


}


export const fetchPatients = ([token, count, start]) => async (dispatch) => {
    try {
        // Make API call to delete item
        const response = await axios.get(baseUrl, {
            headers: {
                'authorization': token,
                'count': count,
                'from': start

            }
        });
        // Dispatch success action with deleted item ID

        dispatch(fetchPatientsSuccess(response.data));

    } catch (error) {
        // Dispatch failure action with error message
        dispatch(fetchPatientsFailure(error.message));
    }
};


export const deletePatient = ([id, token]) => async (dispatch) => {
    try {
        // Make API call to delete item
        const response = await axios.delete(`/patient/delete/${id}`,
            {
                headers: {
                    'authorization': token
                }
            });
        // Dispatch success action with deleted item ID
        dispatch(deletePatientSuccess(response.data._id));
        dispatch(getPatientsCount(token));
    } catch (error) {
        // Dispatch failure action with error message
        dispatch(deletePatientFailure(error.message));
    }
};
export const deletePatientsMany = ({ checkedList, token }) => async (dispatch) => {
    console.log(token);

    try {
        // Make API call to delete item
        const response = await axios.delete(`/patient/deleteMany/`,
            {
                headers: {
                    'authorization': token
                },
                data: {
                    patients: checkedList
                }
            }
        );

        // Dispatch success action with deleted item ID
        dispatch(deletePatientsManySuccess(checkedList));

        console.log(response.data);
        dispatch(getPatientsCount(token));
    } catch (error) {
        console.log(error);
        dispatch(deletePatientsManyFailure(error.message));
    }
};


export const getPatientsCount = (token) => async (dispatch) => {
    try {
        // Make API call to delete item
        const response = await axios.get(baseUrl, {
            headers: {
                'authorization': token
            }
        });
        // Dispatch success action with deleted item ID



        dispatch(getPatientsCountSuccess(response.data.length));

    } catch (error) {
        // Dispatch failure action with error message
        dispatch(fetchPatientsFailure(error));
    }
};


export const postPatient = ({ token, name, surname, birthDate, sex, height, weight, email, phone }) => async (dispatch) => {

    try {

        const post = await axios.post(addUrl, {
            name,
            surname,
            birthDate,
            sex,
            height,
            weight,
            email,
            phone
        }, {
            headers: {
                Authorization: token
            }
        });

        dispatch(patientCreatedSuccess(post.data));
        dispatch(getPatientsCount(token));
    } catch (error) {
        dispatch(patientCreatedFailure(error.message));
    }
};

export const updatePatient = ([item, token, id]) => async (dispatch) => {
    console.log(item);
    console.log(token);
    console.log(id);
    try {
        // Make API call to delete item
        const response = await axios.put(`${updateUrl}/${id}`, item,
            {
                headers: {
                    Authorization: token
                }
            });

        // let patients = useSelector(state => state.patients.patients);
        dispatch(updatePatientSuccess(response.data));
    } catch (error) {
        console.log(error)
        dispatch(updatePatientFailure(error.message));
    }
};

export const registerPatient = ([item, token]) => async (dispatch) => {
    try {
        // Make API call to delete item
        const response = await axios.post(`/auth/register/patient`,
            item,
            {
                headers: {
                    Authorization: token
                }
            }
        )
        dispatch(registerPatientSuccess(response.data));
    } catch (error) {
        dispatch(registerPatientFailure(error.message));
    }
};

const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        fetchPatientsSuccess: (state, action) => {

            state.patientsLoadingStatus = 'idle';

            state.patients = action.payload.map(item => ({ ...item, isSelected: false }))

        },
        fetchPatientsFailure: (state, action) => {
            console.log(action.payload);
            state.patientsLoadingStatus = 'error';
            if (action.payload.message && action.payload.response.status === 403) {
                state.error = 'The requested resource was not found on the server.';
            } else {
                state.error = action.payload.message;
            }
        },

        deletePatientSuccess: (state, action) => {

            const deletedItemId = action.payload;
            state.status = 'deleted';
            state.patients = state.patients.filter(item => item._id !== deletedItemId);

        },

        deletePatientFailure: (state, action) => {

            state.error = action.payload;
        },
        deletePatientsManySuccess: (state, action) => {

            state.status = 'deletedMany';
            state.patients = state.patients.filter(item => !action.payload.includes(item._id));


        },
        deletePatientsManyFailure: (state, action) => {
            state.error = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        handleSearchPatients(state, action) {
            state.searchedPatients = action.payload;
        },

        patientCreatedSuccess: (state, action) => {

            state.status = 'added'
            state.patient = action.payload;
        },
        patientCreatedFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },

        updatePatientSuccess: (state, action) => {
            state.status = 'updated';
            const updatedItem = action.payload;

            const index = state.patients.findIndex((item) => item._id === updatedItem._id);
            if (index !== -1) {
                state.patients.splice(index, 1, updatedItem);
            }
        },

        updatePatientFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;

        },
        registerPatientSuccess: (state, action) => {
            state.status = 'registered';
            state.users = action.payload;
        },
        registerPatientFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
        getPatientsCountSuccess: (state, action) => {
            state.patientsCount = action.payload;
        },
        getPatientsCountFailure: (state, action) => {

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

const { actions, reducer } = patientsSlice;
export default reducer;
export const {
    PageIncrement,
    PageDecrement,
    setCurrentPage,
    handleSearchPatients,
    deletePatientSuccess,
    deletePatientFailure,
    searchByName,
    registerPatientSuccess,
    registerPatientFailure,
    fetchPatientsSuccess,
    fetchPatientsFailure,
    patientCreatedSuccess,
    patientCreatedFailure,
    updatePatientSuccess,
    addCheckedListItem,
    updatePatientFailure,
    setStatusIdle,
    getPatientsCountSuccess,
    getPatientsCountFailure,
    removeCheckedListItem,
    deletePatientsManySuccess,
    deletePatientsManyFailure,
    clearCheckedList
} = actions


