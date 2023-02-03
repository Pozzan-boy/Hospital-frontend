import { useState } from "react";

import Logo from "../../Logo/Logo";
import Button from "../../Button/Button";
import user from '../../../assets/icons/user.svg';
import lock from '../../../assets/icons/lock.svg';

const AdminLogin = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return(
        <form className="log-form">
            <Logo color="#05A715" />
            <h3 className="log-form__title">Login</h3>
            <h4 className="log-form__subtitle">To continue as admin</h4>
            <label className="log-form__label">Admin login <span>*</span></label>
            <div className="log-form__input__wrapper">
                <img className="log-form__input-img" src={user} alt="user" />
                <input value={login} onChange={(e)=> setLogin(e.target.value)} type="text" className="log-form__input patient-log__input" placeholder="adminlogin"/>
            </div>
            <label className="log-form__label">Password <span>*</span></label>
            <div className="log-form__input__wrapper">
                <img className="log-form__input-img" src={lock} alt="password" />
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className="log-form__input patient-log__input" placeholder="adminpassword"/>
            </div>
            <Button>Login</Button>
        </form>
    )
}

export default AdminLogin;