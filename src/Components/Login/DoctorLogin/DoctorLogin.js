import { useState } from "react";
import { useDispatch } from "react-redux";

import Logo from "../../Logo/Logo";
import Button from "../../Button/Button";
import user from '../../../assets/icons/user.svg';
import lock from '../../../assets/icons/lock.svg';
import { Link, useNavigate } from "react-router-dom";
import { accountFetched, accountFetching, accountFetchingError } from "../loginSlice";
import axios from "axios";

const DoctorLogin = () => {

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
            role: 'doctor'
        })
        .then(res => {
            dispatch(accountFetched(res.data));
            localStorage.setItem('token', res.data.token);
            navigate('/');
        })
        .catch(() => dispatch(accountFetchingError()));
    }

    return(
        <form onSubmit={onSubmit} className="log-form">
            <Logo color="#A70505" />
            <h3 className="log-form__title">Login</h3>
            <h4 className="log-form__subtitle">To continue as doctor</h4>
            <label className="log-form__label">Login <span>*</span></label>
            <div className="log-form__input__wrapper">
                <img className="log-form__input-img" src={user} alt="user" />
                <input value={login} onChange={(e)=> setLogin(e.target.value)} type="text" className="log-form__input patient-log__input" placeholder="doctorlogin"/>
            </div>
            <label className="log-form__label">Password <span>*</span></label>
            <div className="log-form__input__wrapper">
                <img className="log-form__input-img" src={lock} alt="password" />
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className="log-form__input patient-log__input" placeholder="doctorpassword"/>
            </div>
            <Button>Login</Button>
            <Link className="log-form__link" to="/login/patient">I’m a patient</Link>
        </form>
    )
}

export default DoctorLogin;