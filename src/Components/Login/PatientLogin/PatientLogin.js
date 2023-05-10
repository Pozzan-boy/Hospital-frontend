import {useState} from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Logo/Logo";
import lock from "../../../assets/icons/lock.svg";
import user from "../../../assets/icons/user.svg";
import Button from "../../Button/Button";
import { accountFetched, accountFetching, accountFetchingError } from "../loginSlice";
import axios from "axios";
import '../loginForm.scss';

const PatientLogin =() =>{
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
const onSubmit = (e) => {
        e.preventDefault();
        dispatch(accountFetching());
        axios.post('/auth/login', {
            login,
            password,
            role: 'patient'
        })
        .then(res => {
            dispatch(accountFetched(res.data));
            localStorage.setItem('token', res.data.token);
            navigate('/patient');
        })
        .catch(() => dispatch(accountFetchingError()));
    }

    return(
        <form onSubmit={onSubmit} className="log-form patient-log">
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
            <Link className="log-form__link patient-log__link" to="/login/doctor">I’m a doctor</Link>
            <p className="log-form__subinf patient-log__noAcc">Dont have  an account?<Link className="log-form__link patient-log__link" to='/register/patient'>Sign Up</Link></p>

        </form>
    )
}

export default PatientLogin;