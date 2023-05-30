import { useState } from "react";
import { useDispatch } from "react-redux";

import Logo from "../../Logo/Logo";
import Button from "../../Button/Button";
import Modal from "../../Modal/Modal";
import user from '../../../assets/icons/user.svg';
import successIcon from "../../../assets/icons/success.svg";
import errorIcon from "../../../assets/icons/alert-error.svg";
import lock from '../../../assets/icons/lock.svg';
import { Link, useNavigate } from "react-router-dom";
import { accountFetched, accountFetching, accountFetchingError } from "../loginSlice";
import axios from "axios";
import { getDoctor } from "../../DoctorsList/DoctorsListSlice";

const DoctorLogin = () => {

    const dispatch = useDispatch();
    const [modalMessageActive, setModalMessageActive] = useState(false);
    const [statusIcon, setStatusIcon] = useState(0);
    const [statusMessage, setStatusMessage] = useState('');
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
            setStatusIcon(successIcon);
            setStatusMessage('Login succesful');
            dispatch(getDoctor({id: res.data._id, token: res.data.token}));
        })
        .catch(() => {
            dispatch(accountFetchingError())
            setStatusIcon(errorIcon);
            setStatusMessage('Login error');
        })
        .finally(() => setModalMessageActive(true))
    }

    const clickModalMessageHandler = (e) => {
        e.preventDefault();
        setModalMessageActive(false);
        if (statusMessage === 'Login succesful') {
            navigate('/')
        }
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
            <Button marginTop="30px">Login</Button>
            <Link className="log-form__link" to="/login/patient">I’m a patient</Link>

            <Modal active={modalMessageActive} handler={clickModalMessageHandler} setActive={setModalMessageActive} modalClass={"modal__status"}>
                    <img className="modal__status__img" src={statusIcon} alt="x" />

                    <div className="modal__status__text">
                        <h2>{statusMessage}</h2>
                    </div>
                    <Button
                       
                        onClick={clickModalMessageHandler}
                        width="80px"
                        height="40px"
                        marginTop="10px"
                        borderRadius="14px"
                        bgColor="#25AE88"
                        children="OK"
                        fontSize="20px" />

            </Modal>
        </form>
    )
}

export default DoctorLogin;