import DoctorHeader from '../../components/DoctorHeader/DoctorHeader'
import Filters from '../../components/Filters/Filters'
import PatientsList from '../../components/PatientsList/PatientList';
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { deletePatientsMany, postPatient,clearCheckedList } from "../../components/PatientsList/PatientsListSlice";
import { patientSchema } from "../../schemas/patientSchema";
import { useNavigate } from 'react-router-dom';

const DoctorPatientsRoute = () => {
    const { patientsCount, checkedList } = useSelector((state) => state.patients);
    const navigate = useNavigate();
    const inputs = ["name", "surname", "birthDate", "sex", "height", "weight", "email", "phone"]

    return (
        <div className="admin-panel">
            <DoctorHeader role={"patient"}/>
            <Filters
                    listCount={patientsCount}
                    checkedList={checkedList}
                    inputs={inputs}
                    tableName="patient"
                    deleteItemsMany={deletePatientsMany}
                    postItemFunc={postPatient}
                    itemSchema={patientSchema}
                    clearCheckedList={clearCheckedList}
                    itemName={'patient'}
                />
            <PatientsList />
        </div>
    )
}

export default DoctorPatientsRoute
