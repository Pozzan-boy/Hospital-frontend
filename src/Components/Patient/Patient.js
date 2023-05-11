
import "./patient.scss";
import { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePatient, registerPatient, deletePatient, removeCheckedListItem } from "../PatientsList/PatientsListSlice";
import { patientSchema } from "../../schemas/patientSchema";
import { Form, Formik, useFormik } from "formik";
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
import CustomInput from "../ModalAddWindow/CustomInput";
import CustomSelect from "../ModalAddWindow/CustomSelect";
import CustomRadioButton from "../ModalAddWindow/CustomRadioButton";


const PatientsItem = (props) => {

    const dispatch = useDispatch();

    const [modalActive, setModalActive] = useState(false);
    const [modalRegisterActive, setModalRegisterActive] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [checkStatus, setCheckStatus] = useState(false);
    const formRef = useRef();
    const status = useSelector(state => state.patients.status);
    const token = useSelector(state => state.account.token);
    const checkedList = useSelector(state => state.patients.checkedList)
    const isChecked = checkedList.includes(props._id);
    const sexList = useSelector(state=> state.patients.sexList);
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
        const updatedItem = { ...values, token };
        console.log();
        dispatch(updatePatient([updatedItem, token, id]));


    };




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
            <Formik
                innerRef={formRef}
                initialValues={{ name: props.name, surname:props.surname, birthDate: props.birthDate, sex: props.sex, height: props.height, weight: props.weight, email: props.email, phone: props.phone }}
                validationSchema={patientSchema}
                onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form className="modal-add">
                        <h2 className="modal-add__header">Type information about patient</h2>
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
                            placeholder="Enter your surname"
                        />
                        <CustomInput
                            label="Birth Date"
                            name="birthDate"
                            type="date"
                            placeholder="Enter your birth date"
                        />
                        <div className="modal-add__input__wrapper">
                            <label className="modal-add__input__label">Sex</label>
                            <div className="radio-buttons">
                                
                                <CustomRadioButton
                                    label="Male"
                                    type="radio"
                                    name="sex"
                                    value="Male"
                                    id="male"
                                    
                                />
                               <CustomRadioButton
                                    label="Female"
                                    type="radio"
                                    name="sex"
                                    value="Female"
                                    id="female"
                                    
                                    
                                />
                            </div>
                        </div>
                       
                        
                        <CustomInput
                            label="Height"
                            name="height"
                            type="text"
                            placeholder="Enter your height"
                        />
                        <CustomInput
                            label="Weight"
                            name="weight"
                            type="text"
                            placeholder="Enter your weight"
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