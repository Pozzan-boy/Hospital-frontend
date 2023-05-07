import React from 'react'
import PatientsList from '../PatientsList/PatientList';
import Filters from "../Filters/Filters";
import "./doctorView.scss"
import { useSelector } from "react-redux";
import { deletePatientsMany, postPatient } from '../PatientsList/PatientsListSlice';
import { patientSchema } from "../../schemas/patientSchema";
const DoctorView = () => {
    const { patientsCount, checkedList } = useSelector((state) => state.patients);
    const inputs = ["name", "surname", "birthDate", "sex", "height", "weight", "email", "phone"]
    return (

        <div className="doctor-panel__info">
            <Filters
                listCount={patientsCount}
                checkedList={checkedList}
                inputs={inputs}
                deleteItemsMany={deletePatientsMany}
                postItemFunc={postPatient}
                itemSchema={patientSchema}
                itemName={'patient'}
            />
            <PatientsList />
        </div>

    )
}

export default DoctorView
