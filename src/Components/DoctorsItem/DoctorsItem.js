import "./DoctorsItem.scss";
import { useEffect, useState, useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDoctor, registerDoctor, deleteDoctorItem, removeCheckedListItem } from "../DoctorsList/DoctorsListSlice";
import { doctorSchema } from "../../schemas/doctorSchema";
import { useFormik } from "formik";
import { addCheckedListItem } from '../DoctorsList/DoctorsListSlice';
import "../ListItem/listItem.scss"
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import keyIcon from "../../assets/icons/key.svg";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import more from "../../assets/icons/more.svg";
import Modal from "../Modal/Modal";
import closeIcon from "../../assets/icons/close.svg";


const DoctorsItem = (props) => {
    const dispatch = useDispatch();

    const [modalActive, setModalActive] = useState(false);
    const [modalRegisterActive, setModalRegisterActive] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [checkStatus, setCheckStatus] = useState(false);

    const status = useSelector(state => state.doctors.status);
    const checkedList = useSelector(state => state.doctors.checkedList)
    const token = useSelector(state => state.account.token);
    const isChecked = checkedList.includes(props._id);

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
        const updatedItem = {
            name: values.name,
            surname: values.surname,
            age: values.age,
            speciality: values.speciality,
            entryDate: values.entryDate,
            salary: values.salary,
            email: values.email,
            phone: values.phone,
            token,
        };

        dispatch(updateDoctor([updatedItem, token, id]));
        console.log('fomr');

    };
    const {
        values,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
    } = useFormik({
        initialValues: {
            name: props.name,
            surname: props.surname,
            age: props.age,
            speciality: props.speciality,
            entryDate: props.entryDate,
            salary: props.salary,
            email: props.email,
            phone: props.phone,
        },
        validationSchema: doctorSchema,
        onSubmit,
    });



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
        values.name = props.name;
        values.surname = props.surname;
        values.age = props.age;
        values.speciality = props.speciality;
        values.salary = props.salary;
        values.entryDate = props.entryDate;
        values.email = props.email;
        values.phone = props.phone;


    }, [props]);


    useEffect(() => {
        if (status !== "idle") {
            clickModalMessageHandler();
        }

    }, [status]);
    const handleDelete = useCallback((e) => {
        e.preventDefault();
        dispatch(deleteDoctorItem([props._id, token]));
    }, [dispatch, props._id, token]);




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

                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }} className="admin-add admin-add__doctor" action="">
                    <h2 className="admin-add__header">Type information about doctor</h2>
                    <div className="admin-add__inputs">
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Name</div>
                            <input
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__doctor__name"
                                type="text"
                                className={errors.name && touched.name ? "admin-add__input-error" : "admin-add__input"}
                                name="name" />
                            {errors.name && touched.name && <p className="error">{errors.name}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Surname</div>
                            <input
                                id="admin-add__doctor__surname"
                                type="text"
                                name="surname"
                                value={values.surname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.surname && touched.surname ? "admin-add__input-error" : "admin-add__input"}
                            />
                            {errors.surname && touched.surname && <p className="error">{errors.surname}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Age</div>
                            <input
                                value={values.age}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__doctor__age"
                                type="text"
                                className={errors.age && touched.age ? "admin-add__input-error" : "admin-add__input"}
                                name="age" />
                            {errors.age && touched.age && <p className="error">{errors.age}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Speciality</div>
                            <input
                                value={values.speciality}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__doctor__speciality"
                                type="text"
                                className={errors.speciality && touched.speciality ? "admin-add__input-error" : "admin-add__input"}
                                name="speciality" />
                            {errors.speciality && touched.speciality && <p className="error">{errors.speciality}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Date of entry</div>
                            <input
                                value={values.entryDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__doctor__entryDate"
                                type="date"
                                className={errors.entryDate && touched.entryDate ? "admin-add__input-error" : "admin-add__input"}
                                name="entryDate" />
                            {errors.entryDate && touched.entryDate && <p className="error">{errors.entryDate}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Salary</div>
                            <input
                                value={values.salary}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__doctor__salary"
                                type="text"
                                className={errors.salary && touched.salary ? "admin-add__input-error" : "admin-add__input"}
                                name="salary" />
                            {errors.salary && touched.salary && <p className="error">{errors.salary}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Email</div>
                            <input
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__doctor__email"
                                type="email"
                                className={errors.email && touched.email ? "admin-add__input-error" : "admin-add__input"}
                                name="email" />
                            {errors.email && touched.email && <p className="error">{errors.email}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Phone</div>
                            <input
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__doctor__phone"
                                type="text"
                                className={errors.phone && touched.phone ? "admin-add__input-error" : "admin-add__input"}
                                name="phone" />
                            {errors.phone && touched.phone && <p className="error">{errors.phone}</p>}
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