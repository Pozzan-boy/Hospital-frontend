import PatientLogin from "../../components/Login/PatientLogin/PatientLogin";

import './auth.scss';

const PatientLoginRoute = () => {
    return (
        <div className="login-page patient-login-page">
            <PatientLogin />
        </div>
    )
}

export default PatientLoginRoute;