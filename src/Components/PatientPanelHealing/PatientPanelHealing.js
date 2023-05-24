import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHealing } from './PatientHealingSlice';

import PatientHeader from '../PatientHeader/PatientHeader';
import DropDown from '../DropDown/DropDown';
import DropDownItem from '../DropDownItem/DropDownItem';

import './patientPanelHealing.scss';
import userIcon from "../../assets/icons/user-icon.svg"

const PatientPanelHealing = () => {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.account.token);
    const healingStatus = useSelector((state) => state.patientHealing.loadingStatus)
    const healing = useSelector((state) => state.patientHealing.healing);

    useEffect(() => {
        if (token !== undefined && token !== null) { // check if token is available
            dispatch(fetchHealing(token));
        }
    }, [])

    useEffect(() => {

    }, [healingStatus])

    useEffect(() => {
        if (token !== undefined && token !== null) { // check if token is available
            dispatch(fetchHealing(token));
        }
    }, [token])

    const { patient, doctor, ward } = healing;

    return (
        healingStatus === 'succeeded' ? (
        <div className="patient-panel">
            <PatientHeader name={patient?.name} surname={patient?.surname} active={'healing'} />

            <div className="patient-panel__list">
                <DropDown type={'info'} img={userIcon} info='Diagnos'>
                        <DropDownItem header={"Diagnos name"} value={healing.diagnos}/>
                        <DropDownItem header={"Description"} value={healing.diagnosDescription}/>
                        
                        <DropDownItem className="patient-panel__list__date" header={"Date"} value={healing.date}/>
                        <DropDownItem className="patient-panel__list__date" header={"Status"} value={healing.status}/>
                </DropDown>

                <DropDown type={'instructions'} img={userIcon} info='Instructions'>
                    <DropDownItem header={"Healing Instructions"} value={healing.healingInstruction}/>
                
                </DropDown>

                <DropDown type={'preparations'} img={userIcon} info='Preparations'>
                        {healing.preparations.map((item, i) => <DropDownItem header={`Preparat ${i + 1}`} value={item}/>)}
                </DropDown>

                <DropDown type={'doctor'} img={userIcon} info='Doctor'>
                    <DropDownItem header={"Name"} value={doctor.name}/>
                    <DropDownItem header={"Surname"} value={doctor.surname}/>
                    <DropDownItem header={"Age"} value={doctor.age}/>
                    <DropDownItem header={"Speciality"} value={doctor.speciality}/>
                </DropDown>

                <DropDown type={'ward'} img={userIcon} info='Ward'>
                    <DropDownItem header={"Number"} value={ward.number}/>
                    <DropDownItem header={"Floor"} value={ward.floor}/>
                    <DropDownItem header={"Department"} value={ward.department}/>
                    <DropDownItem header={"Purpose"} value={ward.purpose}/>
                    <DropDownItem header={"Place Count"} value={ward.placeCount}/>
                </DropDown>

            </div>
        </div>) : null
    )
    
}

export default PatientPanelHealing;