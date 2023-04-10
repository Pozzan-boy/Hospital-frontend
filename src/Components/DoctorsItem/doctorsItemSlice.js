import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const addUrl = "/doctor/add";
const updateUrl = "http://localhost:3001/doctor/edit"

const initialState = {
    name: "",
    surname: "",
    doctors: [], // define an empty array for doctors
    age: 0,
    speciality: "",
    entryDate: "",
    salary: 0,
    email: "",
    phone: "",
    doctor: {},
    status: 'idle',
    error: null
}

export const postDoctor = createAsyncThunk(
    "doctor/postDoctor",
    async ({ name, surname, age, speciality, entryDate, salary, email, phone, token }) => {
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

        return post.data;
    }
);

export const updateDoctor = createAsyncThunk(
    "doctor/updateDoctor",
    async ([item, token, id]) => {
        const post = await axios.put(`${updateUrl}/${id}`, item,
            {
                headers: {
                    Authorization: token
                }
            });

        return post.data;
    }
);

export const deleteDoctor = createAsyncThunk(
    "doctor/deleteDoctor",
    async ([id, token]) => {
        const response = await axios.delete(`/doctor/delete/${id}`,
        {
            headers: {
                Authorization: token
            }
        })
        return response.data;
    }
);

export const registerDoctor = createAsyncThunk(
    "doctor/registerDoctor",
    async ([item, token]) => {
        const response = await axios.post(`/auth/register/doctor`, 
            item,
            {
                headers: {
                    Authorization: token
                }
            }
        );
        return response.data;
    }
);

const postDoctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        doctorDeleted: (state, action) => {
            console.log('as43');
            state.status = "deleted";
            state.doctors = state.doctors.filter((item) => item.id !== action.payload);
          },
          
    },
    extraReducers: (builder) => {
        builder
            .addCase(postDoctor.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postDoctor.fulfilled, (state, action) => {
                state.status = 'posted';
                state.doctor = action.payload;

            })
            .addCase(postDoctor.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            .addCase(updateDoctor.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateDoctor.fulfilled, (state, action) => {
                state.status = 'updated';
                const updatedItem = action.payload;
                const index = state.findIndex((item) => item.id === updatedItem.id);
                if (index !== -1) {
                    state.splice(index, 1, updatedItem);
                }


            })
            .addCase(updateDoctor.rejected, (state, action) => {
                state.status = 'failed';
                console.log('rejected');
                state.error = action.error.message;
            })


            .addCase(deleteDoctor.pending, (state) => {
                state.status = 'loading';
                console.log('pending');
            })
            .addCase(deleteDoctor.fulfilled, (state, action) => {
                console.log('fulfilled');
                state.status = 'deleted';
                state.doctors = state.doctors.filter(item => item.id !== action.payload);
                


            })
            .addCase(deleteDoctor.rejected, (state, action) => {
                state.status = 'failed';
                console.log('rejected');
                state.error = action.error.message;
            })
            .addCase(registerDoctor.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerDoctor.fulfilled, (state, action) => {
                state.status = 'registered';
                state.users = action.payload;


            })
            .addCase(registerDoctor.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addDefaultCase(() => {});
    },
});


const {actions, reducer} = postDoctorSlice;
export default reducer;
export const {
    doctorDeleted
} = actions
