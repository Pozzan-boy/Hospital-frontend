
import "./DoctorsItem.scss";
import { useEffect, useState, useCallback, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDoctor, registerDoctor, deleteDoctorItem, removeCheckedListItem } from "../DoctorsList/DoctorsListSlice";
import { doctorSchema } from "../../schemas/doctorSchema";
import { Form, Formik, useFormik } from "formik";
import { addCheckedListItem } from '../DoctorsList/DoctorsListSlice';
import CustomSelect from "../ModalAddWindow/CustomSelect";
import "../ListItem/listItem.scss"
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import keyIcon from "../../assets/icons/key.svg";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import more from "../../assets/icons/more.svg";
import Modal from "../Modal/Modal";
import closeIcon from "../../assets/icons/close.svg";
import CustomInput from "../ModalAddWindow/CustomInput";


const DoctorsItem = (props) => {
    const dispatch = useDispatch();

    const [modalActive, setModalActive] = useState(false);
    const [modalRegisterActive, setModalRegisterActive] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [checkStatus, setCheckStatus] = useState(false);
    const formRef = useRef();
    const status = useSelector(state => state.doctors.status);
    const checkedList = useSelector(state => state.doctors.checkedList)
    const token = useSelector(state => state.account.token);
    const isChecked = checkedList.includes(props._id);

    const specialitiesList = useSelector(state=> state.doctors.specialitiesList);
        function SelectArray(props) {
            return props.arr.map((item) =>
            (
                <option value={item.value}>{item.text}</option>
    
            ))
        }
    const handleRegister = async (e) => {

        e.preventDefault();
        const item = {
            login,
            password,
            role: "doctor",
            key: props._id,
        };

        dispatch(registerDoctor([item, token]));

        await e.target.reset();
    }
    useEffect(() => {

        if (checkedList.length === 0) {
            setCheckStatus(false);

        }

    }, [checkedList.length])
    useEffect(() => {
        setCheckStatus(isChecked);
    }, [props._id])

    const onSubmit = (values, actions) => {

        const id = props._id;
        const updatedItem = { ...values, token };

        dispatch(updateDoctor([updatedItem, token, id]));


    };
 


    const checkStatusHandler = () => {
        if (checkStatus) {
            setCheckStatus(false);
            dispatch(removeCheckedListItem(props._id));
        } else {
            setCheckStatus(true);
            dispatch(addCheckedListItem(props._id));
        }
        console.log(checkStatus);
    };


    const clickHandler = () => {

        setModalActive(true);

    }
    const clickRegisterHandler = () => {

        setModalRegisterActive(true);
    }
    const clickModalMessageHandler = () => {

        props.setModalMessageActive(true);
    }



    


    useEffect(() => {
        if (status !== "idle") {
            clickModalMessageHandler();
        }

    }, [status]);
    const handleDelete = useCallback((e) => {
        e.preventDefault();
        dispatch(deleteDoctorItem([props._id, token]));
    }, [dispatch, props._id, token]);

    

    useEffect(() => {
        

    }, [props]);

    return (
        <li

            className="list-item">

            <Checkbox checked={checkStatus} variant="square" id={props._id} onCheck={checkStatusHandler} />
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
                <div className="dropdown-content">
                    <div className="doctorItem__change__item" onClick={clickHandler}>
                        <img src={editIcon} alt="edit" />
                        <span>Edit doctor</span>
                    </div>
                    <div className="doctorItem__change__item" onClick={(e) => { handleDelete(e) }}>
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

            <Formik
                innerRef={formRef}
                initialValues={{ name: props.name, surname: props.surname, age: props.age, speciality: props.speciality, entryDate: props.entryDate, salary: props.salary, email: props.email, phone: props.phone }}
                validationSchema={doctorSchema}
                onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form className="modal-add">
                        <h2 className="modal-add__header">Type information about doctor</h2>
                        <CustomInput
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                        />
                        <CustomInput
                            label="Surname"
                            name="surname"
                            type="text"
                            placeholder="Enter your username"
                        />
                        <CustomInput
                            label="Age"
                            name="age"
                            type="text"
                            placeholder="Enter your Age"
                        />
                        <CustomSelect
                            label="Speciality"
                            name="speciality"
                            placeholder="Please select a job"
                        >
                            <option value="">Please select</option>
                            <SelectArray arr={specialitiesList} />
                        </CustomSelect>
                        <CustomInput
                            label="Entry Date"
                            name="entryDate"
                            type="date"
                            placeholder="Enter your entry date"
                        />
                        <CustomInput
                            label="Salary"
                            name="salary"
                            type="text"
                            placeholder="Enter your salary"
                        />
                        <CustomInput
                            label="Email"
                            name="email"
                            type="text"
                            placeholder="Enter your email"
                        />
                        <CustomInput
                            label="Phone"
                            name="phone"
                            type="text"
                            placeholder="Enter your phone"
                        />

                        <Button
                            onClick={clickHandler}
                            width="227px"
                            height="50px"
                            marginTop="60px"
                            borderRadius="14px"
                            bgColor="#25B39E"
                            children="Submit"
                            disabled={isSubmitting}
                            fontSize="20px" />
                        <button onClick={(e) => { e.preventDefault(); setModalActive(false) }}>
                            <img className="modal_close" src={closeIcon} alt="x" />
                        </button>
                    </Form>
                )}
            </Formik>
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