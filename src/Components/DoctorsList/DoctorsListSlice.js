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
    doctorsCount:0,
    doctorsCountStatus: 'idle',
    status: 'idle',
    error:null,
    doctor: {},
    
}


export const fetchDoctors = ([token, count, start]) => async (dispatch) => {
    try {
      // Make API call to delete item
      const response = await axios.get(baseUrl, {
            headers: {
                'authorization': token,
                'count':  count,
                'from':  start

            }
        });
      // Dispatch success action with deleted item ID

      dispatch(fetchDoctorsSuccess(response.data));

    } catch (error) {
      // Dispatch failure action with error message
      dispatch(fetchDoctorsFailure(error.message));
    }
  };  

  
export const deleteDoctorItem = ([id, token]) => async (dispatch) => {
    try {
      // Make API call to delete item
      const response = await axios.delete(`/doctor/delete/${id}`,
          {
              headers: {
                  Authorization: token
              }
          });
      // Dispatch success action with deleted item ID
      dispatch(deleteDoctorItemSuccess(response.data._id));
      dispatch(getDoctorsCount(token));
    } catch (error) {
      // Dispatch failure action with error message
      dispatch(deleteDoctorItemFailure(error.message));
    }
  };   
  
  


  export const getDoctorsCount = (token) => async (dispatch) => {
    try {
      // Make API call to delete item
      const response = await axios.get(baseUrl, {
        headers: {
          'authorization': token
        }
      });
      // Dispatch success action with deleted item ID
      
     

        dispatch(getDoctorsCountSuccess(response.data.length));
      
    } catch (error) {
      // Dispatch failure action with error message
      dispatch(fetchDoctorsFailure(error.message));
    }
  };


export const postDoctor = ({id, token, name, surname, age, speciality, entryDate, salary, email, phone}) => async (dispatch) => {
    
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
    
      // Dispatch success action with deleted item ID
      dispatch(doctorCreatedSuccess(post.data));
      dispatch(getDoctorsCount(token));
    } catch (error) {
      // Dispatch failure action with error message
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
        fetchDoctorsSuccess:(state, action) => {
            // Update the state to remove the deleted item
            state.doctorsLoadingStatus = 'idle';
            // state.doctors.push(...action.payload); 
            state.doctors = action.payload;
            
          },
          fetchDoctorsFailure: (state, action) => {
            state.doctorsLoadingStatus = 'error';
            if (action.error.message && action.error.mesage.status === 404) {
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
        setCurrentPage(state, action){
            state.currentPage = action.payload;
        },
        handleSearchDoctors(state, action){
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
          getDoctorsCountSuccess:(state, action) => {
            state.doctorsCount = action.payload; 
          }, 
          getDoctorsCountFailure:(state, action) => {

            state.error = action.payload;
          }, 
          setStatusIdle:(state, action) => {
            state.status = 'idle';
          }, 
        
    },
    extraReducers: (builder) =>{
        builder   
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = doctorsSlice;
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
    updateDoctorFailure,
    setStatusIdle,
    getDoctorsCountSuccess,
    getDoctorsCountFailure
} = actions


