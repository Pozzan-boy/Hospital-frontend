import { useSelector } from "react-redux";
import NotLoginRoute from "./Auth/NotLoginRoute";
import { useNavigate } from "react-router";
import { useEffect } from "react";
const Root = () => {
    
    const role = useSelector(state => state.account.role);
    const navigate = useNavigate();

    useEffect(() => {
        switch(role) {
            case 'admin':
                return navigate("/admin");
            case 'doctor':
                return  navigate("/doctor");
            case 'patient':
                return navigate("/patient") ;
            default:
                return <NotLoginRoute />
        }
    }, [role]);

    return(
        <>
            
        </>
    )
}

export default Root;