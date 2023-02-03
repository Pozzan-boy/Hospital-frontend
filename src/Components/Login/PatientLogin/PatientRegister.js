import { useState } from "react";

import Logo from "../../Logo/Logo";
import Button from "../../Button/Button";
import user from '../../../assets/icons/user.svg';
import lock from '../../../assets/icons/lock.svg';
import keyIcon from '../../../assets/icons/key.svg';
import { Link } from "react-router-dom";
import Checkbox from "../../Checkbox/Checkbox";

const PatientRegister = () => {

    const [key, setKey] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [checkStatus, setCheckStatus] = useState(false);

    return(
        <form className="log-form">
            <Logo />
            <h3 className="log-form__title">Sign up</h3>
            <h4 className="log-form__subtitle">To continue your account</h4>
            <label className="log-form__label">Your key <span>*</span></label>
            <div className="log-form__input__wrapper">
                <img className="log-form__input-img" src={keyIcon} alt="key" />
                <input value={key} onChange={(e)=> setKey(e.target.value)} type="text" className="log-form__input patient-log__input" placeholder="adminlogin"/>
            </div>
            <label className="log-form__label">Your login <span>*</span></label>
            <div className="log-form__input__wrapper">
                <img className="log-form__input-img" src={user} alt="user" />
                <input value={login} onChange={(e)=> setLogin(e.target.value)} type="text" className="log-form__input patient-log__input" placeholder="yourlogin"/>
            </div>
            <label className="log-form__label">Your password <span>*</span></label>
            <div className="log-form__input__wrapper">
                <img className="log-form__input-img" src={lock} alt="password" />
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className="log-form__input patient-log__input" placeholder="yourpassword"/>
            </div>
            <Checkbox onCheck={setCheckStatus} />
            <Button>Sign Up</Button>
            <p className="log-form__subinf">Already have an account?<Link className="log-form__link patient-log__link" to='/login/patient'>Login</Link></p>
        </form>
    )
}

export default PatientRegister;