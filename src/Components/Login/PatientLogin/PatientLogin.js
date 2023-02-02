import Logo from "../../Logo/Logo";
import lock from "../../../assets/icons/lock.svg";
import user from "../../../assets/icons/user.svg";
import Button from "../../Button/Button";

import {useState} from 'react';


const PatientLogin =() =>{
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return(
        <form className="log-form patient-log">
            <Logo />
            <h3 className="log-form__title patient-log__title">Login</h3>
            <h4 className="log-form__subtitle patient-log__subtitle">To continue your account</h4>
            <label className="log-form__label patient-log__username">Username <span>*</span></label>
            <div className="log-form__input__wrapper input__wrapper">
                <img className="log-form__input-img" src={user} alt="user" />
                <input value={login} onChange={(e)=> setLogin(e.target.value)} type="text" className="log-form__input patient-log__input" placeholder="userlogin"/>
            </div>
            <label className="log-form__label patient-log__password">Password <span>*</span></label>
            <div className="log-form__input__wrapper input__wrapper">
                <img className="log-form__input-img" src={lock} alt="user" />
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className="log-form__input patient-log__input" placeholder="userpassword"/>
            </div>
            <Button>Login</Button>
            <a className="patient-log__link" href="#">I’m a doctor</a>
            <p className="patient-log__noAcc">Dont have  an account?<a className="patient-log__link" href="#">Sign Up</a></p>

        </form>
    )
}
export default PatientLogin;