import { useSelector } from "react-redux";
import AdminPanel from "../components/AdminPanel/AdminPanel";
import NotLoginRoute from "./Auth/NotLoginRoute";
import AdminRoute from "./Admin/AdminRoute";
import DoctorPanel from "../components/DoctorPanel/DoctorPanel";
import AdminDoctorsRoute from "./Admin/AdminDoctorsRoute";
import { Navigate } from "react-router-dom";
import { redirect, useNavigate } from "react-router";
import AdminPatientsRoute from "./Admin/AdminPatientsRoute";
const Root = () => {
    
    const role = useSelector(state => state.account.role);
    const navigate = useNavigate();
    const render = () => {
        switch(role) {
            case 'admin':
                return navigate("/admin");
            case 'doctor':
                return  navigate("/doctor") ;
            default:
                return <NotLoginRoute />
        }
    }

    return(
        <>
            {render()}
        </>
    )
}

export default Root;