import DoctorsList from "../DoctorsList/DoctorsList";
import React from 'react'
import Filters from "../Filters/Filters";
import './adminPanel.scss'
import { useSelector } from "react-redux";
import { deleteDoctorsMany, postDoctor,clearCheckedList, fetchDoctors, setSearchIdle, searchDoctorItem } from "../../components/DoctorsList/DoctorsListSlice";
import { doctorSchema } from "../../schemas/doctorSchema";

const AdminPanel = () => {
    const { doctorsCount, checkedList } = useSelector((state) => state.doctors);
    const inputs = ["name", "surname", "birthDate", "sex", "height", "weight", "email", "phone"]
    const searchTypeList = useSelector(state=> state.doctors.selectSearchList);
    const itemsPerPage = useSelector(state=> state.doctors.doctorsPerPage);
    return (
        <div className="admin-panel">

            <Filters
                listCount={doctorsCount}
                checkedList={checkedList}
                inputs={inputs}
                deleteItemsMany={deleteDoctorsMany}
                postItemFunc={postDoctor}
                itemSchema={doctorSchema}
                itemName={'doctor'}
                tableName={'doctor'}
                clearCheckBoxes={clearCheckedList}
                setSearchIdle={setSearchIdle}
                searchTypeList={searchTypeList}
                fetchItems={fetchDoctors}
                itemsPerPage={itemsPerPage}
                searchItems={searchDoctorItem}
            />
            <DoctorsList />


        </div>
    )

}
export default AdminPanel;