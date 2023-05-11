import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
const baseUrl = "http://localhost:3001/doctor/getAllDoctors";
const addUrl = '/doctor/add';
const updateUrl = 'http://localhost:3001/doctor/edit'
const initialState = {
    doctors: [],
    currentPage: 1,
    doctorsLoadingStatus: 'idle',
    searchedDoctors: "",
    doctorsCount: 0,
    doctorsCountStatus: 'idle',
    status: 'idle',
    error: null,
    doctor: {},
    checkedList: [],
    specialitiesList: [
        {
            value: 'neurologist',
            text: "Neurologist"
        },
        {
            value: 'endocrinologists',
            text: "Endocrinologists"
        },
        {
            value: 'gastroenterologists',
            text: "Gastroenterologists"
        },
        {
            value: 'dermatologist',
            text: "Dermatologist"
        },
        {
            value: 'urologist',
            text: "Urologist"
        },
        {
            value: 'surgeon',
            text: "Surgeon"
        },
        {
            value: 'oncologist',
            text: "Oncologist"
        },
        {
            value: 'physiatrists',
            text: "Physiatrists"
        },
        {
            value: 'ophthalmologist',
            text: "Ophthalmologist"
        }]

}


export const fetchDoctors = ([token, count, start]) => async (dispatch) => {
    try {

        const response = await axios.get(baseUrl, {
            headers: {
                'authorization': token,
                'count': count,
                'from': start

            }
        });


        dispatch(fetchDoctorsSuccess(response.data));

    } catch (error) {

        dispatch(fetchDoctorsFailure(error.message));
    }
};


export const deleteDoctorItem = ([id, token]) => async (dispatch) => {
    try {

        const response = await axios.delete(`/doctor/delete/${id}`,
            {
                headers: {
                    'authorization': token
                }
            });

        dispatch(deleteDoctorItemSuccess(response.data._id));
        dispatch(getDoctorsCount(token));
    } catch (error) {

        dispatch(deleteDoctorItemFailure(error.message));
    }
};
export const deleteDoctorsMany = ({ checkedList, token }) => async (dispatch) => {
    console.log(token);

    try {

        const response = await axios.delete(`/doctor/deleteMany/`,
            {
                headers: {
                    'authorization': token
                },
                data: {
                    doctors: checkedList
                }
            }
        );

        // Dispatch success action with deleted item ID
        dispatch(deleteDoctorsManySuccess(checkedList));

        console.log(response.data);
        dispatch(getDoctorsCount(token));
    } catch (error) {
        console.log(error);
        dispatch(deleteDoctorsManyFailure(error.message));
    }
};


export const getDoctorsCount = (token) => async (dispatch) => {
    try {

        const response = await axios.get(baseUrl, {
            headers: {
                'authorization': token
            }
        });




        dispatch(getDoctorsCountSuccess(response.data.length));

    } catch (error) {

        dispatch(fetchDoctorsFailure(error.message));
    }
};


export const postDoctor = ({ id, token, name, surname, age, speciality, entryDate, salary, email, phone }) => async (dispatch) => {

    try {
        // Make API call to delete item
        const post = await axios.post(addUrl, {
            name,
            surname,
            age,
            speciality,
            entryDate,
            salary,
            email,
            phone
        }, {
            headers: {
                Authorization: token
            }
        });


        dispatch(doctorCreatedSuccess(post.data));
        dispatch(getDoctorsCount(token));
    } catch (error) {

        dispatch(doctorCreatedFailure(error.message));
    }
};

export const updateDoctor = ([item, token, id]) => async (dispatch) => {
    try {
        // Make API call to delete item
        const response = await axios.put(`${updateUrl}/${id}`, item,
            {
                headers: {
                    Authorization: token
                }
            });

        // let doctors = useSelector(state => state.doctors.doctors);
        dispatch(updateDoctorSuccess(response.data));
    } catch (error) {
        dispatch(updateDoctorFailure(error.message));
    }
};

export const registerDoctor = ([item, token]) => async (dispatch) => {
    try {
        // Make API call to delete item
        const response = await axios.post(`/auth/register/doctor`,
            item,
            {
                headers: {
                    Authorization: token
                }
            }
        )
        dispatch(registerDoctorSuccess(response.data));
    } catch (error) {
        dispatch(registerDoctorFailure(error.message));
    }
};

const doctorsSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {
        fetchDoctorsSuccess: (state, action) => {
            // Update the state to remove the deleted item
            state.doctorsLoadingStatus = 'idle';

            state.doctors = action.payload.map(item => ({ ...item, isSelected: false }))

        },
        fetchDoctorsFailure: (state, action) => {
            state.doctorsLoadingStatus = 'error';
            if (action.error.message && action.payload === 404) {
                state.error = 'The requested resource was not found on the server.';
            } else {
                state.error = action.payload.message;
            }
        },

        deleteDoctorItemSuccess: (state, action) => {
            // Update the state to remove the deleted item
            const deletedItemId = action.payload;
            state.status = 'deleted';
            state.doctors = state.doctors.filter(item => item._id !== deletedItemId);

        },

        deleteDoctorItemFailure: (state, action) => {
            // Handle failure, e.g. show error message or set error state
            state.error = action.payload;
        },
        deleteDoctorsManySuccess: (state, action) => {

            state.status = 'deletedMany';
            state.doctors = state.doctors.filter(item => !action.payload.includes(item._id));


        },
        deleteDoctorsManyFailure: (state, action) => {
            // Handle failure, e.g. show error message or set error state
            state.error = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        handleSearchDoctors(state, action) {
            state.searchedDoctors = action.payload;
        },

        doctorCreatedSuccess: (state, action) => {

            state.status = 'added'
            state.doctor = action.payload;
        },
        doctorCreatedFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },

        updateDoctorSuccess: (state, action) => {
            state.status = 'updated';
            const updatedItem = action.payload;

            const index = state.doctors.findIndex((item) => item._id === updatedItem._id);
            if (index !== -1) {
                state.doctors.splice(index, 1, updatedItem);
            }
        },

        updateDoctorFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;

        },
        registerDoctorSuccess: (state, action) => {
            state.status = 'registered';
            state.users = action.payload;
        },
        registerDoctorFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
        getDoctorsCountSuccess: (state, action) => {
            state.doctorsCount = action.payload;
        },
        getDoctorsCountFailure: (state, action) => {

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

const { actions, reducer } = doctorsSlice;
export default reducer;
export const {
    PageIncrement,
    PageDecrement,
    setCurrentPage,
    handleSearchDoctors,
    deleteDoctorItemSuccess,
    deleteDoctorItemFailure,
    searchByName,
    registerDoctorSuccess,
    registerDoctorFailure,
    fetchDoctorsSuccess,
    fetchDoctorsFailure,
    doctorCreatedSuccess,
    doctorCreatedFailure,
    updateDoctorSuccess,
    addCheckedListItem,
    updateDoctorFailure,
    setStatusIdle,
    getDoctorsCountSuccess,
    getDoctorsCountFailure,
    removeCheckedListItem,
    deleteDoctorsManySuccess,
    deleteDoctorsManyFailure,
    clearCheckedList
} = actions


