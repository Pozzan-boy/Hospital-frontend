import React from 'react'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import Filters from '../../components/Filters/Filters'
import PatientsList from '../../components/PatientsList/PatientList';
import { useSelector, useDispatch } from "react-redux";
import { deletePatientsMany, postPatient,clearCheckedList } from "../../components/PatientsList/PatientsListSlice";
import { patientSchema } from "../../schemas/patientSchema";


const AdminPatientsRoute = () => {
    const { patientsCount, checkedList } = useSelector((state) => state.patients);
    const inputs = ["name", "surname", "birthDate", "sex", "height", "weight", "email", "phone"]
    return (
        <div className="admin-panel">
            <AdminHeader role={"patient"}/>
            <Filters
                listCount={patientsCount}
                checkedList={checkedList}
                inputs={inputs}
                deleteItemsMany={deletePatientsMany}
                postItemFunc={postPatient}
                itemSchema={patientSchema}
                itemName={'patient'}
                clearCheckBoxes={clearCheckedList}
            />
            <PatientsList />
        </div>
    )
}

export default AdminPatientsRoute


