import AdminHeader from '../../components/AdminHeader/AdminHeader';
import Filters from '../../components/Filters/Filters';
import DoctorsList from '../../components/DoctorsList/DoctorsList';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { deleteDoctorsMany, postDoctor, clearCheckedList, fetchDoctors, setSearchIdle, searchDoctorItem } from "../../components/DoctorsList/DoctorsListSlice";
import { doctorSchema } from "../../schemas/doctorSchema";
import { useNavigate } from 'react-router-dom';
const AdminDoctorsRoute = () => {
    const { doctorsCount, checkedList } = useSelector((state) => state.doctors);
    const navigate = useNavigate();
    const inputs = ["name", "surname", "birthDate", "sex", "height", "weight", "email", "phone"];
    const searchTypeList = useSelector(state=> state.doctors.selectSearchList);
    const itemsPerPage = useSelector(state=> state.doctors.doctorsPerPage);
    useEffect(() => {
        navigate('/admin/doctors');
    }, [navigate]);
    return (
        <div className="admin-panel">
            <AdminHeader role={"doctor"}/>
            <Filters
                listCount={doctorsCount}
                checkedList={checkedList}
                inputs={inputs}
                deleteItemsMany={deleteDoctorsMany}
                postItemFunc={postDoctor}
                itemSchema={doctorSchema}
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

export default AdminDoctorsRoute


