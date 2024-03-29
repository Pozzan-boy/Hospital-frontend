import { configureStore , combineReducers} from "@reduxjs/toolkit";

import account from "../components/Login/loginSlice";
import doctors from "../components/DoctorsList/DoctorsListSlice"
import patients from "../components/PatientsList/PatientsListSlice"
import patient from "../components/PatientPanelInfo/PatientSlice"
import wards from '../components/WardsList/WardsListSlice'
import healings from '../components/HealingsList/HealingsListSlice'
import patientHealing from '../components/PatientPanelHealing/PatientHealingSlice';

const rootReducer = combineReducers({
    account: account,
    doctors: doctors,
    patients: patients,
    patient: patient,
    wards: wards,
    healings: healings,
    patientHealing: patientHealing
  });
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;