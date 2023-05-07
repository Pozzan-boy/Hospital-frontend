
import "./patient.scss";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePatient, registerPatient, deletePatient, removeCheckedListItem } from "../PatientsList/PatientsListSlice";
import { patientSchema } from "../../schemas/patientSchema";
import { useFormik } from "formik";
import { addCheckedListItem } from '../PatientsList/PatientsListSlice';
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import keyIcon from "../../assets/icons/key.svg";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import more from "../../assets/icons/more.svg";
import Modal from "../Modal/Modal";
import closeIcon from "../../assets/icons/close.svg";
import "../ListItem/listItem.scss"


const PatientsItem = (props) => {

    const dispatch = useDispatch();

    const [modalActive, setModalActive] = useState(false);
    const [modalRegisterActive, setModalRegisterActive] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [checkStatus, setCheckStatus] = useState(false);

    const status = useSelector(state => state.patients.status);
    const token = useSelector(state => state.account.token);
    const checkedList = useSelector(state => state.patients.checkedList)
    const isChecked = checkedList.includes(props._id);

    const handleRegister = async (e) => {
        e.preventDefault();
        const item = {
            login,
            password,
            role: "patient",
            key: props._id,
        };
        dispatch(registerPatient([item, token]));
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
            birthDate: values.birthDate,
            sex: values.sex,
            height: values.height,
            weight: values.weight,
            email: values.email,
            phone: values.phone,

        };
        console.log();
        dispatch(updatePatient([updatedItem, token, id]));


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
            birthDate: props.birthDate,
            sex: props.sex,
            height: props.height,
            weight: props.weight,
            email: props.email,
            phone: props.phone,
        },
        validationSchema: patientSchema,
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
        values.birthDate = props.birthDate;
        values.sex = props.sex;
        values.weight = props.weight;
        values.height = props.height;
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
        dispatch(deletePatient([props._id, token]));
    }, [dispatch, props._id, token]);




    return (
        <li

            className="list-item">

            <Checkbox checked={checkStatus} variant="square" id={props._id} onCheck={checkStatusHandler} />
            <div className="patient__personal">
                <div className="patient__personal__name">{`${props.name} ${props.surname}`}</div>
                <div className="patient__personal__email">{props.email}</div>
            </div>
            <div className="patient__phone">{props.phone.replace(/\s/g, '')}</div>
            <div className="patient__sex">{props.sex}</div>
            <div className="patient__birthdate">{props.birthDate}</div>
            <div className="patient__height">{props.height}</div>
            <div className="patient__weight">{props.weight}</div>
            <div className="patient__change">
                <img src={more} alt="" />
                <div className="dropdown-content">
                    <div className="patient__change__item" onClick={clickHandler}>
                        <img src={editIcon} alt="edit" />
                        <span>Edit patient</span>
                    </div>
                    <div className="patient__change__item" onClick={(e) => { handleDelete(e) }}>
                        <img src={deleteIcon} alt="delete" />
                        <span>Delete patient</span>
                    </div>
                    <div className="patient__change__item" onClick={clickRegisterHandler}>
                        <img src={keyIcon} alt="delete" />
                        <span>Register patient</span>

                    </div>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>

                <form onSubmit={handleSubmit} className="modal-edit modal-edit__patient" action="">
                    <h2 className="modal-edit__header">Type information about patient</h2>
                    <div className="modal-edit__inputs">
                        <div className="modal-edit__input__wrapper">
                            <div className="modal-edit__input__label">Name</div>
                            <input
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="modal-edit__patient__name"
                                type="text"
                                className={errors.name && touched.name ? "modal-edit__input-error" : "modal-edit__input"}
                                name="name" />
                            {errors.name && touched.name && <p className="error">{errors.name}</p>}
                        </div>
                        <div className="modal-edit__input__wrapper">
                            <div className="modal-edit__input__label">Surname</div>
                            <input
                                id="modal-edit__patient__surname"
                                type="text"
                                name="surname"
                                value={values.surname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.surname && touched.surname ? "modal-edit__input-error" : "modal-edit__input"}
                            />
                            {errors.surname && touched.surname && <p className="error">{errors.surname}</p>}
                        </div>
                        <div className="modal-edit__input__wrapper">
                            <div className="modal-edit__input__label">Birth Date</div>
                            <input
                                value={values.birthDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="modal-edit__patient__birthDate"
                                type="date"
                                className={errors.birthDate && touched.birthDate ? "modal-edit__input-error" : "modal-edit__input"}
                                name="birthDate" />
                            {errors.birthDate && touched.birthDate && <p className="error">{errors.birthDate}</p>}
                        </div>
                        <div className="modal-edit__input__wrapper">
                            <div className="modal-edit__input__label">Sex</div>
                            <input
                                value={values.sex}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="modal-edit__patient__sex"
                                type="text"
                                className={errors.sex && touched.sex ? "modal-edit__input-error" : "modal-edit__input"}
                                name="sex" />
                            {errors.sex && touched.sex && <p className="error">{errors.sex}</p>}
                        </div>
                        <div className="modal-edit__input__wrapper">
                            <div className="modal-edit__input__label">Height (cm)</div>
                            <input
                                value={values.height}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="modal-edit__patient__height"
                                type="text"
                                className={errors.height && touched.height ? "modal-edit__input-error" : "modal-edit__input"}
                                name="height" />
                            {errors.height && touched.height && <p className="error">{errors.height}</p>}
                        </div>
                        <div className="modal-edit__input__wrapper">
                            <div className="modal-edit__input__label">Weight (kg)</div>
                            <input
                                value={values.weight}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="modal-edit__patient__weight"
                                type="text"
                                className={errors.weight && touched.weight ? "modal-edit__input-error" : "modal-edit__input"}
                                name="weight" />
                            {errors.weight && touched.weight && <p className="error">{errors.weight}</p>}
                        </div>
                        <div className="modal-edit__input__wrapper">
                            <div className="modal-edit__input__label">Email</div>
                            <input
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="modal-edit__patient__email"
                                type="email"
                                className={errors.email && touched.email ? "modal-edit__input-error" : "modal-edit__input"}
                                name="email" />
                            {errors.email && touched.email && <p className="error">{errors.email}</p>}
                        </div>
                        <div className="modal-edit__input__wrapper">
                            <div className="modal-edit__input__label">Phone</div>
                            <input
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="modal-edit__patient__phone"
                                type="text"
                                className={errors.phone && touched.phone ? "modal-edit__input-error" : "modal-edit__input"}
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

                <form onSubmit={(e) => { handleRegister(e) }} className="modal-edit modal-edit__patient" action="">
                    <h2 className="modal-edit__header">Type information about patient</h2>
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
export default PatientsItem;