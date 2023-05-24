import "./healingsItem.scss";
import { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateHealing, deleteHealingItem, removeCheckedListItem } from "../HealingsList/HealingsListSlice";
import { healingSchema } from "../../schemas/healingSchema";
import { Form, Formik, useFormik } from "formik";
import { addCheckedListItem } from '../HealingsList/HealingsListSlice';
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
import axios from "axios";

const HealingsItem = (props) => {

    const dispatch = useDispatch();

    const [modalActive, setModalActive] = useState(false);
    const [checkStatus, setCheckStatus] = useState(false);
    const formRef = useRef();
    const status = useSelector(state => state.healings.status);
    const token = useSelector(state => state.account.token);
    const checkedList = useSelector(state => state.healings.checkedList)
    const isChecked = checkedList.includes(props._id);
    
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
        const updatedItem = {...values, preparations: values?.preparations.split(','), token };
        console.log();
        dispatch(updateHealing([updatedItem, token, id]));
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
        dispatch(deleteHealingItem([props._id, token]));
    }, [dispatch, props._id, token]);

    return (
        <li
            className="list-item healing">

            <Checkbox checked={checkStatus} variant="square" id={props._id} onCheck={checkStatusHandler} />
            <div className="healing__patient">{props.patient.name}</div>
            <div className="healing__doctor">{props.doctor.name}</div>
            <div className="healing__diagnos">{props.diagnos}</div>
            <div className="healing__date">{props.date}</div>
            <div className="healing__status">{props.status}</div>
            <div className="healing__preparations">{props.preparations.join(', ')}</div>
            <div className="healing__ward">{props.ward.number}</div>
            <div className="healing__change">
                <img src={more} alt="" />
                <div className="dropdown-content">
                    <div className="healing__change__item" onClick={clickHandler}>
                        <img src={editIcon} alt="edit" />
                        <span>Edit healing</span>
                    </div>
                    <div className="healing__change__item" onClick={(e) => { handleDelete(e) }}>
                        <img src={deleteIcon} alt="delete" />
                        <span>Delete healing</span>
                    </div>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
            <Formik
                innerRef={formRef}
                initialValues={{patient:props.patient._id, doctor:props.doctor._id,  diagnos: props.diagnos, diagnosDescription: props.diagnosDescription, date:props.date, healingInstruction: props.healingInstruction, status: props.status, preparations: props?.preparations.join(','), ward: props?.ward._id}}
                validationSchema={healingSchema}
                onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form className="modal-add">
                        <h2 className="modal-add__header">Type information about healing</h2>
                        <CustomSelect
                            label="Patient"
                            name="patient"
                            placeholder="Please select a patient"
                        >
                            <option value={props.patient._id}>{props.patient.name}</option>
                            {props.patients}
                        </CustomSelect>
                        <CustomSelect
                            label="Doctor"
                            name="doctor"
                            placeholder="Please select a doctor"
                        >
                            <option value={props.doctor._id}>{props.doctor.name}</option>
                            {props.doctors}
                        </CustomSelect>
                        <CustomInput
                            label="Diagnos"
                            name="diagnos"
                            type="text"
                            placeholder="Enter diagnos"
                        />
                        <CustomInput
                            label="Description"
                            name="diagnosDescription"
                            type="text"
                            placeholder="Enter diagnos description"
                        />
                        <CustomInput
                            label="Date"
                            name="date"
                            type="date"
                            placeholder="Enter date"
                        />
                        <CustomInput
                            label="Instructions"
                            name="healingInstruction"
                            type="text"
                            placeholder="Enter healing instructions"
                        />
                        <CustomInput
                            label="Status"
                            name="status"
                            type="text"
                            placeholder="Select status"
                        />
                        <CustomInput
                            label="Preprations"
                            name="preparations"
                            type="text"
                            placeholder="Enter preparations"
                        />
                        <CustomSelect
                            label="Ward"
                            name="ward"
                            placeholder="Please select a ward"
                        >
                            <option value={props?.ward._id}>{props?.ward.number}</option>
                            {props.wards}
                        </CustomSelect>
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
        </li>
    )
}
export default HealingsItem;