import DoctorsList from "../DoctorsList/DoctorsList";
import React from 'react'
import Filters from "../Filters/Filters";
import './adminPanel.scss'
import { useSelector } from "react-redux";
import { deleteDoctorsMany, postDoctor } from "../DoctorsList/DoctorsListSlice";
import { doctorSchema } from "../../schemas/doctorSchema";

const AdminPanel = () => {
    const { doctorsCount, checkedList } = useSelector((state) => state.doctors);
    const inputs = ["name", "surname", "birthDate", "sex", "height", "weight", "email", "phone"]
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
            />
            <DoctorsList />


        </div>
    )

}
export default AdminPanel;