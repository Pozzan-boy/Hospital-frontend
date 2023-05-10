import Logo from "../Logo/Logo";
import "./PatientPanelInfo.scss";
import DropDown from "../DropDown/DropDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatient } from "./PatientSlice";
import { useEffect, useState } from "react";
import userIcon from "../../assets/icons/user-icon.svg"
import phoneIcon from "../../assets/icons/phone-icon.svg"
import PatientHeader from "../PatientHeader/PatientHeader";
import DropDownItem from "../DropDownItem/DropDownItem";
const PatientPanelInfo = () => {
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.account);

    useEffect(() => {
        if (token !== undefined && token !== null) { // check if token is available
            dispatch(fetchPatient(token));
        }
    }, [token]);

    const { name, surname, birthDate,sex, height, weight, email, phone } = useSelector(state => state.patient.patient);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (name !== undefined && surname !== undefined) {
            setIsLoading(false);
        }
    }, [name, surname]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="patient-panel">
            <PatientHeader name={name} surname={surname}/>
            <div className="patient-panel__list">
                <DropDown type={'info'} img={userIcon} info='Personal info'>
                        <DropDownItem header={"Name"} value={name}/>
                        <DropDownItem header={"Surname"} value={surname}/>
                        <DropDownItem header={"sex"} value={sex}/>
                        <DropDownItem header={"Birth Date"} value={birthDate}/>
                        <DropDownItem header={"Height"} value={height}/>
                        <DropDownItem header={"Weight"} value={weight}/>
                </DropDown>
                <DropDown type={'contacts'}img={phoneIcon} info='Contacts'>
                        <DropDownItem header={"Email"} value={email}/>
                        <DropDownItem header={"Phone"} value={phone}/>
                        
                </DropDown>
            </div>
        </div>
    )
}

export default PatientPanelInfo;
