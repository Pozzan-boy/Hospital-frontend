
import "./DoctorsItem.scss";
import { useEffect,useState,useMemo  } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateDoctor, registerDoctor} from "../DoctorsList/DoctorsListSlice";
import deleteIcon from "../../assets/icons/delete.svg";
// import { deleteDoctorItem } from "./docSlice";
import axios from "axios";
import editIcon from "../../assets/icons/edit.svg";
import keyIcon from "../../assets/icons/key.svg";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import more from "../../assets/icons/more.svg";
import Modal from "../Modal/Modal";
import closeIcon from "../../assets/icons/close.svg";

import { deleteDoctorItem} from '../DoctorsList/DoctorsListSlice';

const DoctorsItem = (props) => {
    const navigate = useNavigate();
    const [modalActive, setModalActive] = useState(false);
    const [modalRegisterActive, setModalRegisterActive] = useState(false);

    const doctors = useSelector(state => state.doctors.doctors);
    const status = useSelector(state => state.doctors.status);
    const token = useSelector(state => state.account.token);
    const dispatch = useDispatch();
    const clickHandler = () => {
        setModalActive(true);
    }
    const clickRegisterHandler = () => {
        setModalRegisterActive(true);
    }
    const clickModalMessageHandler = () => {
        props.setModalMessageActive(true);
    }
    const [checkStatus, setCheckStatus] = useState(false);

    const [name, setName] = useState(props.name);
    const [surname, setSurname] = useState(props.surname);
    const [age, setAge] = useState(props.age);
    const [speciality, setSpeciality] = useState(props.speciality);
    const [entryDate, setEntryDate] = useState(props.entryDate);
    const [salary, setSalary] = useState(props.salary);
    const [email, setEmail] = useState(props.email);
    const [phone, setPhone] = useState(props.phone);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        setName(props.name);
        setSurname(props.surname);
        setAge(props.age);
        setSpeciality(props.speciality);
        setEntryDate(props.entryDate);
        setSalary(props.salary);
        setEmail(props.email);
        setPhone(props.phone);
        
      }, [props]);
    
    // useEffect(() => {
    //     const [name, setName] = useState(props.name);
    //     const [surname, setSurname] = useState(props.surname);
    //     const [age, setAge] = useState(props.age);
    //     const [speciality, setSpeciality] = useState(props.speciality);
    //     const [entryDate, setEntryDate] = useState(props.entryDate);
    //     const [salary, setSalary] = useState(props.salary);
    //     const [email, setEmail] = useState(props.email);
    //     const [phone, setPhone] = useState(props.phone);
        
    // }, [currentPage, doctorsCount, itemOffset]);
   console.log(name);
   console.log(surname);
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteDoctorItem([props._id,token]));
        // clickModalMessageHandler();
        
       
    };
    useEffect(() => {
        if(status!=="idle"){
            clickModalMessageHandler();
        }
        
      }, [status]);
    const handleUpdate = (e) => {
        e.preventDefault();
        const id = props._id;
        const updatedItem = { name, surname, age, speciality, entryDate, salary, email, phone };
        dispatch(updateDoctor([updatedItem, token, id]));
        // clickModalMessageHandler();
        console.log(status);

    };
    const handleRegister = (e) => {
        e.preventDefault();
        const item = {
            login,
            password,
            role: "doctor",
            key: props._id
        };
        dispatch(registerDoctor([item, token]));
        // clickModalMessageHandler();

    };



    return (
       
        <li onClick={() => navigate(`/`)}
            className="doctorItem">

            <Checkbox variant="square" onCheck={setCheckStatus} />
            <div className="doctorItem__personal">
                <div className="doctorItem__personal__name">{`${props.name} ${props.surname}`}</div>
                <div className="doctorItem__personal__email">{props.email}</div>
            </div>
            <div className="doctorItem__phone">{props.phone.replace(/\s/g, '')}</div>
            <div className="doctorItem__speciality">{props.speciality}</div>
            <div className="doctorItem__entry-date">{props.entryDate}</div>
            <div className="doctorItem__salary">{props.salary}</div>
            <div className="doctorItem__change">
                <img src={more} alt="" />
                <div class="dropdown-content">
                    <div className="doctorItem__change__item" onClick={clickHandler}>
                        <img src={editIcon} alt="edit" />
                        <span>Edit doctor</span>
                    </div>
                    <div className="doctorItem__change__item" onClick={(e)=>{handleDelete(e)}}>
                        <img src={deleteIcon} alt="delete" />
                        <span>Delete doctor</span>
                    </div>
                    <div className="doctorItem__change__item" onClick={clickRegisterHandler}>
                        <img src={keyIcon} alt="delete" />
                        <span>Register doctor</span>

                    </div>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>

                <form onSubmit={(e) => { handleUpdate(e) }} className="admin-add admin-add__doctor" action="">
                    <h2 className="admin-add__header">Type information about doctor</h2>
                    <div className="admin-add__inputs">
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Name</div>
                            <input value={name} onChange={(e) => setName(e.target.value)} id="admin-add__doctor__name" type="text" className="admin-add__input" />
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Surname</div>
                            <input value={surname} onChange={(e) => setSurname(e.target.value)} id="admin-add__doctor__surname" type="text" className="admin-add__input" />
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Age</div>
                            <input value={age} onChange={(e) => setAge(e.target.value)} id="admin-add__doctor__age" type="text" className="admin-add__input" />
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Speciality</div>
                            <input value={speciality} onChange={(e) => setSpeciality(e.target.value)} id="admin-add__doctor__speciality" type="text" className="admin-add__input" />
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Date of entry</div>
                            <input value={entryDate} onChange={(e) => setEntryDate(e.target.value)} id="admin-add__doctor__entry-date" type="date" className="admin-add__input" />
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Salary</div>
                            <input value={salary} onChange={(e) => setSalary(e.target.value)} id="admin-add__doctor__salary" type="text" className="admin-add__input" />
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Email</div>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} id="admin-add__doctor__email" type="text" className="admin-add__input" />
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Phone</div>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} id="admin-add__doctor__phone" type="text" className="admin-add__input" />
                        </div>
                    </div>
                    <Button
                        onClick={clickHandler}
                        width="227px"
                        height="50px"
                        marginTop="60px"
                        borderRadius="14px"
                        bgColor="#25B39E"
                        children="Submit"
                        fontSize="20px" />
                    <button onClick={(e) => { e.preventDefault(); setModalActive(false) }}>
                        <img className="modal_close" src={closeIcon} alt="x" />
                    </button>
                </form>

            </Modal>
            <Modal active={modalRegisterActive} setActive={setModalRegisterActive}>

                <form onSubmit={(e) => { handleRegister(e) }} className="admin-add admin-add__doctor" action="">
                    <h2 className="admin-add__header">Type information about doctor</h2>
                    <div className="modal__input__wrapper">
                        <div className="modal__input__label">Login</div>
                        <input onChange={(e) => setLogin(e.target.value)} type="text" placeholder="Login" className="modal__input" />
                    </div>
                    <div className="modal__input__wrapper">
                        <div className="modal__input__label">Password</div>
                        <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Password" className="modal__input" />
                    </div>
                    <Button
                        onClick={clickRegisterHandler}
                        width="227px"
                        height="50px"
                        marginTop="60px"
                        borderRadius="14px"
                        bgColor="#25B39E"
                        children="Submit"
                        fontSize="20px" />
                    <button onClick={(e) => { e.preventDefault(); setModalRegisterActive(false) }}>
                        <img className="modal_close" src={closeIcon} alt="x" />
                    </button>
                </form>

            </Modal>
            
            
        </li>
       
    )

}
export default DoctorsItem;