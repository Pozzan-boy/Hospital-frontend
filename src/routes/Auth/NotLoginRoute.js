import { Link } from "react-router-dom";

import './auth.scss';

const NotLoginRoute = () => {
    return (
        <div className="not-login-page">
            <h2 className="not-login-page__title">Please login into your account</h2>
            <Link className="not-login-page__link" to="/login/patient">Login</Link>
        </div>
    )
}

export default NotLoginRoute;