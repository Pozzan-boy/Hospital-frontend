import React from 'react';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import Filters from '../../components/Filters/Filters';
import PatientsList from '../../components/PatientsList/PatientList';
import { useSelector } from "react-redux";
import { deletePatientsMany, postPatient, clearCheckedList, fetchPatients, searchPatient, setSearchIdle } from "../../components/PatientsList/PatientsListSlice";
import { patientSchema } from "../../schemas/patientSchema";


const AdminPatientsRoute = () => {
    const { patientsCount, checkedList } = useSelector((state) => state.patients);
    const inputs = ["name", "surname", "birthDate", "sex", "height", "weight", "email", "phone"];
    const searchTypeList = useSelector(state=> state.patients.selectSearchList);
    const itemsPerPage = useSelector(state=> state.patients.patientsPerPage);
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
                tableName={'patient'}
                clearCheckBoxes={clearCheckedList}
                searchTypeList={searchTypeList}
                fetchItems={fetchPatients}
                itemsPerPage={itemsPerPage}
                searchItems={searchPatient}
                setSearchIdle={setSearchIdle}
            />
            <PatientsList />
        </div>
    )
}

export default AdminPatientsRoute


