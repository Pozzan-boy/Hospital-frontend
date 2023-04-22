import Search from "../Search/Search";
import Button from "../Button/Button";
import { useSelector,useDispatch } from "react-redux";
import { useState, useMemo } from "react";
import axios from "axios";
import Modal from "../Modal/Modal";
import closeIcon from "../../assets/icons/close.svg";
import "./filters.scss";
import { postDoctor } from "../DoctorsList/DoctorsListSlice";

const Filters  = ()=>{
    const users = useSelector(state=> state.doctors.doctors);
    const token = useSelector(state=> state.account.token);
    const doctorsCount = useSelector(state=> state.doctors.doctorsCount);
    
    const [modalActive, setModalActive]=useState(false);
    const dispatch = useDispatch();
    const clickHandler =()=>{
        setModalActive(true);
    }

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [entryDate, setEntryDate] = useState('');
    const [salary, setSalary] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    
   
    const onSubmit = (e) => {
        e.preventDefault();
        const newDoctor={
            name,
            surname,
            age,
            speciality,
            entryDate,
            salary,
            email,
            phone,
            token
        };
        dispatch(postDoctor(newDoctor));
        
    }

    return(
        <div className="filters">
            <div className="filters_user-count">
                <span id="users_count">{doctorsCount}</span>
                <span id="users_type">doctors</span>
            </div>
            <Search/>
            <Button onClick={clickHandler} width="170px" height="43px" borderRadius="14px" children="Add doctor" fontSize="20px" />
            <Modal active={modalActive} setActive={setModalActive}>
                
                <form onSubmit={onSubmit} className="admin-add admin-add__doctor"action="">
                    <h2 className="admin-add__header">Type information about doctor</h2>
                    <div className="admin-add__inputs">
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Name</div>
                            <input onChange={(e)=>setName(e.target.value)} id="admin-add__doctor__name" type="text" className="admin-add__input" />
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Surname</div>
                            <input onChange={(e)=>setSurname(e.target.value)} id="admin-add__doctor__surname" type="text" className="admin-add__input" />
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Age</div>
                            <input onChange={(e)=>setAge(e.target.value)} id="admin-add__doctor__age" type="text" className="admin-add__input" />
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Speciality</div>
                            <input onChange={(e)=>setSpeciality(e.target.value)} id="admin-add__doctor__speciality" type="text" className="admin-add__input" />
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Date of entry</div>
                            <input onChange={(e)=>setEntryDate(e.target.value)} id="admin-add__doctor__entry-date" type="date" className="admin-add__input" />
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Salary</div>
                            <input onChange={(e)=>setSalary(e.target.value)} id="admin-add__doctor__salary" type="text" className="admin-add__input" />
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Email</div>
                            <input onChange={(e)=>setEmail(e.target.value)} id="admin-add__doctor__email" type="text" className="admin-add__input" />
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Phone</div>
                            <input onChange={(e)=>setPhone(e.target.value)} id="admin-add__doctor__phone" type="text" className="admin-add__input" />
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
                    <button onClick={(e)=> {e.preventDefault();setModalActive(false)}}>
                        <img className="modal_close" src={closeIcon} alt="x" />
                    </button>
                </form>
                
            </Modal>
            
        </div>
    )
}
export default Filters;
