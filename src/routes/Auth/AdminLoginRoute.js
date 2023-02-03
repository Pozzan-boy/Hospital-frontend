import AdminLogin from "../../components/Login/AdminLogin/AdminLogin";

import './auth.scss';

const AdminLoginRoute = () => {

    return (
        <div className="login-page admin-login-page">
            <AdminLogin />
        </div>
    )
}

export default AdminLoginRoute;