import React from 'react'
import PatientsList from '../PatientsList/PatientList';
import Filters from "../Filters/Filters";
import './doctorPanel.scss'
import Logo from "../Logo/Logo";
import { useSelector } from "react-redux";
import { deletePatientsMany, postPatient } from '../PatientsList/PatientsListSlice';

import { patientSchema } from "../../schemas/patientSchema";
const DoctorPanel = () => {
    const { patientsCount, checkedList } = useSelector((state) => state.patients);
    const inputs = ["name", "surname", "birthDate", "sex", "height", "weight", "email", "phone"]
    return (

        <div className='doctor-panel'>
            <div className="doctor-panel__header">
                <Logo color='#A70505' variant='horizontal' width="82px" height="69px" />
                <div className='doctor-panel__profile'>
                    <div className="doctor-panel__profile__logo">
                        <span>D</span>
                    </div>
                    <div className="doctor-panel__profile__name">
                        Doctor
                    </div>
                </div>
            </div>
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


        </div>

    )
}

export default DoctorPanel
