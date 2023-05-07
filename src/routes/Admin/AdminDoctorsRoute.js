import AdminHeader from '../../components/AdminHeader/AdminHeader'
import Filters from '../../components/Filters/Filters'
import DoctorsList from '../../components/DoctorsList/DoctorsList'
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { deleteDoctorsMany, postDoctor,clearCheckedList } from "../../components/DoctorsList/DoctorsListSlice";
import { doctorSchema } from "../../schemas/doctorSchema";
import AdminPanel from '../../components/AdminPanel/AdminPanel';
import { useNavigate } from 'react-router-dom';
const AdminDoctorsRoute = () => {
    const { doctorsCount, checkedList } = useSelector((state) => state.doctors);
    const navigate = useNavigate();
    const inputs = ["name", "surname", "birthDate", "sex", "height", "weight", "email", "phone"];
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
                itemName={'doctor'}
                clearCheckBoxes={clearCheckedList}
            />
            <DoctorsList />
        </div>
    )
}

export default AdminDoctorsRoute


