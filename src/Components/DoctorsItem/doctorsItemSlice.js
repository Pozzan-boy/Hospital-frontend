// import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import {getDoctorsCount} from "../DoctorsList/DoctorsListSlice"
// const addUrl = '/doctor/add';
// const updateUrl = 'http://localhost:3001/doctor/edit'

// const initialState = {
 
//     status: 'idle',
//     error: null
// }


// export const postDoctor = ({id, token, name, surname, age, speciality, entryDate, salary, email, phone}) => async (dispatch) => {
    
//     try {
//       // Make API call to delete item
//       const post = await axios.post(addUrl, {
//                     name,
//                     surname,
//                     age,
//                     speciality,
//                     entryDate,
//                     salary,
//                     email,
//                     phone
//                 }, {
//                     headers: {
//                         Authorization: token
//                     }
//                 });
    
//       // Dispatch success action with deleted item ID
//       dispatch(doctorCreatedSuccess(post.data));
//       dispatch(getDoctorsCount(token));
//     } catch (error) {
//       // Dispatch failure action with error message
//       dispatch(doctorCreatedFailure(error.message));
//     }
//   }; 
// // export const updateDoctor = createAsyncThunk(
// //     'doctor/updateDoctor',
// //     async ([item, token, id]) => {
// //         const post = await axios.put(`${updateUrl}/${id}`, item,
// //             {
// //                 headers: {
// //                     Authorization: token
// //                 }
// //             });

// //         return post.data;
// //     }
// // );



// export const registerDoctor = createAsyncThunk(
//     'doctor/registerDoctor',
//     async ([item, token]) => {
//         const response = await axios.post(`/auth/register/doctor`, 
//             item,
//             {
//                 headers: {
//                     Authorization: token
//                 }
//             }
//         );
//         return response.data;
//     }
// );
// export const updateDoctor = ([item, token, id]) => async (dispatch) => {
//     try {
//       // Make API call to delete item
//       const response = await axios.put(`${updateUrl}/${id}`, item,
//             {
//                 headers: {
//                     Authorization: token
//                 }
//             });
//             console.log(response.data)
//             // let doctors = useSelector(state => state.doctors.doctors);
//       dispatch(updateDoctorSuccess(response.data));
//     } catch (error) {
//       dispatch(updateDoctorFailure(error.message));
//     }
//   };
// const postDoctorSlice = createSlice({
//     name: 'doctor',
//     initialState,
//     reducers: {

//           doctorCreatedSuccess: (state, action) => {
//             console.log('added');
//             state.status = 'added'
//             state.doctor = action.payload;
//           }, 
//           doctorCreatedFailure: (state, action) => {
//             state.status = 'failed';
//             state.error = action.error.message;
//           }, 

//           updateDoctorSuccess: (state, action) => {
//             state.status = 'updated';
//             console.log(current(state));
//             const updatedItem = action.payload;
            
//             // const index = state.doctors.doctors.findIndex((item) => item._id === updatedItem._id);
//             // if (index !== -1) {
//             //     state.splice(index, 1, updatedItem);
//             // }
//           }, 
//           updateDoctorFailure: (state, action) => {
//             state.status = 'failed';
//             state.error = action.error.message;
//           }, 
//     },
//     extraReducers: (builder) => {
//         builder



//             // .addCase(updateDoctor.pending, (state) => {
//             //     state.status = 'loading';
//             // })
//             // .addCase(updateDoctor.fulfilled, (state, action) => {
//             //     state.status = 'updated';
//             //     const updatedItem = action.payload;
//             //     const index = state.findIndex((item) => item.id === updatedItem.id);
//             //     if (index !== -1) {
//             //         state.splice(index, 1, updatedItem);
//             //     }


//             // })
//             // .addCase(updateDoctor.rejected, (state, action) => {
//             //     state.status = 'failed';
//             //     console.log('rejected');
//             //     state.error = action.error.message;
//             // })


            
//             .addCase(registerDoctor.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(registerDoctor.fulfilled, (state, action) => {
//                 state.status = 'registered';
//                 state.users = action.payload;


//             })
//             .addCase(registerDoctor.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             .addDefaultCase(() => {});
//     },
// });


// const {actions, reducer} = postDoctorSlice;
// export default reducer;
// export const {

//     doctorCreatedSuccess,
//     doctorCreatedFailure,
//     updateDoctorSuccess,
//     updateDoctorFailure
    
// } = actions
